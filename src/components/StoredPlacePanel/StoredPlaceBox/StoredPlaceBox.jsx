import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaTrash } from "react-icons/fa6";
import { useTrip } from "../../Routes/TripContext";
import { getImageBlobUrl } from "../../../utils/ImageUtils";
import { useDrag } from "react-dnd";
import { showToast } from "../../Toast/Toast";

function StoredPlaceBox({
	index,
	type,
	place,
	onRemove,
	disableRemove = false,
}) {
	const { setFocusedPlace } = useTrip();
	const [imgSrc, setImgSrc] = useState(place.imageUrl || fallbackImg);

	const [{ isDragging }, dragRef] = useDrag({
		type: "PLACE",
		item: { schedule: place },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		canDrag: () => {
			if (disableRemove) {
				return true;
			}
			// 드래그 시도할 때 토스트 표시
			showToast.info("장소 추가 중에는 스케줄을 배치할 수 없습니다.");
			return false;
		},
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
			{!disableRemove && (
				<button
					css={S.SDeleteBtn}
					onClick={(e) => {
						e.stopPropagation();
						onRemove(place.googlePlaceId);
					}}
				>
					<FaTrash />
				</button>
			)}
		</div>
	);
}

export default StoredPlaceBox;
