import { addDays, format } from "date-fns";

const TIMELINE_START = 360;   // 06:00
const TIMELINE_END = 1800;    // 30:00
const TIME_END = 1440;        // 24:00

// 📌 문자열 "HH:MM" → 총 분(minute) 변환  
export const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

// 📌 총 분(minute) → "HH:MM" 포맷
export const minutesToTime = (totalMinutes) => {
    const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
};

// 📌 총 분(minute) → "HH:MM" 포맷
export const minutesToAbsTime = (totalMinutes) => {
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
};

// 📌 타임라인 좌표/절대 분(minute) 계산 (06:00 기준, 0시~5시 → 다음날 처리)  
export const getAbsoluteMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const total = timeToMinutes(timeStr);
    return total < TIMELINE_START ? total + TIME_END : total;
};

// 📌 카드 위치와 높이 계산 (타임라인에서 사용)  
export const getCardPositionAndHeight = (startTime, endTime, pixelsPerMinute = 1) => {
    const start = getAbsoluteMinutes(startTime);
    const end = getAbsoluteMinutes(endTime);
    const top = (start - TIMELINE_START) * pixelsPerMinute;
    let height = (end - start) * pixelsPerMinute;
    if(height < 0) height += 1440;
    return { top, height };
};

// 📌 시간 값(Hour) → "HH:00" 포맷 (타임라인 라벨용)  
export const formatHour = (h) => `${(h % 24).toString().padStart(2, "0")}:00`;

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
export const adjustMinutes = (start, end) => {  //02:00 10:00
    if (end <= start || end > TIMELINE_START && start < TIMELINE_START) {
        end += TIME_END; // 다음날로 간주
    }
    if (start < TIMELINE_START && start >= 0) {
        start += TIME_END; // 익일 처리
    }
    return [start, end];
};

// 📌 드롭된 일정의 시작/종료 시간 차이 계산 (드롭된 날짜 기준)
export const getDisplayStayTime = (start, end) => {
    const startMin = timeToMinutes(start);
    let endMin = timeToMinutes(end);
    if (endMin <= startMin) {
        endMin += TIME_END; // 익일 처리
    }
    return endMin - startMin;
};

// 24시간 이상인 경우 시간 변환
export const normalizeTime = (timeStr) => {
    if (!timeStr) return "00:00";
    const min = timeToMinutes(timeStr);
    return minutesToTime(min % 1440);
};

// 하루를 넘으면 date 증가 + 시간 조정
export const adjustTimeAndDate = (dateStr, timeStr) => {
	const totalMin = timeToMinutes(timeStr);

	if (totalMin < 1440) {
		return { date: dateStr, time: timeStr };
	} else {
		const dateObj = new Date(dateStr);
		dateObj.setDate(dateObj.getDate() + 1);

		const adjustedMinutes = totalMin - 1440;
		const hours = String(Math.floor(adjustedMinutes / 60)).padStart(2, "0");
		const minutes = String(adjustedMinutes % 60).padStart(2, "0");

		return {
			date: dateObj.toISOString().split("T")[0],
			time: `${hours}:${minutes}`,
		};
	}
};