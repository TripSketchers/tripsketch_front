import React, { useState } from "react";
import TripDateBox from "./TripDateBox/TripDateBox";
import TripDateModal from "./TripDateModal/TripDateModal";
import { eachDayOfInterval, format } from "date-fns";
import { ko } from "date-fns/locale";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function TripDate({ showModal, setShowModal, dateRange, setDateRange }) {
	const tripDays =
		dateRange.startDate && dateRange.endDate
			? eachDayOfInterval({
					start: dateRange.startDate,
					end: dateRange.endDate,
			  })
			: [];

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
					onSelect={({ startDate, endDate }) => {
						setDateRange({ startDate, endDate });
						setShowModal(false);
						console.log("선택한 기간:", startDate, endDate);
					}}
				/>
			)}
		</div>
	);
}

export default TripDate;
