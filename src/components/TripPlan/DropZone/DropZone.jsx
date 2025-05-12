import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

// 📌 상수 정의
const PIXELS_PER_MINUTE = 1; // 1분 = 1px
const OFFSET_MINUTES = 360; // 새벽 6시 (360분)

// ⏰ 종료 시간 계산 함수 (startTime + stayTime)
function calculateEndTime(startTime, stayTime) {
	const [h, m] = startTime.split(":").map(Number);
	const startDate = new Date(2025, 0, 1, h, m);
	const endDate = new Date(startDate.getTime() + stayTime * 60000);
	const endH = String(endDate.getHours()).padStart(2, "0");
	const endM = String(endDate.getMinutes()).padStart(2, "0");
	return `${endH}:${endM}:00`;
}

// 📥 DropZone 컴포넌트 (일정 드롭 가능 영역)
function DropZone({ date, index, onDrop, children }) {
	const dropBodyRef = useRef(null); // 드롭 영역 DOM 참조
	const [previewTop, setPreviewTop] = useState(null); // 미리보기 위치 (Y 좌표)
	const [previewHeight, setPreviewHeight] = useState(null); // 미리보기 높이

	// 🕒 마우스 위치를 시간으로 변환
	const calculateTimeFromPosition = (clientY, sourceY, containerTop) => {
		const offsetY = clientY - (clientY - sourceY) - containerTop;
		const rawMinutes = offsetY / PIXELS_PER_MINUTE;
		const totalMinutes =
			Math.max(0, Math.round(rawMinutes / 5) * 5) + OFFSET_MINUTES;
		const hour = Math.floor(totalMinutes / 60) % 24;
		const minute = totalMinutes % 60;
		const startTime = `${hour.toString().padStart(2, "0")}:${minute
			.toString()
			.padStart(2, "0")}:00`;
		const previewY = (totalMinutes - OFFSET_MINUTES) * PIXELS_PER_MINUTE;
		return { startTime, previewY };
	};

	// 📌 react-dnd Drop 설정
	const [{ isOver }, dropRef] = useDrop({
		accept: ["SCHEDULE", "PLACE"], // 드롭 가능한 타입
		hover: (item, monitor) => {
			if (!dropBodyRef.current) return;

			const clientOffset = monitor.getClientOffset(); // 마우스 현재 위치
			const sourceOffset = monitor.getSourceClientOffset(); // 드래그 시작 위치
			const bounding = dropBodyRef.current.getBoundingClientRect();

			const { previewY } = calculateTimeFromPosition(
				clientOffset.y,
				sourceOffset.y,
				bounding.top
			);

			// 미리보기 위치, 높이 설정
			setPreviewTop(previewY);
			setPreviewHeight(
				(item.schedule?.stayTime || item.place?.stayTime || 120) *
					PIXELS_PER_MINUTE
			);
		},
		drop: (item, monitor) => {
			const clientOffset = monitor.getClientOffset();

			if (!dropBodyRef?.current) return;

			const bounding = dropBodyRef.current.getBoundingClientRect();
			const { startTime } = calculateTimeFromPosition(
				clientOffset.y,
				clientOffset.y,
				bounding.top
			);

			setPreviewTop(null);
			setPreviewHeight(null);

			if (item.schedule) {
				onDrop(item.schedule, date, startTime, dropBodyRef); // ✅ clientY 전달
			} else if (item.place) {
				const stayTime = item.place.stayTime || 120;
				const newSchedule = {
					tripScheduleId: Date.now(),
					placeId: item.place.id || item.place.placeId,
					name: item.place.name,
					category: item.place.category,
					date,
					startTime,
					stayTime,
					endTime: calculateEndTime(startTime, stayTime),
					isLocked: 0,
					isSplit: false,
					viewStartTime: startTime,
					viewEndTime: calculateEndTime(startTime, stayTime),
					location: item.place.location || {
						latitude: item.place.latitude,
						longitude: item.place.longitude,
					},
				};
				onDrop(newSchedule, date, startTime, dropBodyRef); // ✅ clientY 전달
			}
		},
		collect: (monitor) => ({ isOver: monitor.isOver() }), // 현재 드롭 영역에 마우스가 있는지 여부
	});

	// ❌ 드롭 해제 시 미리보기 제거
	useEffect(() => {
		if (!isOver) {
			setPreviewTop(null);
			setPreviewHeight(null);
		}
	}, [isOver]);

	// 드롭 영역 DOM 연결
	useEffect(() => {
		if (dropBodyRef.current) {
			dropRef(dropBodyRef);
		}
	}, []); // 마운트 시 한 번만 호출

	return (
		<div css={S.SDayColumn}>
			{/* 📅 날짜 헤더 */}
			<div css={S.SDayHeader}>
				{index + 1}일차 {date}
			</div>

			{/* 📥 드롭 영역 */}
			<div ref={dropBodyRef} css={S.SDropBody}>
				{/* 🕓 시간 라인 표시 */}
				{Array.from({ length: 24 }, (_, i) => (
					<div
						key={i}
						css={S.SHourLine}
						style={{ top: `${i * 60 * PIXELS_PER_MINUTE}px` }}
					/>
				))}

				{/* 📌 드래그 미리보기 표시 */}
				{previewTop !== null && (
					<div
						css={S.SDropPreview}
						style={{
							top: `${previewTop}px`,
							height: `${previewHeight}px`,
						}}
					/>
				)}

				{/* 📅 일정 카드들 */}
				{children}
			</div>
		</div>
	);
}

export default DropZone;
