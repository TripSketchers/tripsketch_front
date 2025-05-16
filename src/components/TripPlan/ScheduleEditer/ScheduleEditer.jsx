import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { formatDisplayTime } from "../../../utils/scheduleUtils";
import { useTrip } from "../../Routes/TripContext";
import useScheduleDropHandler from "../../../hooks/useScheduleDropHandler";

// ✅ 추가: popupPosition prop 받기
function ScheduleEditor({ schedule, onSave, onClose, popupPosition = "below" }) {
    const { schedules, setSchedules } = useTrip();
    const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);

    const { tripScheduleId, startTime, endTime, stayTime } = schedule || {};

    const [start, setStart] = useState(formatDisplayTime(startTime) || "00:00");
    const [end, setEnd] = useState(formatDisplayTime(endTime) || "00:00");
    const [stayHour, setStayHour] = useState(Math.floor(stayTime / 60));
    const [stayMinute, setStayMinute] = useState(stayTime % 60);

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

    const handleSave = () => {
        const total = stayHour * 60 + stayMinute;
        onSave?.(tripScheduleId, {
            startTime: `${start}:00`,
            endTime: `${end}:00`,
            stayTime: total,
        });
        handleDrop(
            {
                ...schedule,
                stayTime: total,
                startTime: `${start}:00`,
                endTime: `${end}:00`,
            },
            schedule.date,
            start
        );
        onClose?.();
    };

    return (
        <div
            ref={editorRef}
            css={[
                S.SBubbleEditor,
                popupPosition === "above" ? S.SPopupAbove : S.SPopupBelow
            ]}
        >
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
            <button onClick={handleSave}>저장</button>
        </div>
    );
}

export default ScheduleEditor;
