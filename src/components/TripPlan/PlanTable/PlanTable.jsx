import React, { useEffect, useRef, useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";
import useScheduleDropHandler from "../../../hooks/useScheduleDropHandler";
import {
	formatHour,
	getCardPositionAndHeight,
	minutesToTime,
	timeToMinutes,
} from "../../../utils/ScheduleTimeUtils";
import {
	initScheduleHandler,
	splitAndSetSchedule,
} from "../../../utils/ScheduleCreateUtils";
import TrashDropZone from "../TrashDropZone/TrashDropZone";
import { FaBus, FaCar } from "react-icons/fa6";

function PlanTable() {
	const { tripInfo, schedules, setSchedules, storedAccommodations } =
		useTrip();
	const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);
	const [isDragging, setIsDragging] = useState(false);

	const startDate = tripInfo?.startDate || tripInfo?.trip?.startDate;
	const endDate = tripInfo?.endDate || tripInfo?.trip?.endDate;

	const tripDates =
		startDate && endDate
			? eachDayOfInterval({
					start: new Date(startDate),
					end: new Date(endDate),
			  }).map((d) => format(d, "yyyy-MM-dd"))
			: [];

	const hours = [
		...Array.from({ length: 19 }, (_, i) => i + 6),
		...Array.from({ length: 5 }, (_, i) => i + 1),
	];

	// ✅ 일정 잠금/해제 토글 핸들러
	const onToggleLock = (id) => {
		setSchedules((prev) => {
			const updated = prev.map((sch) => {
				if (sch.tripScheduleId === id) {
					return { ...sch, isLocked: sch.isLocked ? 0 : 1 };
				}
				return sch;
			});
			return updated;
		});
	};

	// ✅ 일정 업데이트 핸들러
	const onUpdate = (id, updates) => {
		setSchedules((prev) =>
			prev.map((item) =>
				item.tripScheduleId === id ? { ...item, ...updates } : item
			)
		);
	};

	useEffect(() => {
		if (!storedAccommodations || !tripDates.length) return;

		tripDates.forEach((date) => {
			const accommodation = storedAccommodations[date];
			// tripScheduleId가 accommodation_${date}인 일정이 이미 있으면 추가하지 않음
			const hasAccommodationSchedule = schedules.some(
				(s) => s.tripScheduleId === `accommodation_${date}`
			);

			if (accommodation && !hasAccommodationSchedule) {
				initScheduleHandler(setSchedules);
				splitAndSetSchedule(
					{
						tripScheduleId: `accommodation_${date}`,
						tripId: tripInfo?.tripId ?? null,
						date: date,
						startTime: "23:00",
						endTime: "32:00",
						stayTime: 540,
						travelTime: null,
						position: null,
						isLocked: 0,
						place: accommodation,
						isAccommodation: true,
						viewStartTime: "23:00",
						viewEndTime: "32:00",
					},
					date,
					"23:00",
					"32:00"
				);
			}
		});
	}, [storedAccommodations]);

	// ✅ 일정과 이동 블록을 합쳐 렌더링하는 유틸 함수
	const renderDaySchedules = (daySchedules) => {
		const result = [];

		for (let i = 0; i < daySchedules.length; i++) {
			const current = daySchedules[i];
			result.push({ ...current, type: "schedule" });

			// 🔧 next 없이도 travelTime이 존재하면 travel block 추가
			if (current.travelTime && current.travelTime > 0) {
				const startMin = timeToMinutes(current.endTime);
				const endMin = startMin + current.travelTime;

				result.push({
					id: `travel_${current.tripScheduleId}_${i}`,
					startTime: current.endTime,
					endTime: minutesToTime(endMin),
					travelTime: current.travelTime,
					type: "travel",
				});
			}
		}

		return result;
	};

	return (
		<div css={S.SWrapper}>
			<div css={S.SLayout}>
				<div css={S.SContainer}>
					<div css={S.STimeColumn}>
						<div css={S.SStickyHeaderSpacer} />
						{hours.map((h) => (
							<div key={h} css={S.STimeRow}>
								{formatHour(h)}
							</div>
						))}
					</div>
					{tripDates.map((date, index) => {
						let daySchedules = schedules.filter((s) => {
							try {
								const dateObj = new Date(s.date);
								return (
									s.date &&
									!isNaN(dateObj.getTime()) &&
									format(dateObj, "yyyy-MM-dd") === date
								);
							} catch (e) {
								console.error("⛔ Invalid date:", s.date, s);
								return false;
							}
						});

						return (
							<DropZone
								key={date}
								date={date}
								index={index}
								onDrop={handleDrop}
							>
								{renderDaySchedules(daySchedules).map(
									(item, i) => {
										if (item.type === "schedule") {
											return (
												<ScheduleCard
													key={`${item.tripScheduleId}_${item.startTime}_${i}`}
													schedule={item}
													onToggleLock={onToggleLock}
													onUpdate={onUpdate}
													setIsDragging={
														setIsDragging
													}
												/>
											);
										}
										if (item.type === "travel") {
											const {
												top: topPx,
												height: heightPx,
											} = getCardPositionAndHeight(
												item.startTime,
												item.endTime
											);
											return (
												<div
													key={item.id}
													css={S.STravelTimeBlock(
														topPx,
														heightPx
													)}
													onClick={() => {
														console.log(item);
													}}
												>
													<div
														css={S.STravelTimeText}
													>
														{tripInfo.transportType ===
														0 ? (
															<FaBus />
														) : (
															<FaCar />
														)}
														{item.travelTime / 60 >=
															1 &&
															`${Math.floor(
																item.travelTime /
																	60
															)}시간 `}
														{item.travelTime % 60}분
														이동
													</div>
												</div>
											);
										}
										return null;
									}
								)}
							</DropZone>
						);
					})}
				</div>
			</div>
			<div css={S.STrashDropZone}>{isDragging && <TrashDropZone />}</div>
		</div>
	);
}

export default PlanTable;
