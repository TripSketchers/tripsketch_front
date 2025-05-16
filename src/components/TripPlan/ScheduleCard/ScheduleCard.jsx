import React, { useState } from "react";
import { useDrag } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import ScheduleEditor from "../ScheduleEditer/ScheduleEditer";
import { getCardPositionAndHeight } from "../../../utils/scheduleUtils";
import { formatDisplayTime } from "../../../utils/scheduleUtils";

function ScheduleCard({ schedule, onToggleLock, onUpdate }) {
    const {
        tripScheduleId,
        startTime,
        endTime,
        stayTime,
        isLocked,
        viewStartTime,
        viewEndTime,
        place,
    } = schedule;

    const [showEditor, setShowEditor] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const PIXELS_PER_MINUTE = 1;
    const { top: topPx, height: heightPx } = getCardPositionAndHeight(startTime, endTime, PIXELS_PER_MINUTE);
    const compactView = heightPx < 45;

    const [{ isDragging }, dragRef] = useDrag({
        type: "SCHEDULE",
        item: { schedule, topPx },
        canDrag: !isLocked && !showEditor,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    const handleEditClick = (e) => {
        e.stopPropagation();
        if (!isLocked) {
            setSelectedSchedule(schedule);
            setShowEditor(true);
        }
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
            onClick={handleEditClick}
        >
            <div css={S.SContainer}>
                {compactView ? (
                    <div css={S.SCompactText}>
                        <span>
                            {formatDisplayTime(viewStartTime || startTime)} -{" "}
                            {formatDisplayTime(viewEndTime || endTime)}
                        </span>
                        {place?.name || place?.displayName?.text}
                    </div>
                ) : (
                    <>
                        <div css={S.SCardTime}>
                            {formatDisplayTime(viewStartTime || startTime)} -{" "}
                            {formatDisplayTime(viewEndTime || endTime)}
                            <span> ({Math.floor(stayTime / 60)}시간 {stayTime % 60}분)</span>
                        </div>
                        <div css={S.SCardLabel}>
                            {place?.name || place?.displayName?.text}
                        </div>
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
                    schedule={selectedSchedule}
                    onSave={(id, updates) => {
                        onUpdate?.(id, updates);
                        setShowEditor(false);
                    }}
                    onClose={() => setShowEditor(false)}
                />
            )}
        </div>
    );
}

export default ScheduleCard;
