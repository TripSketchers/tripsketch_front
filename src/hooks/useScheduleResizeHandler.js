import { useState } from "react";
import { timeToMinutes, minutesToTime } from "../utils/ScheduleTimeUtils";

const TIMELINE_START = 360;
const TIMELINE_END = 1800;
const PIXELS_PER_MINUTE = 1;

const getAdjacentLimit = (dir, { position, date, schedules, travelTime }) => {
	if (dir === "top") {
		const prev = schedules.find(
			(s) => s.position === position - 1 && s.date === date
		);
		return prev
			? timeToMinutes(prev.endTime) + (prev.travelTime ?? 0)
			: TIMELINE_START;
	} else {
		const next = schedules.find(
			(s) => s.position === position + 1 && s.date === date
		);
		return next
			? timeToMinutes(next.startTime) - (travelTime ?? 0)
			: TIMELINE_END;
	}
};

const findSplitBlocks = ({
	schedules,
	tripScheduleId,
	startTime,
	endTime,
	date,
}) => {
	const related = schedules.filter(
		(s) => s.tripScheduleId === tripScheduleId
	);
	const current = related.find(
		(s) =>
			s.startTime === startTime &&
			s.endTime === endTime &&
			s.date === date
	);
	const other = related.find((s) => s !== current);
	const isSplit = related.length > 1;
	const isBlockB = current?.splitId?.endsWith("_2");
	return { isSplit, current, other, isBlockB };
};

const applyResizeForSplitBlock = ({
	isBlockB,
	current,
	other,
	newStart,
	newEnd,
	onUpdate,
}) => {
	if (!current) return;

	if (isBlockB) {
		onUpdate(current.splitId, {
			endTime: minutesToTime(newEnd),
			viewEndTime: minutesToTime(newEnd),
			stayTime: newEnd - timeToMinutes(current.startTime),
		});
		if (other) {
			onUpdate(other.splitId, {
				viewEndTime: minutesToTime(newEnd),
			});
		}
	} else {
		onUpdate(current.splitId, {
			startTime: minutesToTime(newStart),
			viewStartTime: minutesToTime(newStart),
			stayTime: timeToMinutes(current.endTime) - newStart,
		});
		if (other) {
			onUpdate(other.splitId, {
				viewStartTime: minutesToTime(newStart),
			});
		}
	}
};

export const useScheduleResizeHandler = ({
	schedules,
	setIsResizing,
	onUpdate,
}) => {
	const handleMouseDown =
		({ direction, schedule }) =>
		(e) => {
			e.stopPropagation();
			e.preventDefault();
			setIsResizing(true);

			const {
				startTime,
				endTime,
				position,
				date,
				tripScheduleId,
				travelTime,
			} = schedule;

			const startY = e.clientY;
			const initialStart = timeToMinutes(startTime);
			const initialEnd = timeToMinutes(endTime);

			const onMouseMove = (moveEvent) => {
				const deltaY = moveEvent.clientY - startY;
				const deltaMinutes = Math.round(deltaY / PIXELS_PER_MINUTE);

				let newStart = initialStart;
				let newEnd = initialEnd;

				if (direction === "top") {
					newStart = Math.min(
						initialEnd - 1,
						Math.max(0, initialStart + deltaMinutes)
					);
					newStart = Math.max(
						newStart,
						getAdjacentLimit("top", {
							position,
							date,
							schedules,
							travelTime,
						})
					);
				} else {
					newEnd = Math.max(
						initialStart + 1,
						initialEnd + deltaMinutes
					);
					newEnd = Math.min(
						newEnd,
						getAdjacentLimit("bottom", {
							position,
							date,
							schedules,
							travelTime,
						})
					);
				}

				const newStay = newEnd - newStart;

				const { isSplit, current, other, isBlockB } = findSplitBlocks({
					schedules,
					tripScheduleId,
					startTime,
					endTime,
					date,
				});

				if (isSplit) {
					applyResizeForSplitBlock({
						isBlockB,
						current,
						other,
						newStart,
						newEnd,
						onUpdate,
					});
				} else {
					onUpdate(tripScheduleId, {
						startTime: minutesToTime(newStart),
						endTime: minutesToTime(newEnd),
						viewStartTime: minutesToTime(newStart),
						viewEndTime: minutesToTime(newEnd),
						stayTime: newStay,
					});
				}
			};

			const onMouseUp = () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
				setIsResizing(false);
			};

			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
		};

	return { handleMouseDown };
};
