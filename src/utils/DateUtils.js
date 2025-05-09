import { differenceInCalendarDays, format } from "date-fns";

export const formatDateRange = (startDate, endDate) => {
	if (!startDate || !endDate) return "";
	const formattedStart = format(startDate, "yyyy.MM.dd");
	const formattedEnd = format(endDate, "yyyy.MM.dd");
	const duration = differenceInCalendarDays(endDate, startDate) + 1;
	return `${formattedStart} - ${formattedEnd} (${duration}일)`;
};
