import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { minutesToTime, timeToMinutes } from "../../../utils/ScheduleTimeUtils";
import { useTrip } from "../../Routes/TripContext";
import useScheduleDropHandler from "../../../hooks/useScheduleDropHandler";

function ScheduleEditor({ schedule, popupPosition, onSave, onClose }) {
	const { schedules, setSchedules } = useTrip();
	const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);

	// viewStartTime, viewEndTime이 있으면 원래 일정 기준으로 사용
	const {
		tripScheduleId,
		startTime,
		endTime,
		stayTime,
		viewStartTime,
		viewEndTime,
		date,
	} = schedule || {};

	// 원래 일정 기준 시간
	const originStart = viewStartTime || startTime || "00:00";

// viewStartTime과 viewEndTime이 모두 있을 때만 익일 판단
const originEnd =
	viewStartTime && viewEndTime
		? (() => {
				const s = timeToMinutes(viewStartTime);
				const e = timeToMinutes(viewEndTime);
				const adjusted = e < s ? e + 1440 : e;
				const normalized = adjusted >= 1440 ? adjusted - 1440 : adjusted;
				return minutesToTime(normalized);
		  })()
		: viewEndTime || endTime || "00:00";

	const originStay =
		viewStartTime && viewEndTime
			? (() => {
					const s = timeToMinutes(viewStartTime);
					const e = timeToMinutes(viewEndTime);
					return e >= s ? e - s : e + 1440 - s;
			  })()
			: stayTime ?? 0;

	// 시작/종료/머무는 시간의 초기값을 "원래 일정" 기준으로!
	const [start, setStart] = useState(originStart);
	const [end, setEnd] = useState(originEnd);
	const [stayHour, setStayHour] = useState(Math.floor(originStay / 60));
	const [stayMinute, setStayMinute] = useState(originStay % 60);

	const editorRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (editorRef.current && !editorRef.current.contains(e.target)) {
				onClose?.();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	// 🟢 시작 시간 변경 → 종료 시간 자동 변경
	const handleStartChange = (newStart) => {
		setStart(newStart);
		const startMins = timeToMinutes(newStart);
		const totalStay = stayHour * 60 + stayMinute;
		const newEnd = minutesToTime((startMins + totalStay) % 1440);
		setEnd(newEnd);
	};

	// 🟢 종료 시간 변경 → 머무는 시간 자동 변경
	const handleEndChange = (newEnd) => {
		setEnd(newEnd);
		const startMins = timeToMinutes(start);
		const endMins = timeToMinutes(newEnd);
		let diff = endMins - startMins;
		if (diff < 0) diff += 1440;
		setStayHour(Math.floor(diff / 60));
		setStayMinute(diff % 60);
	};

	// 🟢 머무는 시간 변경 → 종료 시간 자동 변경
	const handleStayChange = (hour, minute) => {
		setStayHour(hour);
		setStayMinute(minute);
		const startMins = timeToMinutes(start);
		const newEnd = minutesToTime((startMins + hour * 60 + minute) % 1440);
		setEnd(newEnd);
	};

	const handleSave = () => {
		const total = stayHour * 60 + stayMinute;
		onSave?.(tripScheduleId, {
			startTime: start,
			endTime: end,
			stayTime: total,
		});
		handleDrop(
			{
				...schedule,
				stayTime: total,
				startTime: start,
				endTime: end,
				// viewStartTime, viewEndTime도 같이 변경!
				viewStartTime: start,
				viewEndTime: end,
			},
			date,
			start,
			end
		);
		onClose?.();
	};

    return (
        <div
            css={[
                S.SBubbleEditor,
                popupPosition === "above" ? S.SPopupAbove : S.SPopupBelow,
            ]}
            ref={editorRef}
        >
            <label>시작 시간</label>
            <input
                type="time"
                value={start}
                onChange={(e) => handleStartChange(e.target.value)}
            />
            <label>종료 시간</label>
            <input
                type="time"
                value={end}
                onChange={(e) => handleEndChange(e.target.value)}
            />
            <label>머무는 시간</label>
            <div css={S.SEditorRow}>
                <input
                    type="number"
                    min={0}
                    max={23}
                    value={stayHour}
                    onChange={(e) =>
                        handleStayChange(
                            Math.max(0, parseInt(e.target.value, 10) || 0),
                            stayMinute
                        )
                    }
                    css={S.STimeInput}
                />
                <span>시간</span>
                <input
                    type="number"
                    min={0}
                    max={59}
                    value={stayMinute}
                    onChange={(e) =>
                        handleStayChange(
                            stayHour,
                            Math.max(0, parseInt(e.target.value, 10) || 0)
                        )
                    }
                    css={S.STimeInput}
                />
                <span>분</span>
            </div>
            <button onClick={handleSave}>저장</button>
        </div>
    );
}

export default ScheduleEditor;
