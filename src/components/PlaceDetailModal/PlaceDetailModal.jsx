import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useTrip } from "../Routes/TripContext";
import { FaStar } from "react-icons/fa";
import fallbackImg from "../../assets/fallbackImg.png";
import ModalLayout from "../ModalLayout/ModalLayout";

function PlaceDetailModal() {
	const { placeModalInfo, setPlaceModalInfo } = useTrip();

	if (!placeModalInfo) return null;

	return (
		<ModalLayout onClose={() => setPlaceModalInfo(null)}>
			<div css={S.SModalWrapper}>
				<div css={S.SInfoBox}>
					<h2 css={S.STitle}>
						{placeModalInfo.displayName?.text || "이름 없음"}
					</h2>
					{placeModalInfo.rating && (
						<div css={S.SLikeBox}>
							<FaStar css={S.SStar} /> {placeModalInfo.rating}
						</div>
					)}
					<img
						src={placeModalInfo.imageUrl || fallbackImg}
						alt="장소 이미지"
						css={S.SImage}
					/>
					<p css={S.SCategory(placeModalInfo.category)}>
						📌 {placeModalInfo.category || "카테고리 없음"}
					</p>
					<p css={S.SAddress}>
						주소 : {placeModalInfo.formattedAddress || "주소 정보 없음"}
					</p>
					<button
						css={S.SCloseBtn}
						onClick={() => setPlaceModalInfo(null)}
					>
						닫기
					</button>
				</div>
			</div>
		</ModalLayout>
	);
}

export default PlaceDetailModal;
