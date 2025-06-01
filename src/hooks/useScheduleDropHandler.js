import {
	initScheduleHandler,
	splitAndSetSchedule,
} from "../utils/ScheduleCreateUtils";
import { findOverlappingSlot } from "../utils/ScheduleOverlapUtils";
import {
	calculateTotalStayTime,
	getAbsoluteMinutes,
	minutesToAbsTime,
	timeToMinutes,
} from "../utils/ScheduleTimeUtils";
import { calculateTravelTimes } from "../utils/ScheduleTravelUtils";

const TIMELINE_START = 360; // 06:00
const TIMELINE_END = 1800; // 30:00 (익일 06:00)

export default function useScheduleDropHandler(schedules, setSchedules) {
	const handleDrop = async (
		droppedItem,
		dropDate,
		startTime,
		endTime,
		tripInfo
	) => {
		const isSplit = droppedItem.isSplit === true;
		const totalStayTime = calculateTotalStayTime(
			droppedItem,
			startTime,
			endTime
		);
		const dropStartAbs = getAbsoluteMinutes(startTime);
		const dropEndAbs = getAbsoluteMinutes(endTime);

		// 기존 위치 저장
		const prevSchedules = [...schedules].sort((a, b) => {
			if (a.date < b.date) return -1;
			if (a.date > b.date) return 1;
			return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
		});

		const prevIndex = prevSchedules.findIndex(
			(s) => s.tripScheduleId === droppedItem.tripScheduleId
		);

		// 1️⃣ 기존 스케줄 삭제
		const schedulesToRemove = isSplit
			? schedules.filter(
					(s) =>
						s.tripScheduleId === droppedItem.tripScheduleId &&
						s.viewStartTime === droppedItem.viewStartTime &&
						s.viewEndTime === droppedItem.viewEndTime
			  )
			: [droppedItem];

		const baseSchedules = schedules.filter(
			(s) =>
				!schedulesToRemove.some(
					(r) =>
						s.tripScheduleId === r.tripScheduleId &&
						s.viewStartTime === r.viewStartTime &&
						s.viewEndTime === r.viewEndTime
				)
		);

		// 2️⃣ 가상 위치 스케줄 구성
		const simulatedItem = {
			...droppedItem,
			tripScheduleId:
				droppedItem.tripScheduleId ?? Date.now() + Math.random(),
			startTime: minutesToAbsTime(dropStartAbs),
			endTime: minutesToAbsTime(dropStartAbs + totalStayTime),
			date: dropDate,
		};

		// 3️⃣ 삽입 후 정렬
		const tempSchedules = [...baseSchedules, simulatedItem].sort((a, b) => {
			if (a.date < b.date) return -1;
			if (a.date > b.date) return 1;
			return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
		});

		const currIndex = tempSchedules.findIndex(
			(s) => s.tripScheduleId === simulatedItem.tripScheduleId
		);

		// 4️⃣ 영향 받는 스케줄들 travelTime 계산
		const travelResults = await calculateTravelTimes(
			prevSchedules,
			tempSchedules,
			prevIndex,
			currIndex,
			tripInfo?.transportType
		);

		console.log("🚀 Travel Results:", travelResults);

		travelResults.forEach((res) => {
			const idxList = tempSchedules
				.map((s, i) => ({ schedule: s, index: i }))
				.filter((s) => s.schedule.tripScheduleId === res.from);

			if (idxList.length > 1) {
				// split된 경우, 두 번째 스케줄에만 travelTime 부여
				tempSchedules[idxList[1].index].travelTime =
					res?.travelTime ?? 0;
			} else if (idxList.length === 1) {
				// 일반 스케줄은 그대로 적용
				tempSchedules[idxList[0].index].travelTime =
					res?.travelTime ?? 0;
			}
		});

		if (tempSchedules.length > 0) {
			tempSchedules[tempSchedules.length - 1].travelTime = 0;
		}

		const updatedBaseSchedules = baseSchedules.map((schedule) => {
			const match = tempSchedules.find(
				(temp) => temp.tripScheduleId === schedule.tripScheduleId
			);
			return {
				...schedule,
				travelTime: match?.travelTime ?? 0, // 없으면 기본값 0
			};
		});

		// 6️⃣ 시간 겹침 조정
		const daySchedules = updatedBaseSchedules.filter((s) => {
			const scheduleStartAbs = getAbsoluteMinutes(s.startTime);
			const scheduleDate = new Date(s.date);
			const dropDateObj = new Date(dropDate);
			const diffDays =
				(scheduleDate - dropDateObj) / (1000 * 60 * 60 * 24);

			if (diffDays === 0) return scheduleStartAbs >= TIMELINE_START;
			if (diffDays === 1) {
				const startHour = parseInt(s.startTime.split(":")[0], 10);
				return startHour < 6;
			}
			return false;
		});

		const adjustedStartAbs = findOverlappingSlot(
			daySchedules,
			droppedItem,
			dropStartAbs,
			dropEndAbs
		);

		if (adjustedStartAbs === null) return;

		const adjustedStartTime = minutesToAbsTime(adjustedStartAbs);
		const adjustedEndTime = minutesToAbsTime(
			adjustedStartAbs + totalStayTime
		);

		// 7️⃣ 새로운 일정 생성 및 병합
		initScheduleHandler(setSchedules); // 내부 초기화만
		const newSchedules = splitAndSetSchedule(
			droppedItem,
			dropDate,
			adjustedStartTime,
			adjustedEndTime
		);

		// 💡 tempSchedules에서 travelTime 가져와서 newSchedules에 넣어주기
		newSchedules.forEach((ns) => {
			const matched = tempSchedules.find(
				(ts) =>
					ts.placeId === ns.placeId &&
					ts.startTime === ns.startTime &&
					ts.endTime === ns.endTime &&
					ts.date === ns.date
			);
			if (matched?.travelTime !== undefined) {
				ns.travelTime = matched.travelTime;
			}
		});

		const finalSchedules = [...baseSchedules, ...newSchedules];

		// 8️⃣ 날짜별 정렬 및 position 지정
		const byDate = finalSchedules.reduce((acc, s) => {
			if (!acc[s.date]) acc[s.date] = [];
			acc[s.date].push(s);
			return acc;
		}, {});

		Object.keys(byDate).forEach((date) => {
			const sorted = byDate[date].sort(
				(a, b) =>
					timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
			);
			sorted.forEach((s, i) => {
				s.position = i;
			});
		});

		// 9️⃣ 최종 적용
		setSchedules(finalSchedules);
	};

	return { handleDrop };
}
