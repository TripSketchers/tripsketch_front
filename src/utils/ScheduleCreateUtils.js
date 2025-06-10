import {
	adjustMinutes,
	adjustTimeAndDate,
	getAbsoluteMinutes,
	minutesToAbsTime,
	minutesToTime,
	timeToMinutes,
} from "./ScheduleTimeUtils";

const TIMELINE_START = 360; // 06:00
const TIMELINE_END = 1800; // 30:00 (익일 06:00)

// 🟢 외부에서 주입 필요 (예: React Context에서 관리하는 경우)
let setSchedules;

export const initScheduleHandler = (setter) => {
	setSchedules = setter;
};

// 🟢 새 일정 생성 및 추가 (분할/단일 모두 사용)
export const createSchedule = (
	place,
	date,
	startTime,
	stayTime,
	endTime,
	viewStartTime,
	viewEndTime,
	travelTime,
	isSplit = false,
	tripScheduleId,
	isAccommodation = 0,
	splitId = tripScheduleId ||
		place.tripScheduleId ||
		Date.now() + Math.random()
) => {
	const generateSchedule = (date, startTime, endTime) => ({
		tripScheduleId:
			tripScheduleId ||
			place.tripScheduleId ||
			Date.now() + Math.random(),
		placeId: place.id || place.placeId,
		date,
		startTime,
		stayTime,
		endTime,
		isLocked: 0,
		isSplit,
		viewStartTime: viewStartTime || startTime,
		viewEndTime: viewEndTime || endTime,
		travelTime: travelTime,
		place: { ...place },
		isAccommodation: isAccommodation,
		splitId: splitId,
	});

	const calEndTime =
		endTime || minutesToTime(timeToMinutes(startTime) + stayTime);

	return [generateSchedule(date, startTime, calEndTime)];
};

// 🟢 기존 일정 분할 및 반영 (분할/단일 모두)
export const splitAndSetSchedule = (
	schedule,
	dropDate,
	dropStartTime,
	dropEndTime
) => {
	const result = [];

	let startMin = timeToMinutes(dropStartTime);
	let endMin = timeToMinutes(dropEndTime);

	if (
		schedule.isSplit === true &&
		schedule.startTime === schedule.viewStartTime
	) {
		[startMin, endMin] = adjustMinutes(startMin, endMin);
	}
	if (endMin <= startMin) {
		endMin += 1440; // 익일 처리
	}

	const placeObj = schedule.place || schedule;
	const viewStart = dropStartTime;
	const viewEnd = dropEndTime;
	const tripScheduleId = schedule.tripScheduleId;

	// 📌 1. 전날로 넘어가는 경우
	if (startMin < TIMELINE_START && endMin > TIMELINE_START) {
		const prevDate = new Date(dropDate);
		prevDate.setDate(prevDate.getDate() - 1);
		const prevDateStr = prevDate.toISOString().slice(0, 10);

		const firstStayTime = TIMELINE_START - startMin;
		const secondStayTime = endMin - TIMELINE_START;

		result.push(
			...createSchedule(
				placeObj,
				prevDateStr,
				dropStartTime,
				firstStayTime,
				"30:00",
				viewStart,
				viewEnd,
				0,
				true,
				tripScheduleId,
				schedule.isAccommodation,
				`${tripScheduleId}_1`
			)
		);

		result.push(
			...createSchedule(
				placeObj,
				dropDate,
				"06:00",
				secondStayTime,
				dropEndTime,
				viewStart,
				viewEnd,
				schedule.travelTime,
				true,
				tripScheduleId,
				schedule.isAccommodation,
				`${tripScheduleId}_2`
			)
		);

		return result;
	}

	// 📌 2. 다음날로 넘어가는 경우
	if (startMin < TIMELINE_END && endMin > TIMELINE_END) {
		const firstStayTime = TIMELINE_END - startMin;
		const secondStayTime = endMin - TIMELINE_END;

		result.push(
			...createSchedule(
				placeObj,
				dropDate,
				dropStartTime,
				firstStayTime,
				"30:00",
				viewStart,
				viewEnd,
				0,
				true,
				tripScheduleId,
				schedule.isAccommodation,
				`${tripScheduleId}_1`
			)
		);

		const nextDate = new Date(dropDate);
		nextDate.setDate(nextDate.getDate() + 1);
		const nextDateStr = nextDate.toISOString().slice(0, 10);

		result.push(
			...createSchedule(
				placeObj,
				nextDateStr,
				"06:00",
				secondStayTime,
				undefined,
				viewStart,
				viewEnd,
				schedule.travelTime,
				true,
				tripScheduleId,
				schedule.isAccommodation,
				`${tripScheduleId}_2`
			)
		);

		return result;
	}

	// 📌 3. 분할 필요 없음
	const totalStayTime = endMin - startMin;

	result.push(
		...createSchedule(
			placeObj,
			dropDate,
			minutesToAbsTime(startMin),
			totalStayTime,
			minutesToAbsTime(endMin),
			undefined,
			undefined,
			schedule.travelTime,
			false,
			tripScheduleId,
			schedule.isAccommodation,
			null
		)
	);

	return result;
};

export const mergeSplitSchedules = (schedules, tripId) => {
	const mergedMap = new Map();

	for (const schedule of schedules) {
		const id = schedule.tripScheduleId;

		if (!mergedMap.has(id)) {
			mergedMap.set(id, { ...schedule });
		} else {
			const existing = mergedMap.get(id);

			const merged = {
				...existing,
				startTime: schedule.viewStartTime,
				endTime: schedule.viewEndTime,
				stayTime:
					getAbsoluteMinutes(schedule.viewEndTime) -
					getAbsoluteMinutes(schedule.viewStartTime),
				travelTime: schedule.travelTime,
			};

			mergedMap.set(id, merged);
		}
	}

	return Array.from(mergedMap.values()).map((s) => {
		const { isSplit, viewStartTime, viewEndTime, ...rest } = s;

		// ✅ start, end 모두 날짜 조정
		const adjustedStart = adjustTimeAndDate(rest.date, rest.startTime);
		const adjustedEnd = adjustTimeAndDate(rest.date, rest.endTime);

		// ✅ date는 startTime 기준으로 유지
		return {
			...rest,
			tripId: tripId,
			date: adjustedStart.date,
			startTime: adjustedStart.time,
			endTime: adjustedEnd.time,
			tripScheduleId: 0,
		};
	});
};
