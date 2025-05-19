import { adjustMinutes, minutesToTime, timeToMinutes } from "./ScheduleTimeUtils"; 

const TIMELINE_START = 360;   // 06:00
const TIMELINE_END = 1800;    // 30:00 (익일 06:00)

// 🟢 외부에서 주입 필요 (예: React Context에서 관리하는 경우)
let setSchedules;

export const initScheduleHandler = (setter) => {
    setSchedules = setter;
};

// 🟢 새 일정 생성 및 추가 (분할/단일 모두 사용)
export const createAndAddSchedule = (
    place,
    dropDate,
    dropStartTime,
    stayTime,
    customEndTime,
    viewStartTime,
    viewEndTime,
    isSplit = false,
    tripScheduleId
) => {
    const generateSchedule = (date, startTime, endTime) => ({
        tripScheduleId: tripScheduleId || place.tripScheduleId || Date.now() + Math.random(),
        placeId: place.id || place.placeId,
        date,
        startTime,
        stayTime,
        endTime,
        isLocked: 0,
        isSplit,
        viewStartTime: viewStartTime || startTime,
        viewEndTime: viewEndTime || endTime,
        place: { ...place },
    });

    // endTime이 주어지지 않은 경우 stayTime을 기준으로 계산
    const endTime = customEndTime || minutesToTime(timeToMinutes(dropStartTime) + stayTime);

    const splitSchedules = [
        generateSchedule(
            dropDate,
            dropStartTime,
            endTime
        ),
    ];

    setSchedules((prev) => [...prev, ...splitSchedules]);
};

// 🟢 기존 일정 분할 및 반영 (분할/단일 모두)
export const splitAndSetSchedule = (
    schedule,
    dropDate,
    dropStartTime,
    dropEndTime,
    originViewStart,
    originViewEnd
) => {
    let startMin = timeToMinutes(dropStartTime);
    let endMin = timeToMinutes(dropEndTime);

    [startMin, endMin] = adjustMinutes(startMin, endMin);   // 익일 처리

    // place 객체 보정: schedule.place가 없으면 schedule 자체를 place로 사용
    const placeObj = schedule.place ? schedule.place : schedule;

    // 기존 일정 삭제
    setSchedules((prev) =>
        prev.filter((s) => s.tripScheduleId !== schedule.tripScheduleId)
    );

    // viewStartTime, viewEndTime을 항상 원본 기준으로 넘김
    const viewStart = originViewStart || schedule.viewStartTime || dropStartTime;
    const viewEnd = originViewEnd || schedule.viewEndTime || dropEndTime;

    // tripScheduleId를 분할 구간 모두 동일하게 사용
    const tripScheduleId = schedule.tripScheduleId;
    
    // 06:00 기준 분할 (전날로 넘어가는 경우)
    // 시작 시간 이 06:00 이전이고 종료 시간이 06:00 이후인 경우
    if (startMin < TIMELINE_START && endMin > TIMELINE_START) {
        const prevDate = new Date(dropDate);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDateStr = prevDate.toISOString().slice(0, 10);
        
        // 첫 구간: 전날 dropStartTime ~ 30:00
        const firstStayTime = TIMELINE_START - startMin; // 30:00까지의 머무는 시간
        createAndAddSchedule(
            placeObj,
            prevDateStr,
            dropStartTime,
            firstStayTime,
            "30:00",
            viewStart,
            viewEnd,
            true,
            tripScheduleId
        );
        // 둘째 구간: 당일 06:00 ~ dropEndTime
        const secondStayTime = endMin - TIMELINE_START;  // 6:00 이후 머무는 시간
        createAndAddSchedule(
            placeObj,
            dropDate,
            "06:00",
            secondStayTime,
            dropEndTime,
            viewStart,
            viewEnd,
            true,
            tripScheduleId
        );
        return;
    }

    // 30:00 기준 분할
    // 시작 시간이 30:00 이전이고 종료 시간이 30:00 이후인 경우
    if (endMin > TIMELINE_END) {
        // 첫 구간: 당일 dropStartTime ~ 30:00
        const firstStayTime = TIMELINE_END - startMin;
        createAndAddSchedule(
            placeObj,
            dropDate,
            dropStartTime,
            firstStayTime,
            "30:00",
            viewStart,
            viewEnd,
            true,
            tripScheduleId
        );
        const nextDate = new Date(dropDate);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDateStr = nextDate.toISOString().slice(0, 10);
        
        // 둘째 구간: 익일 06:00 ~ dropEndTime
        const secondStayTime = endMin - TIMELINE_END;
        createAndAddSchedule(
            placeObj,
            nextDateStr,
            "06:00",
            secondStayTime,
            undefined,
            viewStart,
            viewEnd,
            true,
            tripScheduleId
        );
    } else { // 분할 필요 없음
        const totalStayTime = endMin - startMin;
        createAndAddSchedule(
            placeObj,
            dropDate,
            dropStartTime,
            totalStayTime,
            undefined,
            viewStart,
            viewEnd,
            false,
            tripScheduleId
        );
    }
};