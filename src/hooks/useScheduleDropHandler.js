import {
	getAbsoluteMinutes,
	minutesToTime,
	timeToMinutes,
} from "../utils/scheduleUtils";

export default function useScheduleDropHandler(schedules, setSchedules) {
	const handleDrop = (droppedItem, dropDate, startTime, endTime) => {
		// 🟢 머무는 시간 계산 (분할 일정이면 viewStart~end, 아니면 stayTime 또는 시간차)
		let totalStayTime;
		const isSplit = droppedItem.isSplit === true; // isSplit으로 분할 일정 여부 판단

		if (isSplit) {
			totalStayTime =
				timeToMinutes(droppedItem.viewEndTime) -
				timeToMinutes(droppedItem.viewStartTime);
		} else {
			const startMin = timeToMinutes(startTime);
			let endMin = timeToMinutes(endTime);

			if (endMin <= startMin || endMin > 360 && startMin < 360) {
				// ✅ 6시 이전은 다음날로 간주
				endMin += 1440;
			}

			totalStayTime = droppedItem.stayTime || (endMin - startMin) || 120;
		}

		// 🟢 드롭된 날짜의 06:00 이후 일정만 필터링
		const timelineStartAbs = getAbsoluteMinutes(dropDate, "06:00:00");
		const daySchedules = schedules.filter((s) => {
			const scheduleStartAbs = getAbsoluteMinutes(s.date, s.startTime);
			const scheduleDate = new Date(s.date);
			const dropDateObj = new Date(dropDate);
			const diffDays =
				(scheduleDate - dropDateObj) / (1000 * 60 * 60 * 24);

			if (diffDays === 0) {
				return scheduleStartAbs >= timelineStartAbs;
			} else if (diffDays === 1) {
				const startHour = parseInt(s.startTime.split(":")[0], 10);
				return startHour < 6;
			}
			return false;
		});

		// 🟢 드롭 위치의 절대 분 계산
		const dropStartAbs = getAbsoluteMinutes(dropDate, startTime);
		const dropEndAbs = getAbsoluteMinutes(dropDate, endTime);

		let adjustedStartAbs = dropStartAbs;

		// 🟢 겹치는 일정이 있는지 확인
		const overlappingSchedule = daySchedules.find((s) => {
			if (s.tripScheduleId === droppedItem.tripScheduleId) return false;
			const sStartAbs = getAbsoluteMinutes(s.date, s.startTime);
			let sEndAbs = getAbsoluteMinutes(s.date, s.endTime);

			// 익일로 넘어가는 일정 처리
			if (timeToMinutes(s.endTime) <= timeToMinutes(s.startTime)) {
				sEndAbs += 1440;
			}

			return dropStartAbs < sEndAbs && dropEndAbs > sStartAbs;
		});

		// 🟢 겹치는 일정이 있으면 위/아래 빈 슬롯 탐색
		if (overlappingSchedule) {
			const sStartAbs = getAbsoluteMinutes(
				overlappingSchedule.date,
				overlappingSchedule.startTime
			);
			const sEndAbs = sStartAbs + overlappingSchedule.stayTime;
			const overlapMidAbs = (sStartAbs + sEndAbs) / 2;

			const sorted = [...daySchedules]
				.filter((s) => s.tripScheduleId !== droppedItem.tripScheduleId)
				.sort(
					(a, b) =>
						getAbsoluteMinutes(a.date, a.startTime) -
						getAbsoluteMinutes(b.date, b.startTime)
				);

			if (dropStartAbs < overlapMidAbs) {
				const found = findEmptySlot(
					sorted,
					droppedItem.stayTime,
					"up",
					sStartAbs
				);
				if (found !== null) adjustedStartAbs = found;
				else return;
			} else {
				const found = findEmptySlot(
					sorted,
					droppedItem.stayTime,
					"down",
					sEndAbs
				);
				if (found !== null) adjustedStartAbs = found;
				else return;
			}
		}

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

	// 🟢 빈 슬롯(공간) 탐색 함수
	const findEmptySlot = (
		sorted,
		dropDuration,
		direction,
		overlapBoundaryAbs
	) => {
		for (let i = 0; i <= sorted.length; i++) {
			const prevEndAbs =
				i === 0
					? 360 // 06:00 (타임라인 시작)
					: getAbsoluteMinutes(
							sorted[i - 1].date,
							sorted[i - 1].endTime
					  );

			const nextStartAbs =
				i === sorted.length
					? 1800 // 30:00 (타임라인 끝)
					: getAbsoluteMinutes(sorted[i]?.date, sorted[i]?.startTime);

			if (direction === "up") {
				// 위쪽(겹치는 일정의 시작 전까지)에서 충분한 공간이 있는지
				if (
					nextStartAbs <= overlapBoundaryAbs &&
					nextStartAbs - prevEndAbs >= dropDuration &&
					nextStartAbs - dropDuration >= 360
				) {
					return nextStartAbs - dropDuration;
				}
			} else {
				// 아래쪽(겹치는 일정의 끝 이후)에서 충분한 공간이 있는지
				if (
					prevEndAbs >= overlapBoundaryAbs &&
					prevEndAbs >= 360 &&
					nextStartAbs - prevEndAbs >= dropDuration
				) {
					return prevEndAbs;
				}
			}
		}
		return null; // 빈 슬롯 없음
	};

	// 🟢 새 일정 생성 및 추가 (분할/단일 모두 사용)
	const createAndAddSchedule = (
		place,
		dropDate,
		dropStartTime,
		stayTime,
		customEndTime,
		viewStartTime,
		viewEndTime,
		isSplit = false,
		tripScheduleId // 추가
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
	const splitAndSetSchedule = (
		schedule,
		dropDate,
		dropStartTime,
		dropEndTime,
		originViewStart,
		originViewEnd
	) => {
		const startMin = timeToMinutes(dropStartTime);
		let endMin = timeToMinutes(dropEndTime);

		const splitPoint = 1800; // 30:00 기준
		const timelineStart = 360; // 06:00
        
		if (endMin <= startMin || endMin > timelineStart && startMin < timelineStart) {
			endMin += 1440; // ✅ 익일 처리
		}

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
		if (startMin < timelineStart && endMin > timelineStart) {
			// 첫 구간: 전날 dropStartTime ~ 06:00
			const firstStayTime = timelineStart - startMin;
			const prevDateObj = new Date(dropDate);
			prevDateObj.setDate(prevDateObj.getDate() - 1);
			const prevDateStr = prevDateObj.toISOString().slice(0, 10);

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
			const secondStayTime = endMin - timelineStart;
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

		if (endMin > splitPoint) {
			// 첫 구간
			const firstStayTime = splitPoint - startMin;
			createAndAddSchedule(
				placeObj,
				dropDate,
				dropStartTime,
				firstStayTime,
				"30:00",
				viewStart,
				viewEnd,
				true,
				tripScheduleId // 추가
			);
			// 둘째 구간
			const nextDate = new Date(dropDate);
			nextDate.setDate(nextDate.getDate() + 1);
			const nextDateStr = nextDate.toISOString().slice(0, 10);
			const secondStayTime = endMin - splitPoint;
			createAndAddSchedule(
				placeObj,
				nextDateStr,
				"06:00",
				secondStayTime,
				undefined,
				viewStart,
				viewEnd,
				true,
				tripScheduleId // 추가
			);
		} else {
			// 분할 필요 없음
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
				tripScheduleId // 추가
			);
		}
	};

	return { handleDrop, splitAndSetSchedule };
}