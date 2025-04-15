import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import img from "../../../../assets/MainImg.jpg";
import { FaTrash } from "react-icons/fa6";

function StoredPlaceBox(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [hour, setHour] = useState(2);
	const [minute, setMinute] = useState(0);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		setIsEditing(false);
	};

	return (
		<div css={S.SLayout}>
			{isEditing ? (
				// 편집 모드 (시간 입력 + 저장 버튼)
				<div css={S.SInputContainer}>
					<input
						type="number"
						value={hour}
						onChange={(e) => {
							let value = parseInt(e.target.value, 10);
							if (isNaN(value)) value = 0;
							if (value < 0) value = 0;
							if (value > 23) value = 23;
							setHour(value);
						}}
						min={0}
						css={S.SInputTime}
					/>
					<span>시간</span>
					<input
						type="number"
						value={minute}
						onChange={(e) => {
							let value = parseInt(e.target.value, 10);
							if (isNaN(value)) value = 0;
							if (value < 0) value = 0;
							if (value > 59) value = 59;
							setMinute(value);
						}}
						min={0}
						max={59}
						css={S.SInputTime}
					/>
					분
					<button css={S.SSaveBtn} onClick={handleSave}>
						저장
					</button>
				</div>
			) : (
				// 기본 보기 모드
				<>
					<img src={img} alt="장소 이미지" />
					<div css={S.SInfoContainer}>
						<h2 css={S.STitle}>장소명</h2>
						<div>
							<span css={S.SCategory}>명소</span>
							<span css={S.SAddress}>
								8459-8481 Kalanianaʻole Hwy, Honolulu, HI 96825,
								USA
							</span>
						</div>
					</div>

					<div css={S.STimeContainer} onClick={handleEdit}>
						{hour}시간 {minute}분
					</div>

					<button css={S.SDeleteBtn}>
						<FaTrash />
					</button>
				</>
			)}
		</div>
	);
}

export default StoredPlaceBox;
