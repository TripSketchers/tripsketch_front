import React from "react";
import { subDays, format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";

const MORNING_BOUNDARY = 360; // 새벽 6시 경계 (분 단위)

function minutesToTime(totalMinutes) {
	const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
	const minutes = String(totalMinutes % 60).padStart(2, "0");
	return `${hours}:${minutes}:00`;
}

// 📅 PlanTable 컴포넌트
function PlanTable() {
	const { tripInfo, schedules, setSchedules } = useTrip();

	// 여행 시작일과 종료일 설정
	const startDate = tripInfo?.startDate || tripInfo?.trip?.startDate;
	const endDate = tripInfo?.endDate || tripInfo?.trip?.endDate;

	// 여행 날짜 배열 생성 (yyyy.MM.dd 형식)
	const tripDates =
		startDate && endDate
			? eachDayOfInterval({
					start: new Date(startDate),
					end: new Date(endDate),
			  }).map((d) => format(d, "yyyy.MM.dd"))
			: [];

	// 시간 라벨 (6시~24시 + 1시~5시)
	const hours = [
		...Array.from({ length: 19 }, (_, i) => i + 6),
		...Array.from({ length: 5 }, (_, i) => i + 1),
	];
	const formatHour = (h) =>
		`${(h <= 24 ? h : h % 24).toString().padStart(2, "0")}:00`;

	// 📦 일정 분할 로직 (새벽 6시 기준 분할 처리)
	const splitSchedule = (
		scheduleGenerator,
		dropDate,
		dropStartTime,
		stayTime
	) => {
		const [h, m] = dropStartTime.split(":").map(Number);
		const dropStartMinutes = h * 60 + m;
		const dropEndMinutes = dropStartMinutes + stayTime;
		const prevDate = format(subDays(new Date(dropDate), 1), "yyyy.MM.dd");

		if (
			dropStartMinutes < MORNING_BOUNDARY &&
			dropEndMinutes > MORNING_BOUNDARY
		) {
			// 새벽 6시 이전 시작, 이후 끝나는 경우 분할
			return [
				scheduleGenerator(prevDate, dropStartTime, "06:00:00"),
				scheduleGenerator(
					dropDate,
					"06:00:00",
					calculateEndTime(
						"06:00:00",
						dropEndMinutes - MORNING_BOUNDARY
					)
				),
			];
		} else {
			// 단일 날짜에 일정 배치
			const targetDate =
				dropEndMinutes <= MORNING_BOUNDARY ? prevDate : dropDate;
			const newEnd = calculateEndTime(dropStartTime, stayTime);
			return [scheduleGenerator(targetDate, dropStartTime, newEnd)];
		}
	};

	const handleDrop = (droppedItem, dropDate, dropStartTime) => {
		const daySchedules = schedules.filter(
			(s) => format(new Date(s.date), "yyyy.MM.dd") === dropDate
		);

		const dropStartMinutes = parseTime(dropStartTime);
		const dropEndMinutes = dropStartMinutes + (droppedItem.stayTime || 120);

		const overlappingSchedule = daySchedules.find((s) => {
			if (s.tripScheduleId === droppedItem.tripScheduleId) return false;
			const sStart = parseTime(s.startTime);
			const sEnd = parseTime(s.endTime);
			return dropStartMinutes < sEnd && dropEndMinutes > sStart;
		});

		let adjustedStartTime = dropStartTime;

		if (overlappingSchedule) {
			const sStart = parseTime(overlappingSchedule.startTime);
			const sEnd = parseTime(overlappingSchedule.endTime);
			const overlapMid = (sStart + sEnd) / 2;
			const dropDuration = droppedItem.stayTime || 120;

			if (dropStartMinutes < overlapMid) {
				// 🎯 드롭한 스케줄을 위에 배치
				adjustedStartTime = minutesToTime(sStart - dropDuration);

				// ✅ PlanTable에서 직접 상태 업데이트로 겹치는 스케줄 조정
				setSchedules((prev) =>
					prev.map((item) =>
						item.tripScheduleId ===
						overlappingSchedule.tripScheduleId
							? {
									...item,
									startTime: minutesToTime(sStart),
									endTime: minutesToTime(sEnd),
							  }
							: item
					)
				);
			} else {
				// 🎯 드롭한 스케줄을 아래에 배치 (기존 로직 유지)
				adjustedStartTime = overlappingSchedule.endTime;
			}

			console.log("🔀 Adjusted Start Time:", adjustedStartTime);
		}

		// 🆕 새로운 일정 추가
		if (!droppedItem.tripScheduleId) {
			const stayTime = droppedItem.stayTime || 120;
			createAndAddSchedule(
				droppedItem,
				dropDate,
				adjustedStartTime,
				stayTime
			);
			return;
		}

		// ✂️ 기존 일정 이동
		splitAndSetSchedule(
			droppedItem,
			dropDate,
			adjustedStartTime,
			droppedItem.stayTime
		);
	};

	// 📅 새 일정 생성 후 추가
	const createAndAddSchedule = (place, dropDate, dropStartTime, stayTime) => {
		const generateSchedule = (date, startTime, endTime) => ({
			tripScheduleId: place.tripScheduleId || Date.now() + Math.random(),
			placeId: place.id || place.placeId,
			date,
			startTime,
			stayTime,
			endTime,
			isLocked: 0,
			isSplit: false,
			viewStartTime: startTime,
			viewEndTime: endTime,
			place: { ...place },
		});

		const splitSchedules = splitSchedule(
			generateSchedule,
			dropDate,
			dropStartTime,
			stayTime
		);
		setSchedules((prev) => [...prev, ...splitSchedules]);
	};

	// ✂️ 기존 일정 분할 후 저장
	const splitAndSetSchedule = (
		schedule,
		dropDate,
		dropStartTime,
		duration
	) => {
		const generateSchedule = (date, startTime, endTime) => ({
			...schedule,
			date,
			startTime,
			stayTime: duration,
			endTime,
			viewStartTime: startTime,
			viewEndTime: endTime,
		});

		const splitSchedules = splitSchedule(
			generateSchedule,
			dropDate,
			dropStartTime,
			duration
		);

		setSchedules((prev) => [
			...prev.filter((s) => s.tripScheduleId !== schedule.tripScheduleId),
			...splitSchedules,
		]);
	};

	// ⏰ 종료 시간 계산 (시작 시간 + 머무는 시간)
	const calculateEndTime = (startTime, stayTime) => {
		const [h, m] = startTime.split(":").map(Number);
		const startDate = new Date(2025, 0, 1, h, m);
		const endDate = new Date(startDate.getTime() + stayTime * 60000);
		return `${String(endDate.getHours()).padStart(2, "0")}:${String(
			endDate.getMinutes()
		).padStart(2, "0")}:00`;
	};

	// ⌛ HH:MM 형식 시간 문자열 → 분 단위 변환
	const parseTime = (timeStr) => {
		const [h, m] = timeStr.split(":").map(Number);
		return h * 60 + m;
	};

	return (
		<div css={S.SWrapper}>
			<div css={S.SLayout}>
				<div css={S.SContainer}>
					{/* 📌 시간 라벨 영역 */}
					<div css={S.STimeColumn}>
						<div css={S.SStickyHeaderSpacer} />
						{hours.map((h) => (
							<div key={h} css={S.STimeRow}>
								{formatHour(h)}
							</div>
						))}
					</div>

					{/* 📅 날짜별 일정 표시 */}
					{tripDates.map((date, index) => {
						const daySchedules = schedules.filter(
							(s) =>
								format(new Date(s.date), "yyyy.MM.dd") === date
						);

						return (
							<DropZone
								key={date}
								date={date}
								index={index}
								onDrop={handleDrop}
							>
								{daySchedules.map((s, i) => (
									<ScheduleCard
										key={`${s.tripScheduleId}_${s.startTime}_${i}`}
										schedule={s}
										// 🔒 잠금 상태 토글
										onToggleLock={(id) => {
											setSchedules((prev) =>
												prev.map((sch) =>
													sch.tripScheduleId === id
														? {
																...sch,
																isLocked:
																	sch.isLocked
																		? 0
																		: 1,
														  }
														: sch
												)
											);
										}}
										// 📋 일정 정보 업데이트
										onUpdate={(id, updates) => {
											setSchedules((prev) =>
												prev.map((item) =>
													item.tripScheduleId === id
														? {
																...item,
																...updates,
														  }
														: item
												)
											);
										}}
									/>
								))}
							</DropZone>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default PlanTable;
