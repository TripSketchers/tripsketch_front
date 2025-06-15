import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaBus, FaCar } from "react-icons/fa6";

function TravelTimeBlock({ topPx, heightPx, item, transportType }) {
	const isKoreaLatLng = (lat, lng) => {
		// 한국 대략적 위경도 범위
		return lat >= 33 && lat <= 39 && lng >= 124 && lng <= 132;
	};

	const handleClick = () => {
		console.log("TravelTimeBlock clicked:", item);

		if (!item.origin || !item.destination) {
			console.warn("좌표 정보가 없습니다.");
			return;
		}

		const { lat: originLat, lng: originLng } = item.origin;
		const { lat: destLat, lng: destLng, name: destName } = item.destination;

		const isDriving = transportType === 1;
		const inKorea =
			isKoreaLatLng(originLat, originLng) &&
			isKoreaLatLng(destLat, destLng);

		if (isDriving && inKorea) {
			// ✅ 카카오맵 차량 길찾기 링크
			const kakaoUrl = `https://map.kakao.com/link/to/${destName},${destLat},${destLng}`;
			window.open(kakaoUrl, "_blank");
			return;
		}

		// ✅ 기본 Google Maps 링크
		const mode = transportType === 0 ? "transit" : "driving";
		const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=${mode}`;

		window.open(googleUrl, "_blank");
	};

	return (
		<div
			key={item.id}
			css={S.STravelTimeBlock(topPx, heightPx)}
			onClick={handleClick}
		>
			<div css={S.STravelTimeText}>
				{transportType === 0 ? <FaBus /> : <FaCar />}
				{item.travelTime / 60 >= 1 &&
					`${Math.floor(item.travelTime / 60)}시간 `}
				{item.travelTime % 60}분 이동
			</div>
		</div>
	);
}

export default TravelTimeBlock;
