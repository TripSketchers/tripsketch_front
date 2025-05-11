import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import ScheduleEditor from "../ScheduleEditer/ScheduleEditer";

function ScheduleCard({ schedule, onToggleLock, onUpdate }) {
    const {
        tripScheduleId,
        startTime,
        endTime,
        stayTime,
        isLocked,
        label,
        viewStartTime,
        viewEndTime,
    } = schedule;

    const [showEditor, setShowEditor] = useState(false);
    const [start, setStart] = useState(startTime?.slice(0, 5) || "00:00");
    const [end, setEnd] = useState(endTime?.slice(0, 5) || "00:00");
    const [stayHour, setStayHour] = useState(Math.floor(stayTime / 60));
    const [stayMinute, setStayMinute] = useState(stayTime % 60);

    // 카드 위치 계산
    const [sh, sm] = startTime?.split(":").map(Number) || [0, 0];
    let totalMinutes = sh * 60 + sm;
    if (sh < 6) totalMinutes += 1440;

    const PIXELS_PER_MINUTE = 1;
    const topPx = (totalMinutes - 360) * PIXELS_PER_MINUTE;

    const [eh, em] = endTime?.split(":").map(Number) || [0, 0];
    let endTotalMinutes = eh * 60 + em;
    if (eh < 6) endTotalMinutes += 1440;

    const heightPx = (endTotalMinutes - totalMinutes) * PIXELS_PER_MINUTE;
    const compactView = heightPx < 45;

    useEffect(() => {
        setStart(startTime?.slice(0, 5) || "00:00");
        setEnd(endTime?.slice(0, 5) || "00:00");
        setStayHour(Math.floor(stayTime / 60));
        setStayMinute(stayTime % 60);
    }, [startTime, endTime, stayTime]);

    useEffect(() => {
        const [sh, sm] = start.split(":").map(Number);
        const startDate = new Date(2025, 0, 1, sh, sm);
        const newEndDate = new Date(startDate.getTime() + (stayHour * 60 + stayMinute) * 60000);
        const eh = newEndDate.getHours().toString().padStart(2, "0");
        const em = newEndDate.getMinutes().toString().padStart(2, "0");
        setEnd(`${eh}:${em}`);
    }, [stayHour, stayMinute]);

    const [{ isDragging }, dragRef] = useDrag({
        type: "SCHEDULE",
        item: { schedule },
        canDrag: !isLocked && !showEditor,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    const handleSave = () => {
        const total = stayHour * 60 + stayMinute;
        onUpdate?.(tripScheduleId, {
            startTime: `${start}:00`,
            endTime: `${end}:00`,
            stayTime: total,
        });
        setShowEditor(false);
    };

    return (
        <div
            ref={dragRef}
            css={S.SCard}
            style={{
                top: `${topPx}px`,
                height: `${heightPx}px`,
                opacity: isDragging ? 0.5 : 1,
                cursor: isLocked ? "not-allowed" : "move",
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (!isLocked) setShowEditor(true);
            }}
        >
            <div css={S.SContainer}>
                {compactView ? (
                    <div css={S.SCompactText}>
                        <span>
                            {viewStartTime?.slice(0, 5) || start} - {viewEndTime?.slice(0, 5) || end}
                        </span>
                        {label}
                    </div>
                ) : (
                    <>
                        <div css={S.SCardTime}>
                            {viewStartTime?.slice(0, 5) || start} - {viewEndTime?.slice(0, 5) || end}
                            <span>
                                ({Math.floor(stayTime / 60)}시간 {stayTime % 60}분)
                            </span>
                        </div>
                        <div css={S.SCardLabel}>{label}</div>
                    </>
                )}
            </div>

            <div
                css={S.SLocked}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock?.(tripScheduleId);
                }}
            >
                {isLocked === 1 ? <FaLock /> : <FaLockOpen />}
            </div>

            {showEditor && (
                <ScheduleEditor
                    start={start}
                    end={end}
                    stayHour={stayHour}
                    stayMinute={stayMinute}
                    setStart={setStart}
                    setEnd={setEnd}
                    setStayHour={setStayHour}
                    setStayMinute={setStayMinute}
                    onSave={handleSave}
                    onClose={() => setShowEditor(false)}
                />
            )}
        </div>
    );
}

export default ScheduleCard;
