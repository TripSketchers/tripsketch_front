import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import ScheduleEditor from "../ScheduleEditer/ScheduleEditer";
import { getCardPositionAndHeight, getDisplayStayTime, normalizeTime } from "../../../utils/ScheduleTimeUtils";

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

    const [popupPosition, setPopupPosition] = useState("below");
    const cardRef = useRef(null);

    // 🐭 DnD 드래그 설정
    const [{ isDragging }, dragRef] = useDrag({
        type: "SCHEDULE",
        item: { schedule, topPx },
        canDrag: !isLocked && !showEditor,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    const handleEditClick = (e) => {
        console.log(schedule);
        
        e.stopPropagation();
        if (!isLocked) {
            setSelectedSchedule(schedule);
            if (cardRef.current) {
                const position = getPopupPosition(cardRef.current);
                setPopupPosition(position);
            }
            setShowEditor(true);
        }
    };

    const getPopupPosition = (triggerElement, popupHeight = 200) => {
        const rect = triggerElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const spaceBelow = viewportHeight - rect.bottom;
        const shouldShowAbove = spaceBelow < popupHeight;

        return shouldShowAbove ? "above" : "below";
    }

    // 원래 전체 일정 기준 머무는 시간(분) 계산
    const displayStayTime =
        viewStartTime && viewEndTime
            ? getDisplayStayTime(viewStartTime, viewEndTime)
            : stayTime ?? 0; // stayTime도 undefined일 수 있으니 기본값 0

    const displayStart = normalizeTime(viewStartTime || startTime || "00:00");
    const displayEnd = normalizeTime(viewEndTime || endTime || "00:00");

    return (
        <div
            ref={(el) => {
                dragRef(el);
                cardRef.current = el;
            }}
            css={S.SCard(schedule?.place?.category)}
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
                            {displayStart} - {displayEnd}
                        </span>
                        {place?.name || place?.displayName?.text}
                    </div>
                ) : (
                    <>
                        <div css={S.SCardTime}>
                            {displayStart} - {displayEnd}
                            <span>
                                {" "}
                                ({Math.floor(displayStayTime / 60)}시간 {displayStayTime % 60}분)
                            </span>
                        </div>
                        <div css={S.SCardLabel}>{place?.name || place?.displayName?.text}</div>
                    </>
                )}
            </div>

            {/* 🔒 잠금 버튼 */}
            <div
                css={S.SLocked}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock?.(tripScheduleId);
                }}
            >
                {isLocked === 1 ? <FaLock /> : <FaLockOpen />}
            </div>

            {/* ✏️ 편집기 팝업 */}
            {showEditor && (
                <ScheduleEditor
                    schedule={selectedSchedule}
                    popupPosition={popupPosition}
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
