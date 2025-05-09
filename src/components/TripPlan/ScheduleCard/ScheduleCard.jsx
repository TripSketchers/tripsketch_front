import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaLock, FaLockOpen } from "react-icons/fa6";

function ScheduleCard({ schedule, onToggleLock, onUpdate }) {
	const {
		trip_schedule_id,
		start_time,
		end_time,
		stay_time,
		is_locked,
		label,
	} = schedule;

	const [showEditor, setShowEditor] = useState(false);
	const [start, setStart] = useState(start_time.slice(0, 5));
	const [end, setEnd] = useState(end_time.slice(0, 5));
	const [stayHour, setStayHour] = useState(Math.floor(stay_time / 60));
	const [stayMinute, setStayMinute] = useState(stay_time % 60);

	const editorRef = useRef(null);

	// 카드 위치 계산 (6시 기준 시작, 새벽 보정)
	const [h, m] = start_time.split(":" ).map(Number);
	let totalMinutes = h * 60 + m;
	if (h >= 0 && h < 6) totalMinutes += 1440;

	const PIXELS_PER_MINUTE = 1;
	const topPx = (totalMinutes - 360) * PIXELS_PER_MINUTE;
	const heightPx = (stay_time ?? 60) * PIXELS_PER_MINUTE;
	const compactView = heightPx < 45;

	// 시작/종료 시간 변경 시 머무는 시간 계산
	useEffect(() => {
		const [sh, sm] = start.split(":" ).map(Number);
		const [eh, em] = end.split(":" ).map(Number);
		const diff = eh * 60 + em - (sh * 60 + sm);
		if (diff > 0) {
			setStayHour(Math.floor(diff / 60));
			setStayMinute(diff % 60);
		}
	}, [start, end]);

	// 머무는 시간 변경 시 종료 시간 자동 반영
	useEffect(() => {
		const [sh, sm] = start.split(":" ).map(Number);
		const startDate = new Date(2025, 0, 1, sh, sm);
		const newEndDate = new Date(startDate.getTime() + (stayHour * 60 + stayMinute) * 60000);
		const eh = newEndDate.getHours().toString().padStart(2, "0");
		const em = newEndDate.getMinutes().toString().padStart(2, "0");
		setEnd(`${eh}:${em}`);
	}, [stayHour, stayMinute]);

	// 드래그 설정
	const [{ isDragging }, dragRef] = useDrag({
		type: "SCHEDULE",
		item: { schedule },
		canDrag: !is_locked && !showEditor,
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	});

	// 저장 핸들러
	const handleSave = () => {
		const total = stayHour * 60 + stayMinute;
		onUpdate?.(trip_schedule_id, {
			start_time: `${start}:00`,
			end_time: `${end}:00`,
			stay_time: total,
		});
		setShowEditor(false);
	};

	// 외부 클릭 시 편집기 닫기
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (editorRef.current && !editorRef.current.contains(e.target)) {
				setShowEditor(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// 스케줄 변경 시 로컬 상태 초기화
	useEffect(() => {
		setStart(schedule.start_time.slice(0, 5));
		setEnd(schedule.end_time.slice(0, 5));
		setStayHour(Math.floor(schedule.stay_time / 60));
		setStayMinute(schedule.stay_time % 60);
	}, [schedule.start_time, schedule.end_time, schedule.stay_time]);

	return (
		<div
			ref={dragRef}
			css={S.SCard}
			style={{
				top: `${topPx}px`,
				height: `${heightPx}px`,
				opacity: isDragging ? 0.5 : 1,
				cursor: is_locked ? "not-allowed" : "move",
			}}
			onClick={(e) => {
				e.stopPropagation();
				if (!is_locked) setShowEditor(true);
			}}
		>
			<div css={S.SContainer}>
				{compactView ? (
					<div css={S.SCompactText}>
						<span>{start_time.slice(0, 5)} - {end_time.slice(0, 5)}</span>
						{label}
					</div>
				) : (
					<>
						<div css={S.SCardTime}>
							{start_time.slice(0, 5)} - {end_time.slice(0, 5)}
							<span> ({Math.floor(stay_time / 60)}시간 {stay_time % 60}분)</span>
						</div>
						<div css={S.SCardLabel}>{label}</div>
					</>
				)}
			</div>

			{/* 🔒 잠금 버튼 */}
			<div
				css={S.SLocked}
				onClick={(e) => {
					e.stopPropagation();
					onToggleLock?.(trip_schedule_id);
				}}
			>
				{is_locked === 1 ? <FaLock /> : <FaLockOpen />}
			</div>

			{/* 📝 편집기 */}
			{showEditor && (
				<div css={S.SBubbleEditor} ref={editorRef}>
					<label>시작 시간</label>
					<input
						type="time"
						value={start}
						onChange={(e) => setStart(e.target.value)}
					/>
					<label>종료 시간</label>
					<input
						type="time"
						value={end}
						onChange={(e) => setEnd(e.target.value)}
					/>
					<label>머무는 시간</label>
					<div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
						<input
							type="number"
							min={0}
							value={stayHour}
							onChange={(e) => setStayHour(Math.max(0, parseInt(e.target.value, 10) || 0))}
							style={{ width: "50px" }}
						/>
						<span>시간</span>
						<input
							type="number"
							min={0}
							max={59}
							value={stayMinute}
							onChange={(e) => setStayMinute(Math.max(0, parseInt(e.target.value, 10) || 0))}
							style={{ width: "50px" }}
						/>
						<span>분</span>
					</div>
					<button onClick={handleSave}>저장</button>
				</div>
			)}
		</div>
	);
}

export default ScheduleCard;
