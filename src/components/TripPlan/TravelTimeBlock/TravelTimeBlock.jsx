import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaBus, FaCar } from "react-icons/fa6";

function TravelTimeBlock({ topPx, heightPx, item, transportType }) {
	// ✅ Google Maps 링크 열기
	const handleClick = () => {
        console.log("TravelTimeBlock clicked:", item);

		if (!item.origin || !item.destination) {
			console.warn("좌표 정보가 없습니다.");
			return;
		}

		const { lat: originLat, lng: originLng } = item.origin;
		const { lat: destLat, lng: destLng } = item.destination;

		const mode = transportType === 0 ? "transit" : "driving";
		const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=${mode}`;

		window.open(url, "_blank");
	};

	return (
		<div key={item.id} css={S.STravelTimeBlock(topPx, heightPx)} onClick={handleClick}>
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
