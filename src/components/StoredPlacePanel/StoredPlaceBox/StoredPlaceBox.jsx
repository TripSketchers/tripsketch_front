import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaTrash } from "react-icons/fa6";
import { useTrip } from "../../Routes/TripContext";
import { getImageBlobUrl } from "../../../utils/ImageUtils";
import { useDrag } from "react-dnd";

function StoredPlaceBox({ index, type, place, onRemove }) {
	const { setFocusedPlace } = useTrip();
	const [imgSrc, setImgSrc] = useState(place.imageUrl || fallbackImg);

	const [{ isDragging }, dragRef] = useDrag({
		type: "PLACE", // DropZone에서 이 타입을 받아야 함
		item: { schedule: place }, // PlanTable의 handleDrop과 맞춰야 함
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		const loadImage = async () => {
			if (!place.imageUrl && place.photoReference) {
				const blobUrl = await getImageBlobUrl(place.photoReference);
				place.imageUrl = blobUrl || fallbackImg; // ✅ place 객체에 캐싱
				setImgSrc(place.imageUrl);
			}
		};
		loadImage();
	}, [place]);

	return (
		<div
			ref={dragRef}
			css={S.SLayout(type === "place")}
			onClick={() => setFocusedPlace(place)}
		>
			<div css={S.SContainer}>
				{type === "place" && <div css={S.SIndexBox}>{index}</div>}
				<img
					src={imgSrc}
					alt={place.displayName?.text || place.name || "장소 이미지"}
					loading="lazy"
					onError={(e) => (e.target.src = fallbackImg)}
				/>
				<div css={S.SInfoContainer}>
					<h2 css={S.STitle}>
						{place.displayName?.text || place.name || "이름 없음"}
					</h2>
					<div>
						<span css={S.SCategory(place.category)}>
							{place.category}
						</span>
						<span css={S.SAddress}>
							{place.formattedAddress ||
								place.address ||
								"주소 정보 없음"}
						</span>
					</div>
				</div>
			</div>

			<button
				css={S.SDeleteBtn}
				onClick={(e) => {
					e.stopPropagation();
					onRemove(place.id || place.placeId);
				}}
			>
				<FaTrash />
			</button>
		</div>
	);
}

export default StoredPlaceBox;
