import {
    getAbsoluteMinutes,
    minutesToTime,
    timeToMinutes,
} from "../utils/scheduleUtils";

export default function useScheduleDropHandler(schedules, setSchedules) {
    const handleDrop = (droppedItem, dropDate, startTime) => {
        const timelineStartAbs = getAbsoluteMinutes(dropDate, "06:00:00");
        const timelineEndAbs = timelineStartAbs + 1440; // 다음날 06:00까지

        // 드롭된 날짜의 6:00~다음날 6:00 사이의 일정만 필터링
        const daySchedules = schedules.filter((s) => {
            const scheduleStartAbs = getAbsoluteMinutes(s.date, s.startTime);
            const scheduleDate = new Date(s.date);
            const dropDateObj = new Date(dropDate);
            const diffDays =
                (scheduleDate - dropDateObj) / (1000 * 60 * 60 * 24);

            if (diffDays === 0) {
                // dropDate 당일 6:00~24:00
                return (
                    scheduleStartAbs >= timelineStartAbs &&
                    scheduleStartAbs < timelineEndAbs
                );
            } else if (diffDays === 1) {
                // dropDate 다음날 0:00~6:00
                const startHour = parseInt(s.startTime.split(":")[0], 10);
                return startHour < 6;
            }
            return false;
        });

        const dropStartAbs = getAbsoluteMinutes(dropDate, startTime);
        const dropDuration = droppedItem.stayTime || 120;
        const dropEndAbs = dropStartAbs + dropDuration;

        let adjustedStartAbs = dropStartAbs;

        // 겹치는 일정이 있는지 검사
        const overlappingSchedule = daySchedules.find((s) => {
            if (s.tripScheduleId === droppedItem.tripScheduleId) return false;
            const sStartAbs = getAbsoluteMinutes(s.date, s.startTime);
            const sEndAbs = sStartAbs + s.stayTime;
            return dropStartAbs < sEndAbs && dropEndAbs > sStartAbs;
        });

        if (overlappingSchedule) {
            // 겹치는 일정의 시작/끝/중간 계산
            const sStartAbs = getAbsoluteMinutes(
                overlappingSchedule.date,
                overlappingSchedule.startTime
            );
            const sEndAbs = sStartAbs + overlappingSchedule.stayTime;
            const overlapMidAbs = (sStartAbs + sEndAbs) / 2;

            // 현재 드롭 위치 기준으로 위/아래 빈 공간 탐색
            const sorted = [...daySchedules]
                .filter((s) => s.tripScheduleId !== droppedItem.tripScheduleId)
                .sort(
                    (a, b) =>
                        getAbsoluteMinutes(a.date, a.startTime) -
                        getAbsoluteMinutes(b.date, b.startTime)
                );

            if (dropStartAbs < overlapMidAbs) {
                // 위쪽 빈 공간 탐색
                const found = findEmptySlot(
                    sorted,
                    dropDuration,
                    "up",
                    sStartAbs
                );
                if (found !== null) {
                    adjustedStartAbs = found;
                } else {
                    return; // 빈 공간 없으면 이동 취소
                }
            } else {
                // 아래쪽 빈 공간 탐색
                const found = findEmptySlot(
                    sorted,
                    dropDuration,
                    "down",
                    sEndAbs
                );
                if (found !== null) {
                    adjustedStartAbs = found;
                } else {
                    return;
                }
            }
        }

        const adjustedStartTime = minutesToTime(adjustedStartAbs);

        // 새 일정 추가 또는 기존 일정 분할
        if (!droppedItem.tripScheduleId) {
            createAndAddSchedule(
                droppedItem,
                dropDate,
                adjustedStartTime,
                dropDuration
            );
        } else {
            splitAndSetSchedule(
                droppedItem,
                dropDate,
                adjustedStartTime,
                dropDuration
            );
        }
    };

    // 빈 슬롯(공간) 탐색 함수
    const findEmptySlot = (
        sorted,
        dropDuration,
        direction,
        overlapBoundaryAbs
    ) => {
        for (let i = 0; i <= sorted.length; i++) {
            const prevEndAbs =
                i === 0
                    ? 360 // 06:00 (타임라인 시작)
                    : getAbsoluteMinutes(sorted[i - 1].date, sorted[i - 1].endTime);

            const nextStartAbs =
                i === sorted.length
                    ? 1800 // 30:00 (타임라인 끝)
                    : getAbsoluteMinutes(sorted[i]?.date, sorted[i]?.startTime);

            if (direction === "up") {
                // 위쪽(겹치는 일정의 시작 전까지)에서 충분한 공간이 있는지
                if (
                    nextStartAbs <= overlapBoundaryAbs &&
                    nextStartAbs - prevEndAbs >= dropDuration &&
                    nextStartAbs - dropDuration >= 360
                ) {
                    return nextStartAbs - dropDuration;
                }
            } else {
                // 아래쪽(겹치는 일정의 끝 이후)에서 충분한 공간이 있는지
                if (
                    prevEndAbs >= overlapBoundaryAbs &&
                    prevEndAbs >= 360 &&
                    nextStartAbs - prevEndAbs >= dropDuration
                ) {
                    return prevEndAbs;
                }
            }
        }
        return null; // 빈 슬롯 없음
    };

    // 새 일정 생성 및 추가
    const createAndAddSchedule = (place, dropDate, dropStartTime, stayTime) => {
        const generateSchedule = (date, startTime, endTime) => ({
            tripScheduleId: place.tripScheduleId || Date.now() + Math.random(),
            placeId: place.id || place.placeId,
            date,
            startTime,
            stayTime,
            endTime,
            isLocked: 0,
            isSplit: false,
            viewStartTime: startTime,
            viewEndTime: endTime,
            place: { ...place },
        });

        const splitSchedules = [
            generateSchedule(
                dropDate,
                dropStartTime,
                minutesToTime(timeToMinutes(dropStartTime) + stayTime)
            ),
        ];

        setSchedules((prev) => [...prev, ...splitSchedules]);
    };

    // 기존 일정 분할 및 반영
    const splitAndSetSchedule = (
        schedule,
        dropDate,
        dropStartTime,
        duration
    ) => {
        const generateSchedule = (date, startTime, endTime) => ({
            ...schedule,
            date,
            startTime,
            stayTime: duration,
            endTime,
            viewStartTime: startTime,
            viewEndTime: endTime,
        });

        const splitSchedules = [
            generateSchedule(
                dropDate,
                dropStartTime,
                minutesToTime(timeToMinutes(dropStartTime) + duration)
            ),
        ];

        setSchedules((prev) => [
            ...prev.filter((s) => s.tripScheduleId !== schedule.tripScheduleId),
            ...splitSchedules,
        ]);
    };
    return { handleDrop };
}
