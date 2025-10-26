import React, { useEffect, useRef, useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";
import useScheduleDropHandler from "../../../hooks/useScheduleDropHandler";
import {
    formatHour,
    getCardPositionAndHeight,
    minutesToTime,
    timeToMinutes,
} from "../../../utils/ScheduleTimeUtils";
import { mergeSplitSchedules } from "../../../utils/ScheduleCreateUtils";
import TrashDropZone from "../TrashDropZone/TrashDropZone";
import GradientBtn from "../../GradientBtn/GradientBtn";
import { instance } from "../../../api/config/instance";
import { isEqual } from "lodash";
import TravelTimeBlock from "../TravelTimeBlock/TravelTimeBlock";
import useAutoScroll from "../../../hooks/useAutoScroll";
import SwalAlert from "../../SwalAlert/SwalAlert";

function PlanTable({ initialSchedules, showPlaceSelectPanel }) {
    const { tripInfo, schedules, setSchedules } = useTrip();
    const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);
    const [isDragging, setIsDragging] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const containerRef = useRef(null);
    useAutoScroll(isDragging, containerRef, {
        scrollThreshold: 100,
        scrollSpeed: 5,
    });

    const startDate = tripInfo?.startDate || tripInfo?.trip?.startDate;
    const endDate = tripInfo?.endDate || tripInfo?.trip?.endDate;

    const tripDates =
        startDate && endDate
            ? eachDayOfInterval({
                  start: new Date(startDate),
                  end: new Date(endDate),
              }).map((d) => format(d, "yyyy-MM-dd"))
            : [];

    const hours = [
        ...Array.from({ length: 19 }, (_, i) => i + 6),
        ...Array.from({ length: 5 }, (_, i) => i + 1),
    ];

    const onToggleLock = (id) => {
        setSchedules((prev) =>
            prev.map((sch) =>
                sch.tripScheduleId === id
                    ? { ...sch, isLocked: sch.isLocked ? 0 : 1 }
                    : sch
            )
        );
    };

    const onUpdate = (id, updates) => {
        setSchedules((prev) =>
            prev.map((item) => {
                const itemId = item.splitId ?? item.tripScheduleId;
                return itemId === id ? { ...item, ...updates } : item;
            })
        );
    };

    const renderDaySchedules = (daySchedules) => {
        const result = [];

        // 정렬 헬퍼: 시작 시간 기준 (30:00 같은 값도 timeToMinutes로 처리됨)
        const sorted = [...daySchedules].sort(
            (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
        );

        const normPoint = (node) => {
            if (!node) return null;
            const p = node.place ?? node;
            const lat =
                p.latitude ??
                p.lat ??
                p.location?.lat ??
                p.geometry?.location?.lat ??
                null;
            const lng =
                p.longitude ??
                p.lng ??
                p.location?.lng ??
                p.geometry?.location?.lng ??
                null;
            const name = p.name ?? p.placeName ?? p.title ?? "";
            return lat == null || lng == null ? null : { lat, lng, name };
        };

        const isSamePoint = (a, b) => {
            if (!a || !b) return false;
            return (
                Math.abs(a.lat - b.lat) < 1e-6 && Math.abs(a.lng - b.lng) < 1e-6
            );
        };

        const findNextChrono = (list, idx) => {
            const cur = list[idx];
            if (!cur) return null;
            const curEnd = timeToMinutes(cur.endTime);
            let best = null;
            let bestDelta = Infinity;
            for (let k = 0; k < list.length; k++) {
                if (k === idx) continue;
                const st = timeToMinutes(list[k].startTime);
                const delta = st - curEnd;
                if (delta >= 0 && delta < bestDelta) {
                    best = list[k];
                    bestDelta = delta;
                }
            }
            return best;
        };

        for (let i = 0; i < sorted.length; i++) {
            const current = sorted[i];
            result.push({ ...current, type: "schedule" });

            if (current.travelTime && current.travelTime > 0) {
                const startMin = timeToMinutes(current.endTime);
                const endMin = startMin + current.travelTime;

                const origin = normPoint(current);

                // 우선 인접 인덱스 사용하되, 없거나 좌표 누락이면 findNextChrono로 보정
                let next = sorted[i + 1];
                if (!next || !normPoint(next)) {
                    const fallback = findNextChrono(sorted, i);
                    if (fallback) next = fallback;
                }

                const destination = next ? normPoint(next) : null;

                // 목적지 없거나 origin === destination이면 travel 블록 생성하지 않음
                if (
                    !destination ||
                    !origin ||
                    isSamePoint(origin, destination)
                ) {
                    continue;
                }

                result.push({
                    id: `travel_${current.tripScheduleId}_${i}`,
                    startTime: current.endTime,
                    endTime: minutesToTime(endMin),
                    travelTime: current.travelTime,
                    type: "travel",
                    origin,
                    destination,
                });
            }
        }

        return result;
    };

    const handleSaveSchedules = async () => {
        try {
            const mergedSchedules = mergeSplitSchedules(
                schedules,
                tripInfo.tripId
            );
            await instance.post(
                `/trips/${tripInfo.tripId}/schedules`,
                mergedSchedules,
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                }
            );
            SwalAlert({
                title: "저장되었습니다!",
                icon: "success",
            });
            initialSchedules = schedules;
            setHasChanges(false);
        } catch (err) {
            console.error("🛑 저장 실패", err);
            SwalAlert({
                title: "저장에 실패했습니다.",
                text: "일정 저장에 실패했습니다. 다시 시도해주세요.",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        setHasChanges(!isEqual(initialSchedules, schedules));
    }, [schedules, initialSchedules]);

    return (
        <div css={S.SWrapper} ref={containerRef}>
            <div css={S.SLayout}>
                <div css={S.SContainer}>
                    <div css={S.STimeColumn}>
                        <div css={S.SStickyHeaderSpacer} />
                        {hours.map((h) => (
                            <div key={h} css={S.STimeRow}>
                                {formatHour(h)}
                            </div>
                        ))}
                    </div>
                    {tripDates.map((date, index) => {
                        const daySchedules = schedules.filter((s) => {
                            try {
                                return s.date === date;
                            } catch {
                                return false;
                            }
                        });

                        return (
                            <DropZone
                                key={date}
                                date={date}
                                index={index}
                                onDrop={handleDrop}
                            >
                                {renderDaySchedules(daySchedules).map(
                                    (item, i) => {
                                        if (item.type === "schedule") {
                                            return (
                                                <ScheduleCard
                                                    key={`${item.tripScheduleId}_${item.startTime}_${i}`}
                                                    schedule={item}
                                                    onToggleLock={onToggleLock}
                                                    onUpdate={onUpdate}
                                                    setIsDragging={
                                                        setIsDragging
                                                    }
                                                    showPlaceSelectPanel={
                                                        showPlaceSelectPanel
                                                    }
                                                />
                                            );
                                        }
                                        if (item.type === "travel") {
                                            const {
                                                top: topPx,
                                                height: heightPx,
                                            } = getCardPositionAndHeight(
                                                item.startTime,
                                                item.endTime
                                            );
                                            return (
                                                <TravelTimeBlock
                                                    topPx={topPx}
                                                    heightPx={heightPx}
                                                    key={item.id}
                                                    item={item}
                                                    transportType={
                                                        tripInfo.transportType
                                                    }
                                                />
                                            );
                                        }
                                        return null;
                                    }
                                )}
                            </DropZone>
                        );
                    })}
                </div>
            </div>
            <div css={S.STrashDropZone}>
                {isDragging ? (
                    <TrashDropZone />
                ) : hasChanges ? (
                    <GradientBtn
                        onClick={handleSaveSchedules}
                        text={"바뀐 계획 저장하기"}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default PlanTable;
