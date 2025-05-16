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
    return total < 360 ? total + 1440 : total;
};

// 📌 타임라인 절대 분(minute) 계산 (06:00 기준, 0시~5시 → 다음날 처리)  
export const getAbsoluteMinutes = (dateStr, timeStr) => {
    const totalMinutes = timeToMinutes(timeStr);
    return totalMinutes < 360 ? totalMinutes + 1440 : totalMinutes;
};

// 📌 카드 위치와 높이 계산 (타임라인에서 사용)  
export const getCardPositionAndHeight = (startTime, endTime, pixelsPerMinute = 1) => {
    const start = getTimelineMinutes(startTime);
    const end = getTimelineMinutes(endTime);
    const top = (start - 360) * pixelsPerMinute;
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
