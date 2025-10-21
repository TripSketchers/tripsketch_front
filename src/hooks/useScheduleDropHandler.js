import { drop } from "lodash";
import {
	initScheduleHandler,
	splitAndSetSchedule,
} from "../utils/ScheduleCreateUtils";
import { findOverlappingSlot } from "../utils/ScheduleOverlapUtils";
import {
	calculateTotalStayTime,
	getAbsoluteMinutes,
	minutesToTime,
	timeToMinutes,
} from "../utils/ScheduleTimeUtils";
import {
	calculateTravelTimes,
	calculateAllTravelTimes,
} from "../utils/ScheduleTravelUtils";

const TIMELINE_START = 360; // 06:00
const TIME_END = 1440; // 24:00
const TIMELINE_END = 1800; // 30:00 (익일 06:00)

export default function useScheduleDropHandler(schedules, setSchedules) {
	// tripScheduleId에서 기준 날짜 추출 (예: accommodation_2025-11-09 → 2025-11-09)
	const getBaseDateFromId = (tripScheduleId = "") => {
		const parts = String(tripScheduleId).split("_");
		return parts.length >= 2 ? parts[1] : null;
	};

	const handleDrop = async (
		droppedItem,
		dropDate,
		startTime,
		endTime,
		tripInfo
	) => {
		const isSplit = droppedItem.isSplit === true;
		// ✅ 분할 스케줄이면 그룹의 '원본 기준 날짜'를 사용
		const baseDateForSplit =
			isSplit ? (getBaseDateFromId(droppedItem.tripScheduleId) || dropDate) : dropDate;
		const effectiveDropDate = baseDateForSplit;

		const totalStayTime = calculateTotalStayTime(
			droppedItem,
			startTime,
			endTime
		);
		const dropStartAbs = timeToMinutes(startTime);
		const dropEndAbs = timeToMinutes(endTime);

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
					(s) => s.tripScheduleId === droppedItem.tripScheduleId
			  )
			: [droppedItem];

		const baseSchedules = schedules.filter(
			(s) =>
				!schedulesToRemove.some(
					(r) => s.tripScheduleId === r.tripScheduleId
				)
		);

		// 2️⃣ 가상 위치 스케줄 구성
		const simulatedItem = {
			...droppedItem,
			tripScheduleId:
				droppedItem.tripScheduleId ?? Date.now() + Math.random(),
			startTime: minutesToTime(dropStartAbs),
			endTime: minutesToTime(dropStartAbs + totalStayTime),
			date: effectiveDropDate, // ✅ 기준 날짜 고정
            place: droppedItem.place
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

		travelResults
            .filter((res) => res && typeof res === "object" && "from" in res)
            .forEach((res) => {
                const idxList = tempSchedules
                    .map((s, i) => ({ schedule: s, index: i }))
                    .filter((s) => s.schedule.tripScheduleId === res?.from);

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

		// ✅ 날짜별 마지막 스케줄 travelTime = 0 설정
		if (tempSchedules.length > 0) {
			tempSchedules[tempSchedules.length - 1].travelTime = 0;
		}

		// 6️⃣ 시간 겹침 조정: effectiveDropDate 기준으로 당일/익일 선택
		const daySchedules = tempSchedules.filter((s) => {
			const scheduleStartAbs = getAbsoluteMinutes(s.startTime);
			const scheduleDate = new Date(s.date);
			const dropDateObj = new Date(effectiveDropDate);
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

		if (adjustedStartAbs === null) {
			// ✅ 조정될 자리가 없는 경우 전체 이동 시간 재계산
			const restored = await calculateAllTravelTimes(
				prevSchedules,
				tripInfo?.transportType
			);
			setSchedules(restored);
			return;
		}

		const adjustedStartTime = minutesToTime(adjustedStartAbs);
		const adjustedEndTime = minutesToTime(adjustedStartAbs + totalStayTime);

		// 7️⃣ 새로운 일정 생성 및 병합
		initScheduleHandler(setSchedules); // 내부 초기화만
		const newSchedules = splitAndSetSchedule(
			droppedItem,
			effectiveDropDate, // ✅ 여기서도 기준 날짜 고정
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
