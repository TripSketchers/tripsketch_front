import {
    findPrevEndTime,
    getAbsoluteMinutes,
    minutesToTime,
    parseTime,
} from "../utils/scheduleUtils";

export default function useScheduleDropHandler(schedules, setSchedules) {
    const handleDrop = (droppedItem, dropDate, startTime) => {
        const daySchedules = schedules.filter((s) => {
            const scheduleStartAbs = getAbsoluteMinutes(s.date, s.startTime);
            const timelineStartAbs = getAbsoluteMinutes(dropDate, "06:00:00");
            const timelineEndAbs = timelineStartAbs + 1440; // 다음날 06:00까지

            return (
                scheduleStartAbs >= timelineStartAbs &&
                scheduleStartAbs < timelineEndAbs
            );
        });

        console.log(daySchedules);

        const dropStartAbs = getAbsoluteMinutes(dropDate, startTime);
        const dropDuration = droppedItem.stayTime || 120;
        const dropEndAbs = dropStartAbs + dropDuration;

        let adjustedStartAbs = dropStartAbs;

        // ✅ 겹치는 일정 검사
        const overlappingSchedule = daySchedules.find((s) => {
            if (s.tripScheduleId === droppedItem.tripScheduleId) return false;

            const sStartAbs = getAbsoluteMinutes(s.date, s.startTime);
            const sEndAbs = sStartAbs + s.stayTime;

            return dropStartAbs < sEndAbs && dropEndAbs > sStartAbs;
        });

        if (overlappingSchedule) {
            console.log("⚠️ 겹치는 일정 존재:", overlappingSchedule);

            const sStartAbs = getAbsoluteMinutes(
                overlappingSchedule.date,
                overlappingSchedule.startTime
            );
            const sEndAbs = sStartAbs + overlappingSchedule.stayTime;
            const overlapMidAbs = (sStartAbs + sEndAbs) / 2;

            const sorted = [...daySchedules]
                .filter((s) => s.tripScheduleId !== droppedItem.tripScheduleId)
                .sort(
                    (a, b) =>
                        getAbsoluteMinutes(a.date, a.startTime) -
                        getAbsoluteMinutes(b.date, b.startTime)
                );

            if (dropStartAbs < overlapMidAbs) {
                const found = findEmptySlot(
                    sorted,
                    dropDuration,
                    "up",
                    sStartAbs
                );

                if (found !== null) {
                    adjustedStartAbs = found;
                    console.log(
                        "📌 위쪽 빈 공간 발견:",
                        minutesToTime(adjustedStartAbs)
                    );
                } else {
                    console.log("❌ 위쪽 빈 공간 없음, 이동 취소");
                    return; // 💥 이동 취소
                }
            } else {
                console.log("🔽 아래쪽 빈 시간 탐색 시도");
                const found = findEmptySlot(
                    sorted,
                    dropDuration,
                    "down",
                    sEndAbs
                );
                if (found !== null) {
                    adjustedStartAbs = found;
                    console.log(
                        "📌 아래쪽 빈 공간 발견:",
                        minutesToTime(adjustedStartAbs)
                    );
                } else {
                    console.log("❌ 아래쪽 빈 공간 없음, 이동 취소");
                    return;
                }
            }
        } else {
            console.log(
                "✅ 겹치는 일정 없음 → 그대로 배치:",
                minutesToTime(adjustedStartAbs)
            );
        }

        const adjustedStartTime = minutesToTime(adjustedStartAbs);

        if (!droppedItem.tripScheduleId) {
            createAndAddSchedule(
                droppedItem,
                dropDate,
                adjustedStartTime,
                dropDuration
            );
            console.log("🆕 새 일정 추가 완료:", adjustedStartTime);
        } else {
            splitAndSetSchedule(
                droppedItem,
                dropDate,
                adjustedStartTime,
                dropDuration
            );
            console.log("✂️ 기존 일정 이동 완료:", adjustedStartTime);
        }

        console.log("🏁 [드롭 종료]");
    };

    const findEmptySlot = (
        sorted,
        dropDuration,
        direction,
        overlapBoundaryAbs
    ) => {
        // ✅ 탐색 방향에 따라 배열을 뒤집음 (up: 위쪽 탐색 → 거꾸로, down: 아래쪽 탐색 → 그대로)
        const loop = direction === "up" ? [...sorted].reverse() : sorted;

        for (let i = 0; i <= loop.length; i++) {
            // 📌 이전 일정의 끝나는 절대 시간 (없으면 06:00 → 360분)
            const prevEndAbs =
                i === 0
                    ? 360
                    : getAbsoluteMinutes(loop[i - 1].date, loop[i - 1].endTime);

            // 📌 다음 일정의 시작 절대 시간 (없으면 타임라인 끝인 30시간 → 1800분)
            const nextStartAbs =
                i === loop.length
                    ? 1800
                    : getAbsoluteMinutes(loop[i]?.date, loop[i]?.startTime);

            if (direction === "up") {
                // ⬆️ "위쪽" 탐색 (현재 겹치는 일정보다 위쪽에 배치 가능한 공간 찾기)
                if (
                    nextStartAbs <= overlapBoundaryAbs && // 겹치는 일정의 시작 전까지만 탐색
                    nextStartAbs - prevEndAbs >= dropDuration && // 이전 일정 끝과 다음 일정 시작 사이에 충분한 공간이 있는지
                    nextStartAbs - dropDuration >= 360 // 06:00 이전에는 배치하지 않기 (일정 시작은 06:00부터)
                ) {
                    return nextStartAbs - dropDuration; // ✔️ 가능한 슬롯 발견 → 그 위치에 배치
                }
            } else {
                // ⬇️ "아래쪽" 탐색 (현재 겹치는 일정보다 아래쪽에 배치 가능한 공간 찾기)
                if (
                    prevEndAbs >= overlapBoundaryAbs && // 겹치는 일정의 끝 이후부터 탐색
                    prevEndAbs >= 360 && // 06:00 이후에만 배치 가능
                    nextStartAbs - prevEndAbs >= dropDuration // 이전 일정 끝과 다음 일정 시작 사이에 충분한 공간이 있는지
                ) {
                    return prevEndAbs; // ✔️ 가능한 슬롯 발견 → 바로 이전 일정 끝나는 시점에 배치
                }
            }
        }

        // ❌ 빈 슬롯을 찾지 못함
        return null;
    };

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
                minutesToTime(parseTime(dropStartTime) + stayTime)
            ),
        ];

        setSchedules((prev) => [...prev, ...splitSchedules]);
    };

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
                minutesToTime(parseTime(dropStartTime) + duration)
            ),
        ];

        setSchedules((prev) => [
            ...prev.filter((s) => s.tripScheduleId !== schedule.tripScheduleId),
            ...splitSchedules,
        ]);
    };
    return { handleDrop };
}
