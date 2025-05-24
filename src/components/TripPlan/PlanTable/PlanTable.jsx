import React, { useEffect, useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";
import useScheduleDropHandler from "../../../hooks/useScheduleDropHandler";
import { formatHour } from "../../../utils/ScheduleTimeUtils";
import {
	initScheduleHandler,
	splitAndSetSchedule,
} from "../../../utils/ScheduleCreateUtils";
import TrashDropZone from "../TrashDropZone/TrashDropZone";
import { instance } from "../../../api/config/instance";

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

	useEffect(() => {
		if (!schedules || schedules.length === 0) return;

		const computeTravelTimes = async () => {
			// 1. 날짜 + 시간 기준 전체 정렬
			const sorted = [...schedules].sort((a, b) => {
				const aTime = `${a.date} ${a.startTime}`;
				const bTime = `${b.date} ${b.startTime}`;
				return aTime.localeCompare(bTime);
			});

			// 2. 인접한 쌍마다 travelTime 계산
			for (let i = 0; i < sorted.length - 1; i++) {
				const origin = sorted[i];
				const dest = sorted[i + 1];

				if (origin.place && dest.place) {
					let travelTime;
					try {
						const res = await instance.get("/trips/traveltime", {
							params: {
								originLat: origin.place.latitude || origin.place.location.latitude,
								originLng: origin.place.longitude || origin.place.location.longitude,
								destLat: dest.place.latitude || dest.place.location.latitude,
								destLng: dest.place.longitude || dest.place.location.longitude,
								mode: "driving",
							},
							headers: {
								Authorization:
									localStorage.getItem("accessToken"),
							},
						});
						travelTime = res.data;
					} catch (e) {
						console.error("🛑 이동 시간 계산 실패:", e);
						travelTime = 0;
					}
					origin.travelTime = travelTime;
				}
			}

			setSchedules(sorted); // travelTime 적용된 정렬된 리스트로 반영
		};

		computeTravelTimes();
	}, [schedules.length]);

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
						let daySchedules = schedules.filter(
							(s) =>
								format(new Date(s.date), "yyyy-MM-dd") === date
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
										onToggleLock={onToggleLock}
										onUpdate={onUpdate}
										setIsDragging={setIsDragging}
									/>
								))}
							</DropZone>
						);
					})}
				</div>
			</div>
			<div css={S.STrashDropZone}>
				{isDragging && (
					<TrashDropZone
						onDrop={(id) => {
							setSchedules((prev) =>
								prev.filter((s) => s.tripScheduleId !== id)
							);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default PlanTable;
