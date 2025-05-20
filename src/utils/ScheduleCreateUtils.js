import { adjustMinutes, minutesToAbsTime, minutesToTime, timeToMinutes } from "./ScheduleTimeUtils"; 

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
    date,
    startTime,
    stayTime,
    endTime,
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
    const calEndTime = endTime || minutesToTime(timeToMinutes(startTime) + stayTime);
    console.log("[createAndAddSchedule]", {
        date,
        startTime,
        stayTime,
        endTime,
        calEndTime: calEndTime,
        viewStartTime,
        viewEndTime,
    });
    

    const splitSchedules = [
        generateSchedule(
            date,
            startTime,
            calEndTime
        ),
    ];

    setSchedules((prev) => [...prev, ...splitSchedules]);
};

// 🟢 기존 일정 분할 및 반영 (분할/단일 모두)
export const splitAndSetSchedule = (schedule, dropDate, dropStartTime, dropEndTime) => {
    console.log("----------------------------");
    console.log("[splitAndSetSchedule]", schedule, dropDate, dropStartTime, dropEndTime);
    
    let startMin = timeToMinutes(dropStartTime);
    let endMin = timeToMinutes(dropEndTime);
    [startMin, endMin] = adjustMinutes(startMin, endMin);

    const placeObj = schedule.place || schedule;

    // ❗ viewStartTime, viewEndTime은 원본 전체 범위로 유지
    const viewStart = dropStartTime;
    const viewEnd = dropEndTime;

    const tripScheduleId = schedule.tripScheduleId;
    console.log("startMin, endMin", startMin, endMin);
    console.log("dropDate", dropDate);
    console.log("schedule", {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        viewStartTime: schedule.viewStartTime,
        viewEndTime: schedule.viewEndTime,
    });

    // 📌 1. 전날로 넘어가는 경우
    if (startMin < TIMELINE_START && endMin > TIMELINE_START) {
        console.log("1. 전날로 넘어가는 경우");
        const prevDate = new Date(dropDate);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDateStr = prevDate.toISOString().slice(0, 10);

        const firstStayTime = TIMELINE_START - startMin;
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

        const secondStayTime = endMin - TIMELINE_START;
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

    // 📌 2. 다음날로 넘어가는 경우
    if (startMin < TIMELINE_END && endMin > TIMELINE_END) {
        console.log("2. 다음날로 넘어가는 경우");
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
        return;
    }

    // 📌 3. 분할 필요 없음  
    
    const totalStayTime = endMin - startMin;
    createAndAddSchedule(
        placeObj,
        dropDate,
        dropStartTime,
        totalStayTime,
        minutesToAbsTime(endMin),
        undefined,
        undefined,
        false,
        tripScheduleId
    );
};