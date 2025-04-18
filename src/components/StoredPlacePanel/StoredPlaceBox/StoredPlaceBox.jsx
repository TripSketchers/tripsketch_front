import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import img from "../../../assets/default img.png";
import { FaTrash } from "react-icons/fa6";

function StoredPlaceBox({ type, place, onRemove }) {
	const [isEditing, setIsEditing] = useState(false);
	const [hour, setHour] = useState(18);
	const [minute, setMinute] = useState(0);

	const formatTime = (num) => String(num).padStart(2, "0");

	const handleHourChange = (e) => {
		const value = Math.max(0, Math.min(23, +e.target.value || 0));
		setHour(value);
	};

	const handleMinuteChange = (e) => {
		const value = Math.max(0, Math.min(59, +e.target.value || 0));
		setMinute(value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") setIsEditing(false);
	};
	
	return (
		<div css={S.SLayout}>
			{isEditing ? (
				<div css={S.SInputContainer}>
					<input
						type="number"
						value={formatTime(hour)}
						onChange={handleHourChange}
						onKeyDown={handleKeyDown}
						placeholder="00"
						min={0}
						max={23}
						css={S.SInputTime}
					/>
					<span>{type === "place" ? "시간" : " : "}</span>
					<input
						type="number"
						value={formatTime(minute)}
						onChange={handleMinuteChange}
						onKeyDown={handleKeyDown}
						placeholder="00"
						min={0}
						max={59}
						css={S.SInputTime}
					/>
					{type === "place" && <span>분</span>}
					<button css={S.SSaveBtn} onClick={() => setIsEditing(false)}>
						저장
					</button>
				</div>
			) : (
				<>
					<div css={S.SContainer}>
						<img src={place.photoUrl || img} alt="장소 이미지" />
						<div css={S.SInfoContainer}>
							<h2 css={S.STitle}>{place.name}</h2>
							<div>
								<span css={S.SCategory(place.category)}>{place.category}</span>
								<span css={S.SAddress}>{place.formatted_address}</span>
							</div>
						</div>
					</div>

					<div css={S.STimeContainer}>
						<span>{type === "place" ? "머무는 시간" : "체크인 시간"}</span>
						<div css={S.STimeBox} onClick={() => setIsEditing(true)}>
							{type === "place"
								? `${formatTime(hour)}시간 ${formatTime(minute)}분`
								: `${formatTime(hour)}:${formatTime(minute)}`}
						</div>
					</div>

					<button css={S.SDeleteBtn} onClick={() => onRemove(place.place_id)}>
						<FaTrash />
					</button>
				</>
			)}
		</div>
	);
}

export default StoredPlaceBox;
