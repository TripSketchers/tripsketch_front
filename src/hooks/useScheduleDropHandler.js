import { showToast } from "../components/Toast/Toast";
import {
    initScheduleHandler,
    splitAndSetSchedule,
} from "../utils/ScheduleCreateUtils";
import { findOverlappingSlot } from "../utils/ScheduleOverlapUtils";
import {
    calculateTotalStayTime,
    getAbsoluteMinutes,
    minutesToTime,
    timeToMinutes,
} from "../utils/ScheduleTimeUtils";
import { calculateTravelTimes } from "../utils/ScheduleTravelUtils";

const TIMELINE_START = 360; // 06:00
const TIME_END = 1440; // 24:00
const TIMELINE_END = 1800; // 30:00 (익일 06:00)

export default function useScheduleDropHandler(schedules, setSchedules) {
    // tripScheduleId에서 기준 날짜 추출
    const getBaseDateFromId = (tripScheduleId = "") => {
        const parts = String(tripScheduleId).split("_");
        return parts.length >= 2 ? parts[1] : null;
    };

    const handleDrop = async (
        droppedItem,
        dropDate,
        startTime,
        endTime,
        tripInfo
    ) => {
        // 💾 드롭 전 원본 스케줄 상태 저장 (롤백용)
        // 원본 배열 자체를 복사
        const originalSchedules = [...schedules];

        const isSplit = droppedItem.isSplit === true;
        const baseDateForSplit = isSplit
            ? getBaseDateFromId(droppedItem.tripScheduleId) || dropDate
            : dropDate;
        const effectiveDropDate = baseDateForSplit;

        const totalStayTime = calculateTotalStayTime(
            droppedItem,
            startTime,
            endTime
        );
        const dropStartAbs = timeToMinutes(startTime);
        const dropEndAbs = timeToMinutes(endTime);

        // 기존 위치 저장
        const prevSchedules = [...schedules].sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
        });

        const prevIndex = prevSchedules.findIndex(
            (s) => s.tripScheduleId === droppedItem.tripScheduleId
        );

        // 1️⃣ 기존 스케줄 삭제
        const schedulesToRemove = isSplit
            ? schedules.filter(
                  (s) => s.tripScheduleId === droppedItem.tripScheduleId
              )
            : [droppedItem];

        const baseSchedules = schedules.filter(
            (s) =>
                !schedulesToRemove.some(
                    (r) => s.tripScheduleId === r.tripScheduleId
                )
        );

        // 2️⃣ 가상 위치 스케줄 구성
        const simulatedItem = {
            ...droppedItem,
            tripScheduleId:
                droppedItem.tripScheduleId ?? Date.now() + Math.random(),
            startTime: minutesToTime(dropStartAbs % 1440),
            endTime: minutesToTime((dropStartAbs + totalStayTime) % 1440),
            date: effectiveDropDate,
            place: droppedItem.place,
            // travelTime 초기화
            travelTime: 0,
        };

        // 3️⃣ 삽입 후 정렬
        // 💡 핵심 수정: baseSchedules의 모든 스케줄 객체를 복사하여 참조를 끊음
        const copiedBaseSchedules = baseSchedules.map((s) => ({ ...s }));

        const tempSchedules = [...copiedBaseSchedules, simulatedItem].sort(
            (a, b) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
            }
        );

        const currIndex = tempSchedules.findIndex(
            (s) => s.tripScheduleId === simulatedItem.tripScheduleId
        );

        // 4️⃣ 영향 받는 스케줄들 travelTime 계산
        const travelResults = await calculateTravelTimes(
            prevSchedules,
            tempSchedules,
            prevIndex,
            currIndex,
            tripInfo?.transportType
        );

        let droppedItemTravelTime = 0; // 드롭된 아이템의 travelTime 저장용 변수

        travelResults
            .filter((res) => res && typeof res === "object" && "from" in res)
            .forEach((res) => {
                const idxList = tempSchedules
                    .map((s, i) => ({ schedule: s, index: i }))
                    .filter((s) => s.schedule.tripScheduleId === res?.from);

                const travelTime = res?.travelTime ?? 0;

                if (idxList.length > 1) {
                    // split된 경우, 두 번째 스케줄에만 travelTime 부여
                    tempSchedules[idxList[1].index].travelTime = travelTime;
                } else if (idxList.length === 1) {
                    // 일반 스케줄은 그대로 적용
                    // tempSchedules[idxList[0].index]는 이미 복사된 객체이므로 원본에 영향 X
                    tempSchedules[idxList[0].index].travelTime = travelTime;

                    // droppedItem (simulatedItem)에 할당된 travelTime을 별도로 저장
                    if (
                        tempSchedules[idxList[0].index].tripScheduleId ===
                        droppedItem.tripScheduleId
                    ) {
                        droppedItemTravelTime = travelTime;
                    }
                }
            });

        // ✅ 날짜별 마지막 스케줄 travelTime = 0 설정
        if (tempSchedules.length > 0) {
            tempSchedules[tempSchedules.length - 1].travelTime = 0;
        }

        // 6️⃣ 시간 겹침 조정 준비
        // droppedItem을 직접 수정하지 않고, 계산된 travelTime을 가진 임시 객체를 생성
        const itemForOverlapCheck = {
            ...droppedItem,
            travelTime: droppedItemTravelTime,
        };

        const daySchedules = tempSchedules.filter((s) => {
            const scheduleStartAbs = getAbsoluteMinutes(s.startTime);
            const scheduleDate = new Date(s.date);
            const dropDateObj = new Date(effectiveDropDate);
            const diffDays =
                (scheduleDate - dropDateObj) / (1000 * 60 * 60 * 24);

            if (diffDays === 0) return scheduleStartAbs >= TIMELINE_START;
            if (diffDays === 1) {
                const startHour = parseInt(s.startTime.split(":")[0], 10);
                return startHour < 6;
            }
            return false;
        });

        // travelTime이 포함된 임시 객체 itemForOverlapCheck를 전달
        const adjustedStartAbs = findOverlappingSlot(
            daySchedules,
            itemForOverlapCheck,
            dropStartAbs,
            dropEndAbs
        );

        if (adjustedStartAbs === null) {
            // ❌ 조정될 자리가 없는 경우: 원본 상태로 롤백
            setSchedules(originalSchedules);
            showToast.info(
                "일정을 넣을 공간이 없어요. 다른 빈 곳에 다시 시도해 보세요!"
            );
            return;
        }

        const adjustedStartTime = minutesToTime(adjustedStartAbs);
        const adjustedEndTime = minutesToTime(adjustedStartAbs + totalStayTime);

        // 7️⃣ 새로운 일정 생성 및 병합
        initScheduleHandler(setSchedules); // 내부 초기화만
        const newSchedules = splitAndSetSchedule(
            droppedItem,
            effectiveDropDate,
            adjustedStartTime,
            adjustedEndTime
        );

        // 💡 새로운 스케줄에 travelTime을 정확하게 적용
        newSchedules.forEach((ns) => {
            ns.travelTime = droppedItemTravelTime;
        });

        const finalSchedules = [...copiedBaseSchedules, ...newSchedules]; // 💡 copiedBaseSchedules 사용

        // 8️⃣ 날짜별 정렬 및 position 지정
        const byDate = finalSchedules.reduce((acc, s) => {
            if (!acc[s.date]) acc[s.date] = [];
            acc[s.date].push(s);
            return acc;
        }, {});

        Object.keys(byDate).forEach((date) => {
            const sorted = byDate[date].sort(
                (a, b) =>
                    timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
            );
            sorted.forEach((s, i) => {
                s.position = i;
            });
        });

        // 9️⃣ 최종 적용
        setSchedules(finalSchedules);
    };

    return { handleDrop };
}
