import { differenceInCalendarDays, differenceInDays, format } from "date-fns";

// D-Day 계산 (여행 시작일 기준)
export function getDday(startDate) {
    const today = new Date();
    const start = new Date(startDate);
    const diff = differenceInDays(start, today);

    if (diff === 0) return "D - Day";
    if (diff > 0) return `D - ${diff}`;
    return `D + ${Math.abs(diff)}`;
}

// D-Day(여행 시작일 기준), n박 n일 계산
export function getNightandDays(startDate, endDate) {
    if (!startDate || !endDate) return { dDay: "-", period: "-" };
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // D-Day 계산
    const diff = differenceInDays(start, today);
    let dDay;
    if (diff === 0) dDay = "D - Day";
    else if (diff > 0) dDay = `D - ${diff}`;
    else dDay = `D + ${Math.abs(diff)}`;

    // n박 n일 계산
    const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
    const days = nights + 1;
    const period = `${nights}박 ${days}일`;

    return { dDay, period };
}

// 날짜 포맷 (yyyy/MM/dd)
export const formatDate = (date) => format(new Date(date), "yyyy/MM/dd");

// n일차 계산 (여행 일정 기준) 
export function getNday(startDate, todayDate) {
    const start = new Date(startDate);
    const today = new Date(todayDate);
    const diff = differenceInDays(today, start) + 1; // n일차는 1부터 시작하므로 +1
    return `${Math.abs(diff)}일차`;
}

export const formatDateRange = (startDate, endDate) => {
	if (!startDate || !endDate) return "";
	const formattedStart = format(startDate, "yyyy.MM.dd");
	const formattedEnd = format(endDate, "yyyy.MM.dd");
	const duration = differenceInCalendarDays(endDate, startDate) + 1;
	return `${formattedStart} - ${formattedEnd} (${duration}일)`;
};

// 날짜 포맷 (yyyy-MM-dd ~ yyyy-MM-dd)
export function tripDateFormatting(startDate, todayDate) {
    return `${formatDate(startDate)} ~ ${formatDate(todayDate)}`;
}
