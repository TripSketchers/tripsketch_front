import { getAbsoluteMinutes, timeToMinutes } from "./ScheduleTimeUtils"; 

const TIMELINE_START = 360;    // 06:00
const TIMELINE_END = 1800;     // 30:00 (다음날 06:00)
const TIME_END = 1440;    // 24:00

// 📌 겹치는 일정 처리 및 빈 슬롯 찾기
export const findOverlappingSlot = (daySchedules, droppedItem, dropStartAbs, dropEndAbs) => {
    const overlappingSchedule = daySchedules.find((s) => {
        if (s.tripScheduleId === droppedItem.tripScheduleId) return false;
        const sStartAbs = getAbsoluteMinutes(s.date, s.startTime);
        let sEndAbs = getAbsoluteMinutes(s.date, s.endTime);

        // 익일로 넘어가는 일정 처리
        if (timeToMinutes(s.endTime) <= timeToMinutes(s.startTime)) {
            sEndAbs += TIME_END;
        }

        return dropStartAbs < sEndAbs && dropEndAbs > sStartAbs;
    });

    if (!overlappingSchedule) return dropStartAbs; // 겹치는 일정 없음

    const sStartAbs = getAbsoluteMinutes(overlappingSchedule.date, overlappingSchedule.startTime);
    const sEndAbs = sStartAbs + overlappingSchedule.stayTime;
    const overlapMidAbs = (sStartAbs + sEndAbs) / 2;

    const sorted = [...daySchedules]
        .filter((s) => s.tripScheduleId !== droppedItem.tripScheduleId)
        .sort(
            (a, b) => 
                getAbsoluteMinutes(a.date, a.startTime) - getAbsoluteMinutes(b.date, b.startTime)
        );

    if (dropStartAbs < overlapMidAbs) {
        const found = findEmptySlot(sorted, droppedItem.stayTime, "up", sStartAbs);
        return found !== null ? found : dropStartAbs;
    } 
    const found = findEmptySlot(sorted, droppedItem.stayTime, "down", sEndAbs);
    return found !== null ? found : dropStartAbs;
};

// 🟢 빈 슬롯(공간) 탐색 함수
export const findEmptySlot = (
    sorted,
    dropDuration,
    direction,
    overlapBoundaryAbs
) => {
    for (let i = 0; i <= sorted.length; i++) {
        const prevEndAbs =
            i === 0
                ? TIMELINE_START // 06:00 (타임라인 시작)
                : getAbsoluteMinutes(
                        sorted[i - 1].date,
                        sorted[i - 1].endTime
                    );

        const nextStartAbs =
            i === sorted.length
                ? TIMELINE_END // 30:00 (타임라인 끝)
                : getAbsoluteMinutes(sorted[i]?.date, sorted[i]?.startTime);

        if (direction === "up") {
            // 위쪽(겹치는 일정의 시작 전까지)에서 충분한 공간이 있는지
            if (
                nextStartAbs <= overlapBoundaryAbs &&
                nextStartAbs - prevEndAbs >= dropDuration &&
                nextStartAbs - dropDuration >= TIMELINE_START
            ) {
                return nextStartAbs - dropDuration;
            }
        } else {
            // 아래쪽(겹치는 일정의 끝 이후)에서 충분한 공간이 있는지
            if (
                prevEndAbs >= overlapBoundaryAbs &&
                prevEndAbs >= TIMELINE_START &&
                nextStartAbs - prevEndAbs >= dropDuration
            ) {
                return prevEndAbs;
            }
        }
    }
    return null; // 빈 슬롯 없음
};