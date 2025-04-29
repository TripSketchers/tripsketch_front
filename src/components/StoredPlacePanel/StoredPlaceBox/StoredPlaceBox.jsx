import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaTrash } from "react-icons/fa6";
import TimeInputEditor from "../../TimeInputEditer/TimeInputEditer";
import { useTrip } from "../../TripCreate/TripContext";
import { instance } from "../../../api/config/instance";
import { getCategoryFromTypes } from "../../../utils/CategoryUtils";

function StoredPlaceBox({ index, type, place, onRemove }) {
	const [isEditing, setIsEditing] = useState(false);
	const [hour, setHour] = useState(type === "place" ? 2 : 18);
	const [minute, setMinute] = useState(0);
	const { setFocusedPlace } = useTrip();
	const [imgSrc, setImgSrc] = useState(fallbackImg);
	const imgRef = useRef();

	const formatTime = (num) => String(num).padStart(2, "0");
	const category = getCategoryFromTypes(place.types);

	useEffect(() => {
		if (place.photos?.[0]?.name) {
			const fetchImage = async () => {
				try {
					const res = await instance.get(`/photo?ref=${place.photos[0].name}`, {
						headers: {
							Authorization: localStorage.getItem("accessToken"),
						},
						responseType: "blob",
					});
					const blobUrl = URL.createObjectURL(res.data);
					setImgSrc(blobUrl);
				} catch (error) {
					console.error("이미지 로딩 실패", error);
					setImgSrc(fallbackImg);
				}
			};
			fetchImage();
		} else {
			setImgSrc(fallbackImg);
		}
	}, [place]);

	return (
		<div css={S.SLayout} onClick={() => setFocusedPlace(place)}>
			{isEditing ? (
				<TimeInputEditor
					hour={hour}
					minute={minute}
					setHour={setHour}
					setMinute={setMinute}
					type={type}
					onSave={() => setIsEditing(false)}
				/>
			) : (
				<>
					<div css={S.SContainer}>
						{type === "place" && <div css={S.SIndexBox}>{index}</div>}
						<img
							ref={imgRef}
							src={imgSrc}
							alt={place.displayName?.text || "장소 이미지"}
							loading="lazy"
							onError={(e) => (e.target.src = fallbackImg)}
						/>
						<div css={S.SInfoContainer}>
							<h2 css={S.STitle}>{place.displayName?.text || "이름 없음"}</h2>
							<div>
								<span css={S.SCategory(category)}>{category}</span>
								<span css={S.SAddress}>{place.formattedAddress}</span>
							</div>
						</div>
					</div>

					<div css={S.STimeContainer}>
						<span>
							{type === "place" ? "머무는 시간" : "체크인 시간"}
						</span>
						<div
							css={S.STimeBox}
							onClick={(e) => {
								e.stopPropagation();
								setIsEditing(true);
							}}
						>
							{type === "place"
								? `${formatTime(hour)}시간 ${formatTime(minute)}분`
								: `${formatTime(hour)} : ${formatTime(minute)}`}
						</div>
					</div>

					<button
						css={S.SDeleteBtn}
						onClick={(e) => {
							e.stopPropagation();
							onRemove(place.id);
						}}
					>
						<FaTrash />
					</button>
				</>
			)}
		</div>
	);
}

export default StoredPlaceBox;
