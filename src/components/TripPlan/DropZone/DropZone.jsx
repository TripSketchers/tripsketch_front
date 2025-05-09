import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

const PIXELS_PER_MINUTE = 1;
const OFFSET_MINUTES = 360;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

function DropZone({ date, index, onDrop, children }) {
    const dropBodyRef = useRef(null);
    const [previewTop, setPreviewTop] = useState(null);
    const [previewHeight, setPreviewHeight] = useState(null);

    const calculateTimeFromPosition = (clientY, sourceY, containerTop) => {
        const offsetY = (clientY - (clientY - sourceY)) - containerTop;
        const rawMinutes = offsetY / PIXELS_PER_MINUTE;
        const totalMinutes = Math.max(0, Math.round(rawMinutes / 5) * 5) + OFFSET_MINUTES;
        const hour = Math.floor(totalMinutes / MINUTES_IN_HOUR) % HOURS_IN_DAY;
        const minute = totalMinutes % MINUTES_IN_HOUR;
        const start_time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
        const previewY = (totalMinutes - OFFSET_MINUTES) * PIXELS_PER_MINUTE;
        return { start_time, previewY };
    };

    const [{ isOver }, dropRef] = useDrop({
        accept: "SCHEDULE",
        hover: (item, monitor) => {
            if (!dropBodyRef.current) return;
            const clientOffset = monitor.getClientOffset();
            const sourceOffset = monitor.getSourceClientOffset();
            const bounding = dropBodyRef.current.getBoundingClientRect();
            const { previewY } = calculateTimeFromPosition(clientOffset.y, sourceOffset.y, bounding.top);
            setPreviewTop(previewY);
            setPreviewHeight((item.schedule?.stay_time ?? 60) * PIXELS_PER_MINUTE);
        },
        drop: (item, monitor) => {
            if (!dropBodyRef.current) return;
            const clientOffset = monitor.getClientOffset();
            const sourceOffset = monitor.getSourceClientOffset();
            const bounding = dropBodyRef.current.getBoundingClientRect();
            const { start_time } = calculateTimeFromPosition(clientOffset.y, sourceOffset.y, bounding.top);
            setPreviewTop(null);
            setPreviewHeight(null);
            onDrop(item.schedule, date, start_time);
        },
        collect: (monitor) => ({ isOver: monitor.isOver() }),
    });

    useEffect(() => {
        if (!isOver) {
            setPreviewTop(null);
            setPreviewHeight(null);
        }
    }, [isOver]);

    dropRef(dropBodyRef);

    return (
        <div css={S.SDayColumn}>
            <div css={S.SDayHeader}>{index + 1}일차 {date}</div>
            <div ref={dropBodyRef} css={S.SDropBody}>
                {Array.from({ length: HOURS_IN_DAY }, (_, i) => (
                    <div key={i} css={S.SHourLine} style={{ top: `${i * MINUTES_IN_HOUR * PIXELS_PER_MINUTE}px` }} />
                ))}
                {previewTop !== null && (
                    <div css={S.SDropPreview} style={{ top: `${previewTop}px`, height: `${previewHeight}px` }} />
                )}
                {children}
            </div>
        </div>
    );
}

export default DropZone;
