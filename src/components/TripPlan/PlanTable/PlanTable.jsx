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
import { mergeSplitSchedules } from "../../../utils/ScheduleCreateUtils";
import TrashDropZone from "../TrashDropZone/TrashDropZone";
import GradientBtn from "../../GradientBtn/GradientBtn";
import { instance } from "../../../api/config/instance";
import { isEqual } from "lodash";
import TravelTimeBlock from "../TravelTimeBlock/TravelTimeBlock";
import useAutoScroll from "../../../hooks/useAutoScroll";

function PlanTable({ initialSchedules }) {
	const { tripInfo, schedules, setSchedules } = useTrip();
	const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);
	const [isDragging, setIsDragging] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);
	const containerRef = useRef(null);
	useAutoScroll(isDragging, containerRef, {
		scrollThreshold: 100,
		scrollSpeed: 5,
	});

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

	const onToggleLock = (id) => {
		setSchedules((prev) =>
			prev.map((sch) =>
				sch.tripScheduleId === id
					? { ...sch, isLocked: sch.isLocked ? 0 : 1 }
					: sch
			)
		);
	};

	const onUpdate = (id, updates) => {
		setSchedules((prev) =>
			prev.map((item) => {
				const itemId = item.splitId ?? item.tripScheduleId;
				return itemId === id ? { ...item, ...updates } : item;
			})
		);
	};

	const renderDaySchedules = (daySchedules) => {
		const result = [];

		for (let i = 0; i < daySchedules.length; i++) {
			const current = daySchedules[i];
			result.push({ ...current, type: "schedule" });

			if (current.travelTime && current.travelTime > 0) {
				const startMin = timeToMinutes(current.endTime);
				const endMin = startMin + current.travelTime;

				const origin = {
					lat: current.place?.latitude ?? current.latitude,
					lng: current.place?.longitude ?? current.longitude,
				};
				const next = daySchedules[i + 1];
				const destination = next
					? {
							lat: next.place?.latitude ?? next.latitude,
							lng: next.place?.longitude ?? next.longitude,
					  }
					: null;

				result.push({
					id: `travel_${current.tripScheduleId}_${i}`,
					startTime: current.endTime,
					endTime: minutesToTime(endMin),
					travelTime: current.travelTime,
					type: "travel",
					origin,
					destination,
				});
			}
		}

		return result;
	};

	const handleSaveSchedules = async () => {
		try {
			const mergedSchedules = mergeSplitSchedules(
				schedules,
				tripInfo.tripId
			);
			await instance.post(
				`/trips/${tripInfo.tripId}/schedules`,
				mergedSchedules,
				{
					headers: {
						Authorization: localStorage.getItem("accessToken"),
					},
				}
			);
			alert("저장되었습니다!");
			initialSchedules = schedules;
			setHasChanges(false);
		} catch (err) {
			console.error("🛑 저장 실패", err);
			alert("저장에 실패했습니다.");
		}
	};

	useEffect(() => {
		setHasChanges(!isEqual(initialSchedules, schedules));
	}, [schedules, initialSchedules]);

	return (
		<div css={S.SWrapper} ref={containerRef}>
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
						const daySchedules = schedules.filter((s) => {
							try {
								return s.date === date;
							} catch {
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
												<TravelTimeBlock
													topPx={topPx}
													heightPx={heightPx}
													key={item.id}
													item={item}
													transportType={
														tripInfo.transportType
													}
												/>
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
			<div css={S.STrashDropZone}>
				{isDragging ? (
					<TrashDropZone />
				) : hasChanges ? (
					<GradientBtn
						onClick={handleSaveSchedules}
						text={"바뀐 계획 저장하기"}
					/>
				) : null}
			</div>
		</div>
	);
}

export default PlanTable;
