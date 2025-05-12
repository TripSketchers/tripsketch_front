import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function ScheduleEditor({ schedule, onSave, onClose }) {
    // ✅ Context에서 초기값 설정
    const { tripScheduleId, startTime, endTime, stayTime } = schedule || {};

    const [start, setStart] = useState(startTime?.slice(0, 5) || "00:00");
    const [end, setEnd] = useState(endTime?.slice(0, 5) || "00:00");
    const [stayHour, setStayHour] = useState(Math.floor(stayTime / 60));
    const [stayMinute, setStayMinute] = useState(stayTime % 60);

    const editorRef = useRef(null);

    // ✅ 클릭 시 외부 클릭 감지로 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (editorRef.current && !editorRef.current.contains(e.target)) {
                onClose?.();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    // ✅ 종료 시간 변경 시 머무는 시간 자동 계산
    const handleEndTimeChange = (value) => {
        setEnd(value);
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = value.split(":").map(Number);
        let diff = eh * 60 + em - (sh * 60 + sm);

        // 다음 날로 넘어가는 경우 (예: 23:00 ~ 01:00)
        if (diff < 0) diff += 1440;

        setStayHour(Math.floor(diff / 60));
        setStayMinute(diff % 60);
    };

    // ✅ 저장 버튼 클릭
    const handleSave = () => {
        const total = stayHour * 60 + stayMinute;
        onSave?.(tripScheduleId, {
            startTime: `${start}:00`,
            endTime: `${end}:00`,
            stayTime: total,
        });
        onClose?.();
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
                    onChange={(e) =>
                        setStayHour(Math.max(0, parseInt(e.target.value, 10) || 0))
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
                        setStayMinute(Math.max(0, parseInt(e.target.value, 10) || 0))
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
