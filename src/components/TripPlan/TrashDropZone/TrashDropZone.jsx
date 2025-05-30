import React from "react";
import { useDrop } from "react-dnd";
import FloatingBtn from "../../FloatingBtn/FloatingBtn";
import { timeToMinutes } from "../../../utils/ScheduleTimeUtils";
import { calculateTravelTimes } from "../../../utils/ScheduleTravelUtils";
import { useTrip } from "../../Routes/TripContext";

function TrashDropZone() {
	const { schedules, setSchedules, tripInfo } = useTrip();

	const [, drop] = useDrop({
		accept: "SCHEDULE",
		drop: async (item, monitor) => {
			const offset = monitor.getClientOffset();
			if (!offset) return;

			const prevSchedules = [...schedules].sort((a, b) => {
				if (a.date < b.date) return -1;
				if (a.date > b.date) return 1;
				return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
			});

			const prevIndex = prevSchedules.findIndex(
				(s) => s.tripScheduleId === item.id
			);

			const tempSchedules = prevSchedules.filter(
				(s) => s.tripScheduleId !== item.id
			);

			const updated = await calculateTravelTimes(
				prevSchedules,     // 삭제 전
				tempSchedules,     // 삭제 후
				prevIndex,         // 삭제된 인덱스
				-1,                // currIndex 없음
				tripInfo?.transportType
			);

			setSchedules(updated); // 삭제 및 travelTime 업데이트된 schedules 반영
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return <FloatingBtn ref={drop} />;
}

export default TrashDropZone;
