import React from "react";
import TripDateBox from "./TripDateBox/TripDateBox";
import TripDateModal from "./TripDateModal/TripDateModal";
import { eachDayOfInterval, format, addDays } from "date-fns";
import { ko } from "date-fns/locale";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useTrip } from "../../Routes/TripContext";

function TripDate({ showModal, setShowModal }) {
	const {
		dateRange,
		setDateRange,
		storedAccommodations,
		setStoredAccommodations,
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
			Object.entries(storedAccommodations).filter(([key]) =>
				validDates.includes(key)
			)
		);

		setStoredAccommodations(filteredAccommodation);
		setDateRange({ startDate, endDate });
		setShowModal(false);
	};

	return (
		<div>
			<div css={S.SContainer}>
				{tripDays.map((day, idx) => (
					<TripDateBox
						key={idx}
						index={idx}
						date={format(day, "MM/dd(eee)", { locale: ko })}
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
