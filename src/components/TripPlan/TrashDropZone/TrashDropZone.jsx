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

			// 🔹 삭제 전 스케줄들 정렬
			const prevSchedules = [...schedules].sort((a, b) => {
				if (a.date < b.date) return -1;
				if (a.date > b.date) return 1;
				return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
			});

			// 🔹 삭제 대상 인덱스
			const prevIndex = prevSchedules.findIndex(
				(s) => s.tripScheduleId === item.id
			);

			// 🔹 삭제 후 임시 스케줄
			const tempSchedules = prevSchedules.filter(
				(s) => s.tripScheduleId !== item.id
			);

			// 🔹 travelTime 다시 계산
			const travelResults = await calculateTravelTimes(
				prevSchedules,
				tempSchedules,
				prevIndex,
				-1,
				tripInfo?.transportType
			);

			// 🔹 tempSchedules에 travelTime 반영
			const updatedSchedules = tempSchedules.map((s) => {
				const travel = travelResults.find(
					(res) => res.from === s.tripScheduleId
				);
				return {
					...s,
					travelTime: travel?.travelTime ?? 0,
				};
			});

			// 🔹 마지막 schedule의 travelTime = 0
			if (updatedSchedules.length > 0) {
				updatedSchedules[updatedSchedules.length - 1].travelTime = 0;
			}

			// 🔹 반영
			setSchedules(updatedSchedules);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return <FloatingBtn ref={drop} />;
}

export default TrashDropZone;
