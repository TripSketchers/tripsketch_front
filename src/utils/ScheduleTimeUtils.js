const TIMELINE_START = 360;   // 06:00
const TIMELINE_END = 1800;    // 30:00
const TIME_END = 1440;    // 24:00

// 📌 문자열 "HH:MM" → 총 분(minute) 변환  
export const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

// 📌 총 분(minute) → "HH:MM" 포맷 (입력/화면 표시용)  
export const minutesToTime = (totalMinutes) => {
    const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
};

// 📌 총 분(minute) → "HH:MM:00" 포맷 (DB 저장용 등)  
export const minutesToTimeWithSeconds = (totalMinutes) => {
    const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}:00`;
};

// 📌 타임라인 좌표용: "HH:MM" → 절대 분(minute)  
export const getTimelineMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const total = timeToMinutes(timeStr);
    return total < TIMELINE_START ? total + TIME_END : total;
};

// 📌 타임라인 절대 분(minute) 계산 (06:00 기준, 0시~5시 → 다음날 처리)  
export const getAbsoluteMinutes = (timeStr) => {
    const totalMinutes = timeToMinutes(timeStr);
    return totalMinutes < TIMELINE_START ? totalMinutes + TIME_END : totalMinutes;
};

// 📌 카드 위치와 높이 계산 (타임라인에서 사용)  
export const getCardPositionAndHeight = (startTime, endTime, pixelsPerMinute = 1) => {
    const start = getTimelineMinutes(startTime);
    const end = getTimelineMinutes(endTime);
    const top = (start - TIMELINE_START) * pixelsPerMinute;
    const height = (end - start) * pixelsPerMinute;
    return { top, height };
};

// 📌 시간 값(Hour) → "HH:00" 포맷 (타임라인 라벨용)  
export const formatHour = (h) => `${(h % 24).toString().padStart(2, "0")}:00`;

// ✅ 시간 문자열을 익일 처리해서 표시용으로 변환
export function formatDisplayTime(timeStr) {
    if (!timeStr) return "";

    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);

    if (hour >= 24) hour -= 24;

    const formattedHour = hour.toString().padStart(2, "0");
    return `${formattedHour}:${minute}`;
}

// ⏰ 종료 시간 계산 함수 (startTime + stayTime)
export function calculateEndTime(startTime, stayTime) {
    const [h, m] = startTime.split(":").map(Number);
    const startDate = new Date(2025, 0, 1, h, m);
    const endDate = new Date(startDate.getTime() + stayTime * 60000);
    const endH = String(endDate.getHours()).padStart(2, "0");
    const endM = String(endDate.getMinutes()).padStart(2, "0");
    return `${endH}:${endM}:00`;
}

// 📌 드롭된 일정의 시작/종료 시간 계산 (드롭된 날짜 기준)
export const getDisplayStayTime = (start, end) => {
    const startMin = timeToMinutes(start);
    let endMin = timeToMinutes(end);
    if (endMin <= startMin) {
        endMin += TIME_END; // 익일 처리
    }
    return endMin - startMin;
};

// ✅ 머무는 시간 계산 유틸 함수
export const calculateTotalStayTime = (droppedItem, startTime, endTime) => {
    if (droppedItem.isSplit === true) {
        let start = timeToMinutes(droppedItem.viewStartTime);
        let end = timeToMinutes(droppedItem.viewEndTime);
        [start, end] = adjustMinutes(start, end);
        return end - start;
    } else {
        let start = timeToMinutes(startTime);
        let end = timeToMinutes(endTime);
        [start, end] = adjustMinutes(start, end);
        return droppedItem.stayTime || (end - start) || 120;
    }
};

// 🟢 익일 처리 함수
export const adjustMinutes = (start, end) => {
    if (end <= start || (end > TIMELINE_START && start < TIMELINE_START)) {
        end += TIME_END; // 다음날로 간주
    }
    if (start < TIMELINE_START && start >= 0) {
        start += TIME_END; // 익일 처리
    }
    return [start, end];
};