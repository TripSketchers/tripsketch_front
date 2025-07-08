import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCheck, FaPlus } from "react-icons/fa6";
import StoredPlaceBox from "./StoredPlaceBox/StoredPlaceBox";
import EmptyPlaceBox from "./EmptyPlaceBox/EmptyPlaceBox";
import EmptyState from "../EmptyState/EmptyState"; // 상단에 import 추가
import { addDays, eachDayOfInterval, format } from "date-fns";
import { useTrip } from "../Routes/TripContext";

function StoredPlacePanel({ text, onAddPlaceClick, isAddingPlace, onSave }) {
	const {
		tripInfo,
		storedPlaces,
		setStoredPlaces,
		storedAccommodations,
		setStoredAccommodations,
	} = useTrip();

	const stayDays =
		text === "숙소" && tripInfo?.startDate && tripInfo?.endDate
			? eachDayOfInterval({
					start: new Date(tripInfo.startDate),
					end: addDays(new Date(tripInfo.endDate), -1),
			  })
			: [];

	return (
		<div css={S.SLayout}>
			<div css={S.SContainer}>
				<div css={S.STitleBox}>
					<h1>장소 보관함</h1>
					{text === "계획" &&
						(isAddingPlace ? (
							<button
								onClick={() => {
									onSave?.(); // 저장 API 호출
									onAddPlaceClick(); // 패널 토글
								}}
							>
								<FaCheck />
								추가 완료
							</button>
						) : (
							<button onClick={onAddPlaceClick}>
								<FaPlus />새 장소
							</button>
						))}
				</div>

				<div css={S.SHeader}>
					<div css={S.SStoredNum}>
						<FaCheck />
						<span>
							{text === "숙소"
								? `${
										Object.keys(storedAccommodations).length
								  } / ${stayDays.length}`
								: storedPlaces.length}
						</span>
					</div>
					{isAddingPlace && (
						<button
							onClick={() => {
								if (text === "숙소") {
									setStoredAccommodations({});
								} else {
									setStoredPlaces([]);
								}
							}}
						>
							초기화
						</button>
					)}
				</div>

				<div css={S.SContentBox}>
					{text === "숙소" ? (
						stayDays.map((day, i) => {
							const dateStr = format(day, "yyyy-MM-dd");
							const nextDay = addDays(day, 1);
							const label = `${i + 1}일차 ${format(
								day,
								"MM.dd"
							)} ~ ${format(nextDay, "MM.dd")}`;
							const place = storedAccommodations[dateStr];

							return (
								<div key={dateStr}>
									<div css={S.SDate}>{label}</div>
									{place ? (
										<StoredPlaceBox
											index={i + 1}
											type="accommodation"
											place={place}
											// key에 날짜와 googlePlaceId를 조합
											key={`${
												place.googlePlaceId || place.id
											}-${dateStr}`}
											onRemove={() => {
												const copy = {
													...storedAccommodations,
												};
												delete copy[dateStr];
												setStoredAccommodations(copy);
											}}
										/>
									) : (
										<EmptyPlaceBox />
									)}
								</div>
							);
						})
					) : storedPlaces.length === 0 ? (
						<EmptyState message="장소보관함이 비어있습니다." />
					) : (
						storedPlaces.map((place, idx) => (
							<StoredPlaceBox
								index={idx + 1}
								key={place.googlePlaceId || place.id}
								type="place"
								place={place}
								onRemove={(googlePlaceId) => {
									setStoredPlaces((prev) =>
										prev.filter(
											(p) =>
												p.googlePlaceId !==
												googlePlaceId
										)
									);
								}}
								disableRemove={!isAddingPlace}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default StoredPlacePanel;
