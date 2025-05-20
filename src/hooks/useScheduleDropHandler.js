import { initScheduleHandler, splitAndSetSchedule } from "../utils/ScheduleCreateUtils";
import { findOverlappingSlot } from "../utils/ScheduleOverlapUtils";
import {
    calculateTotalStayTime,
	getAbsoluteMinutes,
	minutesToTime,
	timeToMinutes,
} from "../utils/ScheduleTimeUtils";

const TIMELINE_START = 360;   // 06:00
const TIMELINE_END = 1800;    // 30:00 (익일 06:00)

export default function useScheduleDropHandler(schedules, setSchedules) {
	const handleDrop = (droppedItem, dropDate, startTime, endTime) => {
        console.log("✔️[handleDrop] ▶ 드래그된 일정 Drop 시작");
        console.log("드롭 대상:", droppedItem);
        console.log("드롭 날짜:", dropDate);
        console.log("드롭 시작 시간:", startTime, "드롭 종료 시간:", endTime);
		// ✅ 머무는 시간 계산 (분할 일정이면 viewStart~end, 아니면 stayTime 또는 시간차)
		const isSplit = droppedItem.isSplit === true; // isSplit으로 분할 일정 여부 판단
        let totalStayTime = calculateTotalStayTime(droppedItem, startTime, endTime);

        // 📅 드롭된 날짜의 06:00 이후 일정만 필터링
        const daySchedules = schedules.filter((s) => {
            const scheduleStartAbs = getAbsoluteMinutes(s.startTime);
            const scheduleDate = new Date(s.date);
            const dropDateObj = new Date(dropDate);
            const diffDays = (scheduleDate - dropDateObj) / (1000 * 60 * 60 * 24);

			if (diffDays === 0) {   // dropDate와 같은 날짜의 일정(6:00 이후)
				return scheduleStartAbs >= TIMELINE_START;
			} else if (diffDays === 1) {    // dropDate의 "다음날" 일정(6:00 이전)
				const startHour = parseInt(s.startTime.split(":")[0], 10);
				return startHour < 6;
			}
			return false;
		});

        // 📍 드롭 위치의 절대 분 계산
        const dropStartAbs = getAbsoluteMinutes(startTime);
        const dropEndAbs = getAbsoluteMinutes(endTime);

		// 🚧 겹치는 일정 확인 및 빈 슬롯 탐색
		let adjustedStartAbs = findOverlappingSlot(daySchedules, droppedItem, dropStartAbs, dropEndAbs);
        if (adjustedStartAbs === null) return;   // 🚫 이동할 공간 없으면 Drop 취소

		const adjustedStartTime = minutesToTime(adjustedStartAbs);

		// 📝 viewStartTime, viewEndTime 계산
		let viewStartTime, viewEndTime;

        // 이동한 위치의 시작시간을 기준으로 전체 구간 길이만큼 viewEndTime 계산
        viewStartTime = adjustedStartTime;
        viewEndTime = minutesToTime(timeToMinutes(adjustedStartTime) + totalStayTime);  // !!!!

		// 🗑️ 삭제할 일정들(분할이면 전체, 아니면 단일)
		let schedulesToRemove = [];

		if (isSplit) {  // 분할 일정인 경우: 분할된 일정 전체를 삭제
			// isSplit이 true인 모든 일정(같은 tripScheduleId, viewStartTime, viewEndTime) 삭제
			schedulesToRemove = schedules.filter(
				(s) =>
					s.tripScheduleId === droppedItem.tripScheduleId &&
					s.viewStartTime === droppedItem.viewStartTime &&
					s.viewEndTime === droppedItem.viewEndTime
			);
		} else {    // 단일 일정인 경우: 해당 droppedItem만 삭제
			schedulesToRemove = [droppedItem];
		}

		// 🧹 기존 일정 삭제
		setSchedules((prev) =>
			prev.filter(
				(s) =>
					!schedulesToRemove.some(    // 삭제할 일정과 같은 일정이 아닌 경우
						(r) =>
							s.tripScheduleId === r.tripScheduleId &&
							s.viewStartTime === r.viewStartTime &&
							s.viewEndTime === r.viewEndTime
					)
			)
		);

        initScheduleHandler(setSchedules);
		// ➕ 새 위치에 맞게 일정 추가 (분할이면 전체 구간, 아니면 단일)
		splitAndSetSchedule(
			droppedItem,
			dropDate,
			adjustedStartTime,
			minutesToTime(timeToMinutes(adjustedStartTime) + totalStayTime)
		);
        console.log("➖[handleDrop] ▶ 드래그된 일정 Drop 종료");
	};

	return { handleDrop };
}
