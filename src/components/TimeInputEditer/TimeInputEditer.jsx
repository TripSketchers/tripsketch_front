import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function TimeInputEditor({ stayTime, onChange, onSave }) {
	const [localStayTime, setLocalStayTime] = useState(stayTime); // 분 단위

	useEffect(() => {
		setLocalStayTime(Math.max(10, stayTime)); // 최소 10분 보장
	}, [stayTime]);

	const hour = Math.floor(localStayTime / 60);
	const minute = localStayTime % 60;

	const formatTime = (num) => String(num).padStart(2, "0");

	const setTime = (nextHour, nextMinute) => {
		const total = nextHour * 60 + nextMinute;
		const safeTime = Math.max(10, total);
		setLocalStayTime(safeTime);
		onChange(safeTime);
	};

	const handleHourChange = (e) => {
		const h = Math.max(0, Math.min(23, +e.target.value || 0));
		setTime(h, minute);
	};

	const handleMinuteChange = (e) => {
		const m = Math.max(0, Math.min(59, +e.target.value || 0));
		setTime(hour, m);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") onSave();
	};

	return (
		<div css={S.SInputContainer}>
			<input
				type="number"
				value={formatTime(hour)}
				onChange={handleHourChange}
				onKeyDown={handleKeyDown}
				min={0}
				max={23}
				css={S.SInputTime}
			/>
			<span>시간</span>
			<input
				type="number"
				value={formatTime(minute)}
				onChange={handleMinuteChange}
				onKeyDown={handleKeyDown}
				min={0}
				max={59}
				css={S.SInputTime}
			/>
			<span>분</span>
			<button css={S.SSaveBtn} onClick={onSave}>저장</button>
		</div>
	);
}

export default TimeInputEditor;
