import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaStar } from "react-icons/fa";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { instance } from "../../../api/config/instance";
import { useTrip } from "../../TripCreate/TripContext";

function PlaceBox({ place, onToggle, isAdded }) {
	const imgRef = useRef();
	const [imgSrc, setImgSrc] = useState(place.imageUrl || null); // ✅ place.imageUrl 먼저 확인
	const { setPlaceModalInfo } = useTrip();

	// ✅ 백엔드를 통해서 blob 이미지를 가져오는 함수
	const getImageBlobUrl = async (photoReference) => {
		if (!photoReference) return "";
		try {
			const res = await instance.get(`/photo?ref=${photoReference}`, {
				headers: {
					Authorization: localStorage.getItem("accessToken"),
				},
				responseType: "blob",
			});
			return URL.createObjectURL(res.data);
		} catch (err) {
			console.error("이미지 로딩 실패", err);
			return "";
		}
	};

	useEffect(() => {
		if (imgSrc) return; // ✅ imageUrl 이미 있으면 요청 X
		if (!imgRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					const loadImage = async () => {
						if (place.photos?.[0]?.name) {
							const blobUrl = await getImageBlobUrl(
								place.photos[0].name
							);
							setImgSrc(blobUrl);
							place.imageUrl = blobUrl; // ✅ place 객체에 저장
						} else {
							setImgSrc(fallbackImg);
							place.imageUrl = fallbackImg;
						}
					};
					loadImage();
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(imgRef.current);
		return () => observer.disconnect();
	}, [place, imgSrc]);

	return (
		<div css={S.SLayout} onClick={() => setPlaceModalInfo(place)}>
			<img
				ref={imgRef}
				src={imgSrc || fallbackImg}
				alt={place.displayName?.text || "장소"}
				loading="lazy"
				onError={(e) => (e.target.src = fallbackImg)}
			/>
			<div css={S.SContainer}>
				<h2 css={S.STitle}>{place.displayName?.text || "이름 없음"}</h2>
				<div>
					<span css={S.SCategory(place.category)}>{place.category}</span>
					<span css={S.SAddress}>
						{place.formattedAddress || "주소 정보 없음"}
					</span>
				</div>
				<div css={S.SLikeBox}>
					{place.rating !== null && (
						<span css={S.SStar}>
							<FaStar /> {place.rating}
						</span>
					)}
				</div>
			</div>
			<button css={S.SButton(isAdded)} onClick={onToggle}>
				{isAdded ? <FaCheck /> : <FaPlus />}
			</button>
		</div>
	);
}

export default PlaceBox;
