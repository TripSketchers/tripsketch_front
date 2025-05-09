import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCalendar } from "react-icons/fa";
import { useTrip } from "../../Routes/TripContext";
import { formatDateRange } from "../../../utils/DateUtils";

function Header({ selectedStep, onOpenModal }) {
	const { dateRange, tripName, setTripName } = useTrip();
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div css={S.SLayout}>
			<div css={S.STitle(isEditing)} onClick={() => setIsEditing(true)}>
				{isEditing ? (
					<input
						type="text"
						value={tripName}
						onChange={(e) => setTripName(e.target.value)}
						onBlur={() => setIsEditing(false)}
						autoFocus
						css={S.SInput}
					/>
				) : (
					<span>{tripName}</span>
				)}
			</div>
			<div>
				<div css={S.STripDes}>여행지</div>
				<div css={S.SDateBox}>
					<div>
						{formatDateRange(
							dateRange.startDate,
							dateRange.endDate
						)}
					</div>
					{selectedStep === 1 && (
						<button onClick={onOpenModal}>
							<FaCalendar />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
