import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCheck } from "react-icons/fa6";
import StoredPlaceBox from "./StoredPlaceBox/StoredPlaceBox";
import { addDays, eachDayOfInterval, format } from "date-fns";
import EmptyPlaceBox from "./EmptyPlaceBox/EmptyPlaceBox";

function StoredPlacePanel({ type, dateRange, storedPlaces, setStoredPlaces }) {
	const stayDays =
		type === "accommodation"
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
						<FaCheck /> <span>{storedPlaces.length}</span>
					</div>
					<button>초기화</button>
				</div>
				<div css={S.SContentBox}>
					{type === "accommodation"
						? stayDays.map((day, i) => {
								const nextDay = addDays(day, 1);
								const label = `${i + 1}일차 ${format(
									day,
									"MM.dd"
								)} ~ ${format(nextDay, "MM.dd")}`;

								return (
									<EmptyPlaceBox
										key={i}
										label={label}
										onClick={() => {
											// 날짜별 모달 오픈 처리
											console.log(
												"날짜 선택:",
												format(day, "yyyy-MM-dd")
											);
										}}
									/>
								);
						  })
						: storedPlaces.map((place) => (
								<StoredPlaceBox
									key={place.place_id}
									type={"place"}
									place={place}
									onRemove={(id) => {
										setStoredPlaces((prev) =>
											prev.filter(
												(p) => p.place_id !== id
											)
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
