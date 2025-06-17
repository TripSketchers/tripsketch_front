import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
// ✅ calculateEndTime 삭제, minutesToTime/timeToMinutes 조합으로 대체
import { minutesToTime, timeToMinutes } from "../../../utils/ScheduleTimeUtils";
import { useTrip } from "../../Routes/TripContext";

// 📌 상수 정의
const PIXELS_PER_MINUTE = 1; // 1분 = 1px
const OFFSET_MINUTES = 360; // 새벽 6시 (360분)

// 📥 DropZone 컴포넌트 (일정 드롭 가능 영역)
function DropZone({ date, index, onDrop, children }) {
    const { tripInfo } = useTrip(); // 여행 정보 가져오기
	const dropBodyRef = useRef(null); // 드롭 영역 DOM 참조
	const [previewTop, setPreviewTop] = useState(null); // 미리보기 위치 (Y 좌표)
	const [previewHeight, setPreviewHeight] = useState(null); // 미리보기 높이

	// 🕒 마우스 위치를 시간으로 변환
	const calculateTimeFromPosition = (clientY, sourceY, containerTop) => {
		const offsetY = clientY - (clientY - sourceY) - containerTop;   // 드롭 영역의 상단 위치
		const rawMinutes = offsetY / PIXELS_PER_MINUTE; // 드롭 위치의 분 단위
		const clampedMinutes = Math.round(rawMinutes / 5) * 5;
		const totalMinutes =
			Math.max(-OFFSET_MINUTES, clampedMinutes) + OFFSET_MINUTES; // 최소 6시부터 시작

		const hour = Math.floor(totalMinutes / 60);
		const minute = totalMinutes % 60;
		const startTime = `${hour.toString().padStart(2, "0")}:${minute
			.toString()
			.padStart(2, "0")}`;
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
			const bounding = dropBodyRef.current.getBoundingClientRect();   // 드롭 영역의 바운딩 박스

			const { previewY } = calculateTimeFromPosition(
				clientOffset.y,
				sourceOffset.y,
				bounding.top
			);

            // 분할 일정이면 전체 구간(viewStartTime~viewEndTime) 머무는 시간으로 프리뷰 높이 계산
            let previewStayTime;
            if (item.schedule?.viewStartTime && item.schedule?.viewEndTime) {
                const s = timeToMinutes(item.schedule.viewStartTime);
                const e = timeToMinutes(item.schedule.viewEndTime);
                previewStayTime = e >= s ? e - s : e + 1440 - s;
            } else {
                previewStayTime =
                    item.schedule?.stayTime || item.place?.stayTime || 120;
            }

			setPreviewTop(previewY);
			setPreviewHeight(previewStayTime * PIXELS_PER_MINUTE);
		},
		drop: (item, monitor) => {
			if (!dropBodyRef?.current) return;

			const clientOffset = monitor.getClientOffset();
			const sourceOffset = monitor.getSourceClientOffset();
			const bounding = dropBodyRef.current.getBoundingClientRect();

			const { startTime } = calculateTimeFromPosition(
				clientOffset?.y,
				sourceOffset?.y,
				bounding.top
			);

            const stayTime =
                item.schedule?.stayTime || item.place?.stayTime || 120;
            const endTime = minutesToTime(timeToMinutes(startTime) + stayTime);

			setPreviewTop(null);
			setPreviewHeight(null);

			if (item.schedule) {
				// 기존 일정 드롭 시 endTime도 함께 전달
				onDrop(item.schedule, date, startTime, endTime, tripInfo);
			} else if (item.place) {
				const newSchedule = {
					tripScheduleId: Date.now(),
					date,
					startTime,
					stayTime,
					endTime,
					isLocked: 0,
					isSplit: false,
					viewStartTime: startTime,
					viewEndTime: endTime,
					place: item.place, // ✅ place 객체 그대로 저장
				};

				onDrop(newSchedule, date, startTime, endTime, dropBodyRef);
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
