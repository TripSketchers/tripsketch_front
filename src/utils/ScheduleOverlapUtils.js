import { getAbsoluteMinutes } from "./ScheduleTimeUtils";

const TIMELINE_START = 360;   // 06:00
const TIMELINE_END = 1800;    // 30:00 (다음날 06:00)

/** 📌 겹치는 일정 처리 및 빈 슬롯 찾기 (travelTime 고려) */
export const findOverlappingSlot = (daySchedules, droppedItem, dropStartAbs, dropEndAbs) => {
    console.log("[findOverlappingSlot] dropStartAbs:", dropStartAbs, "dropEndAbs:", dropEndAbs);
    
    const overlappingSchedule = daySchedules.find((s) => {
        if (s.tripScheduleId === droppedItem.tripScheduleId) return false;

        const sStartAbs = getAbsoluteMinutes(s.startTime);
        const sEndAbs = getAbsoluteMinutes(s.endTime);
        const travelTime = s.travelTime ?? 0;

        const isOverlap = dropStartAbs < sEndAbs + travelTime && dropEndAbs > sStartAbs;
        if (isOverlap) {
            console.log("  ↪️ 겹치는 일정 발견:", s);
        }
        return isOverlap;
    });

    if (!overlappingSchedule) {
        console.log("✅ 겹치는 일정 없음, dropStartAbs 반환:", dropStartAbs);
        return dropStartAbs; // 겹치는 일정 없음
    }

    const sStartAbs = getAbsoluteMinutes(overlappingSchedule.startTime);
    const sEndAbs = getAbsoluteMinutes(overlappingSchedule.endTime);
    const overlapMidAbs = (sStartAbs + sEndAbs) / 2;

    const sorted = [...daySchedules]
        .filter((s) => s.tripScheduleId !== droppedItem.tripScheduleId)
        .sort((a, b) =>
            getAbsoluteMinutes(a.startTime) - getAbsoluteMinutes(b.startTime)
        );

    console.log("🔎 겹침 기준 중간값:", overlapMidAbs, "dropStartAbs:", dropStartAbs);

    if (dropStartAbs < overlapMidAbs) {
        console.log("⬆️ 위쪽 빈 슬롯 탐색");
        return findEmptySlot(sorted, droppedItem.stayTime + droppedItem.travelTime, "up", sStartAbs);
    }

    console.log("⬇️ 아래쪽 빈 슬롯 탐색");
    return findEmptySlot(sorted, droppedItem.stayTime + droppedItem.travelTime, "down", sEndAbs);
};

/** 🟢 빈 슬롯 탐색 함수 (travelTime 포함) */
export const findEmptySlot = (
    sorted,
    dropDuration,
    direction,
    overlapBoundaryAbs
) => {
    let candidate = null;
    console.log(sorted);

    for (let i = 0; i <= sorted.length; i++) {
        const prevEndAbs =
            i === 0
                ? TIMELINE_START
                : getAbsoluteMinutes(sorted[i - 1].endTime) +
                  (sorted[i - 1].travelTime ?? 0); // ⬅ travelTime 추가

        const nextStartAbs =
            i === sorted.length
                ? TIMELINE_END
                : getAbsoluteMinutes(sorted[i].startTime);

        console.log(
            `[${direction}] 슬롯 체크: prevEndAbs=${prevEndAbs}, nextStartAbs=${nextStartAbs}, overlapBoundaryAbs=${overlapBoundaryAbs}`
        );

        if (direction === "up") {
            if (
                nextStartAbs <= overlapBoundaryAbs &&
                nextStartAbs - prevEndAbs >= dropDuration &&
                nextStartAbs - dropDuration >= TIMELINE_START
            ) {
                console.log(`[UP] 조건 만족: prevEndAbs=${prevEndAbs}, nextStartAbs=${nextStartAbs}`);
                if (!candidate || prevEndAbs > candidate) {
                    candidate = nextStartAbs - dropDuration;
                }
            }
        } else {
            if (
                prevEndAbs >= overlapBoundaryAbs &&
                prevEndAbs >= TIMELINE_START &&
                nextStartAbs - prevEndAbs >= dropDuration
            ) {
                console.log(`[DOWN] 조건 만족: prevEndAbs=${prevEndAbs}, nextStartAbs=${nextStartAbs}`);
                return prevEndAbs;
            }
        }
    }

    if (direction === "up" && candidate !== null) {
        console.log(`[UP] 최종 candidate 반환: ${candidate}`);
        return candidate;
    }

    console.log("❌ 빈 슬롯 없음");
    return null;
};
