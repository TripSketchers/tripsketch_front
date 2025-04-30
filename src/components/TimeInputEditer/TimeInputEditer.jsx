import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function TimeInputEditor({ hour, minute, setHour, setMinute, type, onSave }) {
	const formatTime = (num) => String(num).padStart(2, "0");

	const handleHourChange = (e) => {
		const value = Math.max(0, Math.min(23, +e.target.value || 0));
		setHour(value);
	};

	const handleMinuteChange = (e) => {
		const value = Math.max(0, Math.min(59, +e.target.value || 0));
		setMinute(value);
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
				placeholder="00"
				min={0}
				max={23}
				css={S.SInputTime}
			/>
			<span>{type === "place" ? "시간" : " : "}</span>
			<input
				type="number"
				value={formatTime(minute)}
				onChange={handleMinuteChange}
				onKeyDown={handleKeyDown}
				placeholder="00"
				min={0}
				max={59}
				css={S.SInputTime}
			/>
			{type === "place" && <span>분</span>}
			<button css={S.SSaveBtn} onClick={onSave}>
				저장
			</button>
		</div>
	);
}

export default TimeInputEditor;
