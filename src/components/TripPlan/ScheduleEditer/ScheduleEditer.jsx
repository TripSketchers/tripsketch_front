import React, { useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function ScheduleEditor({
	start,
	end,
	stayHour,
	stayMinute,
	setStart,
	setEnd,
	setStayHour,
	setStayMinute,
	onSave,
	onClose,
}) {
	const editorRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (editorRef.current && !editorRef.current.contains(e.target)) {
				onClose?.();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	const handleEndTimeChange = (value) => {
		setEnd(value);
		const [sh, sm] = start.split(":").map(Number);
		const [eh, em] = value.split(":").map(Number);
		let diff = eh * 60 + em - (sh * 60 + sm);

		// 다음 날로 넘어가는 경우 처리 (예: 23:00 ~ 01:00)
		if (diff < 0) diff += 1440;

		setStayHour(Math.floor(diff / 60));
		setStayMinute(diff % 60);
	};

	return (
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
				onChange={(e) => handleEndTimeChange(e.target.value)}
			/>
			<label>머무는 시간</label>
			<div css={S.SEditorRow}>
				<input
					type="number"
					min={0}
					value={stayHour}
					onChange={(e) => setStayHour(Math.max(0, parseInt(e.target.value, 10) || 0))}
					css={S.STimeInput}
				/>
				<span>시간</span>
				<input
					type="number"
					min={0}
					max={59}
					value={stayMinute}
					onChange={(e) => setStayMinute(Math.max(0, parseInt(e.target.value, 10) || 0))}
					css={S.STimeInput}
				/>
				<span>분</span>
			</div>
			<button onClick={onSave}>저장</button>
		</div>
	);
}

export default ScheduleEditor;
