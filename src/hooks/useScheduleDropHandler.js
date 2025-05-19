import { initScheduleHandler, splitAndSetSchedule } from "../utils/ScheduleCreateUtils";
import { findOverlappingSlot } from "../utils/ScheduleOverlapUtils";
import {
    calculateTotalStayTime,
	getAbsoluteMinutes,
	minutesToTime,
	timeToMinutes,
} from "../utils/ScheduleTimeUtils";

export default function useScheduleDropHandler(schedules, setSchedules) {
	const handleDrop = (droppedItem, dropDate, startTime, endTime) => {
		// 🟢 머무는 시간 계산 (분할 일정이면 viewStart~end, 아니면 stayTime 또는 시간차)
		const isSplit = droppedItem.isSplit === true; // isSplit으로 분할 일정 여부 판단

		let totalStayTime = calculateTotalStayTime(droppedItem, startTime, endTime);

		// 🟢 드롭된 날짜의 06:00 이후 일정만 필터링
		const timelineStartAbs = getAbsoluteMinutes(dropDate, "06:00");
		const daySchedules = schedules.filter((s) => {
			const scheduleStartAbs = getAbsoluteMinutes(s.date, s.startTime);
			const scheduleDate = new Date(s.date);
			const dropDateObj = new Date(dropDate);
			const diffDays =
				(scheduleDate - dropDateObj) / (1000 * 60 * 60 * 24);

			if (diffDays === 0) {   // dropDate와 같은 날짜의 일정(6:00 이후)
				return scheduleStartAbs >= timelineStartAbs;
			} else if (diffDays === 1) {    // dropDate의 "다음날" 일정(6:00 이전)
				const startHour = parseInt(s.startTime.split(":")[0], 10);
				return startHour < 6;
			}
			return false;
		});

		// 🟢 드롭 위치의 절대 분 계산
		const dropStartAbs = getAbsoluteMinutes(dropDate, startTime);
		const dropEndAbs = getAbsoluteMinutes(dropDate, endTime);

		let adjustedStartAbs = findOverlappingSlot(daySchedules, droppedItem, dropStartAbs, dropEndAbs);
		const adjustedStartTime = minutesToTime(adjustedStartAbs);

		// 🟢 viewStartTime, viewEndTime 계산
		let viewStartTime, viewEndTime;
		if (isSplit) {
			// 이동한 위치의 시작시간을 기준으로 전체 구간 길이만큼 viewEndTime 계산
			viewStartTime = adjustedStartTime;
			viewEndTime = minutesToTime(timeToMinutes(adjustedStartTime) + totalStayTime);
		} else {
			viewStartTime = adjustedStartTime;
			viewEndTime = minutesToTime(timeToMinutes(adjustedStartTime) + totalStayTime);
		}

		// 🟢 삭제할 일정들(분할이면 전체, 아니면 단일)
		let schedulesToRemove = [];

		if (isSplit) {
			// isSplit이 true인 모든 일정(같은 tripScheduleId, viewStartTime, viewEndTime) 삭제
			schedulesToRemove = schedules.filter(
				(s) =>
					s.tripScheduleId === droppedItem.tripScheduleId &&
					s.viewStartTime === droppedItem.viewStartTime &&
					s.viewEndTime === droppedItem.viewEndTime
			);
		} else {
			schedulesToRemove = [droppedItem];
		}

		// 🟢 기존 일정 삭제
		setSchedules((prev) =>
			prev.filter(
				(s) =>
					!schedulesToRemove.some(
						(r) =>
							s.tripScheduleId === r.tripScheduleId &&
							s.viewStartTime === r.viewStartTime &&
							s.viewEndTime === r.viewEndTime
					)
			)
		);

        initScheduleHandler(setSchedules);
		// 🟢 새 위치에 맞게 일정 추가 (분할이면 전체 구간, 아니면 단일)
		splitAndSetSchedule(
			droppedItem,
			dropDate,
			adjustedStartTime,
			minutesToTime(timeToMinutes(adjustedStartTime) + totalStayTime),
			viewStartTime,
			viewEndTime
		);
	};

	return { handleDrop };
}