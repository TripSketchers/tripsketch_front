import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCheck } from "react-icons/fa6";
import StoredPlaceBox from "./StoredPlaceBox/StoredPlaceBox";
import EmptyPlaceBox from "./EmptyPlaceBox/EmptyPlaceBox";
import { addDays, eachDayOfInterval, format } from "date-fns";
import { useTrip } from "../TripCreate/TripContext";

function StoredPlacePanel({ text }) {
	const {
		dateRange,
		storedPlaces,
		setStoredPlaces,
		storedAccommodation,
		setStoredAccommodation,
	} = useTrip();

	const stayDays =
		text === "숙소" && dateRange.startDate && dateRange.endDate
			? eachDayOfInterval({
					start: dateRange.startDate,
					end: addDays(dateRange.endDate, -1),
			  })
			: [];

	return (
		<div css={S.SLayout}>
			<div css={S.SContainer}>
				<h1>장소 보관함</h1>
				<div css={S.SHeader}>
					<div css={S.SStoredNum}>
						<FaCheck />
						<span>
							{text === "숙소"
								? `${
										Object.keys(storedAccommodation).length
								  } / ${stayDays.length}`
								: storedPlaces.length}
						</span>
					</div>

					<button
						onClick={() => {
							if (text === "숙소") {
								setStoredAccommodation({});
							} else {
								setStoredPlaces([]);
							}
						}}
					>
						초기화
					</button>
				</div>

				<div css={S.SContentBox}>
					{text === "숙소"
						? stayDays.map((day, i) => {
								const dateStr = format(day, "yyyy-MM-dd");
								const nextDay = addDays(day, 1);
								const label = `${i + 1}일차 ${format(
									day,
									"MM.dd"
								)} ~ ${format(nextDay, "MM.dd")}`;
								const place = storedAccommodation[dateStr];

								return (
									<div key={dateStr}>
										<div css={S.SDate}>{label}</div>
										{place ? (
											<StoredPlaceBox
												index={i + 1}
												type="accommodation"
												place={place}
												onRemove={() => {
													const copy = {
														...storedAccommodation,
													};
													delete copy[dateStr];
													setStoredAccommodation(copy);
												}}
											/>
										) : (
											<EmptyPlaceBox />
										)}
									</div>
								);
						  })
						: storedPlaces.map((place, idx) => (
								<StoredPlaceBox
									index={idx + 1}
									key={place.id}
									type="place"
									place={place}
									onRemove={(id) => {
										setStoredPlaces((prev) =>
											prev.filter((p) => p.id !== id) // ✅ place_id → id
										);
									}}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
}

export default StoredPlacePanel;
