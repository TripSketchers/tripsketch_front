import React from "react";
import TripDateBox from "./TripDateBox/TripDateBox";
import TripDateModal from "./TripDateModal/TripDateModal";
import { eachDayOfInterval, format, addDays } from "date-fns";
import { ko } from "date-fns/locale";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useTrip } from "../TripContext";

function TripDate({ showModal, setShowModal }) {
	const {
		dateRange,
		setDateRange,
		storedAccommodation,
		setStoredAccommodation,
	} = useTrip();

	const tripDays =
		dateRange.startDate && dateRange.endDate
			? eachDayOfInterval({
					start: dateRange.startDate,
					end: dateRange.endDate,
			  })
			: [];

	const handleSelectDateRange = ({ startDate, endDate }) => {
		const validDates = eachDayOfInterval({	// 날짜가 바꼈을 때 유효한 날짜의 숙소만 남김
			start: startDate,
			end: addDays(endDate, -1),
		}).map((day) => format(day, "yyyy-MM-dd"));

		const filteredAccommodation = Object.fromEntries(
			Object.entries(storedAccommodation).filter(([key]) =>
				validDates.includes(key)
			)
		);

		setStoredAccommodation(filteredAccommodation);
		setDateRange({ startDate, endDate });
		setShowModal(false);
		console.log("선택한 기간:", startDate, endDate);
	};

	return (
		<div>
			<div css={S.SContainer}>
				{tripDays.map((day, idx) => (
					<TripDateBox
						key={idx}
						date={format(day, "MM/dd(eee)", { locale: ko })}
						startTime="10:00"
					/>
				))}
			</div>

			{showModal && (
				<TripDateModal
					savedDateRange={dateRange}
					onClose={() => setShowModal(false)}
					onSelect={handleSelectDateRange}
				/>
			)}
		</div>
	);
}

export default TripDate;
