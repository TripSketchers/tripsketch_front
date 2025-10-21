import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import ScheduleEditor from "../ScheduleEditer/ScheduleEditer";
import {
    getCardPositionAndHeight,
    getDisplayStayTime,
    normalizeTime,
} from "../../../utils/ScheduleTimeUtils";
import { useTrip } from "../../Routes/TripContext";
import { useScheduleResizeHandler } from "../../../hooks/useScheduleResizeHandler";

function ScheduleCard({
    schedule,
    onToggleLock,
    onUpdate,
    setIsDragging,
    showPlaceSelectPanel,
}) {
    const {
        tripScheduleId,
        startTime,
        endTime,
        stayTime,
        isLocked,
        viewStartTime,
        viewEndTime,
        place,
        position,
        date,
        travelTime = 0,
    } = schedule;

    const [showEditor, setShowEditor] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isResizing, setIsResizing] = useState(false);

    const PIXELS_PER_MINUTE = 1;
    const { top: topPx, height: heightPx } = getCardPositionAndHeight(
        startTime,
        endTime,
        PIXELS_PER_MINUTE
    );
    const compactView = heightPx < 45;

    const [popupPosition, setPopupPosition] = useState("below");
    const cardRef = useRef(null);

    const { schedules, setFocusedPlace, setSelectedDayIdx } = useTrip();
    const { handleMouseDown } = useScheduleResizeHandler({
        schedules,
        setIsResizing,
        onUpdate,
    });

    // 🐭 DnD 드래그 설정
    const [{ isDragging }, dragRef] = useDrag({
        type: "SCHEDULE",
        canDrag: () =>
            !isLocked && !showEditor && !isResizing && !showPlaceSelectPanel,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => {
            if (setIsDragging) setIsDragging(true);
            return { id: tripScheduleId, schedule, topPx };
        },
        end: () => {
            if (setIsDragging) setIsDragging(false);
        },
    });

    const handleEditClick = (e) => {
        e.stopPropagation();
        console.log(schedule);

        if (!isLocked && !isResizing) {
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
        return spaceBelow < popupHeight ? "above" : "below";
    };

    const displayStayTime =
        viewStartTime && viewEndTime
            ? getDisplayStayTime(viewStartTime, viewEndTime)
            : stayTime ?? 0;

    const displayStart = normalizeTime(viewStartTime || startTime || "00:00");
    const displayEnd = normalizeTime(viewEndTime || endTime || "00:00");

    return (
        <div
            ref={(el) => {
                cardRef.current = el;
                dragRef(el);
            }}
            css={S.SCard(schedule?.place?.category)}
            style={{
                top: `${topPx}px`,
                height: `${heightPx}px`,
                opacity: isDragging ? 0.5 : 1,
                cursor:
                    isLocked || showPlaceSelectPanel ? "not-allowed" : "move",
                userSelect: "none",
            }}
            onClick={() => {
                // ✅ 클릭 시 해당 장소를 focusedPlace로 설정 (지도에서 panTo)
                if (place) {
                    setFocusedPlace(place);
                    setSelectedDayIdx(null);
                }
                handleEditClick({ stopPropagation: () => {} });
            }}
        >
            {/* 🔼 상단 리사이즈 핸들 */}
            <div
                css={S.SResizeHandleTop}
                onMouseDown={
                    isLocked
                        ? undefined // 🔒 잠금 시 리사이즈 막기
                        : handleMouseDown({
                              direction: "top",
                              schedule,
                          })
                }
            />

            {/* ✏️ 콘텐츠 */}
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
                                ({Math.floor(displayStayTime / 60)}시간{" "}
                                {displayStayTime % 60}분)
                            </span>
                        </div>
                        <div css={S.SCardLabel}>
                            {place?.name || place?.displayName?.text}
                        </div>
                    </>
                )}
            </div>

            {/* 🔒 잠금 토글 */}
            <div
                css={S.SLocked}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock?.(tripScheduleId);
                }}
            >
                {isLocked === 1 ? <FaLock /> : <FaLockOpen />}
            </div>

            {/* ✏️ 편집기 */}
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

            {/* 🔽 하단 리사이즈 핸들 */}
            <div
                css={S.SResizeHandleBottom}
                onMouseDown={
                    isLocked
                        ? undefined // 🔒 잠금 시 리사이즈 막기
                        : handleMouseDown({
                              direction: "bottom",
                              schedule,
                          })
                }
            />
        </div>
    );
}

export default ScheduleCard;
