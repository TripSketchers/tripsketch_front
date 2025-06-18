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
			const updatedSchedules = [...tempSchedules];

			travelResults.forEach((res) => {
				const idxList = updatedSchedules
					.map((s, i) => ({ schedule: s, index: i }))
					.filter((s) => s.schedule.tripScheduleId === res.from);

				if (idxList.length > 1) {
					// split된 경우, 두 번째 스케줄에만 travelTime 부여
					updatedSchedules[idxList[1].index].travelTime =
						res?.travelTime ?? 0;
				} else if (idxList.length === 1) {
					// 일반 스케줄은 그대로 적용
					updatedSchedules[idxList[0].index].travelTime =
						res?.travelTime ?? 0;
				}
			});

			// 마지막 블록 travelTime = 0
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
