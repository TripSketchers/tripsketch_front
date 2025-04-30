import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useTrip } from "../TripCreate/TripContext";
import { FaStar } from "react-icons/fa";
import fallbackImg from "../../assets/fallbackImg.png";
import { getCategoryFromTypes } from "../../utils/CategoryUtils";

function PlaceDetailModal() {
	const { placeModalInfo, setPlaceModalInfo } = useTrip();

	if (!placeModalInfo) return null;
	const category = getCategoryFromTypes(placeModalInfo.types);

	return (
		<div css={S.SBackdrop} onClick={() => setPlaceModalInfo(null)}>
			<div css={S.SModalWrapper} onClick={(e) => e.stopPropagation()}>
				<div css={S.SInfoBox}>
					<h2 css={S.STitle}>
						{placeModalInfo.displayName?.text || "이름 없음"}
					</h2>
					{placeModalInfo.rating && (
						<div css={S.SLikeBox}>
							<FaStar css={S.SStar} /> {placeModalInfo.rating}
						</div>
					)}
					<img src={placeModalInfo.imageUrl || fallbackImg} alt="장소 이미지" css={S.SImage} />
					<p css={S.SCategory(category)}>
						📌 {category || "카테고리 없음"}
					</p>
					<p css={S.SAddress}>
						주소 :{" "}
						{placeModalInfo.formattedAddress || "주소 정보 없음"}
					</p>
					<button
						css={S.SCloseBtn}
						onClick={() => setPlaceModalInfo(null)}
					>
						닫기
					</button>
				</div>
			</div>
		</div>
	);
}

export default PlaceDetailModal;
