// PlanTable.jsx (Fixed for 새 일정 드롭 위치 계산)
import React from "react";
import { subDays, format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";

const MORNING_BOUNDARY = 360; // 새벽 6시 경계 (분)
const PIXELS_PER_MINUTE = 1; // 1px = 1분

function PlanTable() {
    const { tripInfo, schedules, setSchedules } = useTrip();

    const startDate = tripInfo?.startDate || tripInfo?.trip?.startDate;
    const endDate = tripInfo?.endDate || tripInfo?.trip?.endDate;

    const tripDates =
        startDate && endDate
            ? eachDayOfInterval({
                  start: new Date(startDate),
                  end: new Date(endDate),
              }).map((d) => format(d, "yyyy.MM.dd"))
            : [];

    const hours = [
        ...Array.from({ length: 19 }, (_, i) => i + 6),
        ...Array.from({ length: 5 }, (_, i) => i + 1),
    ];
    const formatHour = (h) =>
        `${(h <= 24 ? h : h % 24).toString().padStart(2, "0")}:00`;

    const handleDrop = (droppedItem, dropDate, startTime, dropZoneRef) => {
        console.log("🚀 [드롭 시작]");
        console.log("📅 드롭 날짜:", dropDate);
        console.log("📦 드롭 아이템:", droppedItem);
        console.log("🕒 미리보기 위치 기반 시작 시간:", startTime);

        const daySchedules = schedules.filter(
            (s) => format(new Date(s.date), "yyyy.MM.dd") === dropDate
        );

        const dropStartMinutes = parseTime(startTime);
        const dropDuration = droppedItem.stayTime || 120;
        const dropEndMinutes = dropStartMinutes + dropDuration;

        let adjustedStartTime = startTime;

        // 겹치는 일정이 있는지 확인
        const hasOverlap = daySchedules.some((s) => {
            if (s.tripScheduleId === droppedItem.tripScheduleId) return false;
            const sStart = parseTime(s.startTime);
            const sEnd = parseTime(s.endTime);
            return dropStartMinutes < sEnd && dropEndMinutes > sStart;
        });

        if (hasOverlap) {
            console.log("⚠️ 겹치는 일정 존재 → 아래로 빈 시간 탐색");
            const sorted = [...daySchedules]
                .filter((s) => s.tripScheduleId !== droppedItem.tripScheduleId)
                .sort(
                    (a, b) => parseTime(a.startTime) - parseTime(b.startTime)
                );

            for (let i = 0; i <= sorted.length; i++) {
                const prevEnd =
                    i === 0 ? 360 : parseTime(sorted[i - 1].endTime);
                const nextStart =
                    i === sorted.length
                        ? 1440
                        : parseTime(sorted[i]?.startTime);

                if (
                    nextStart - prevEnd >= dropDuration &&
                    prevEnd >= dropStartMinutes
                ) {
                    adjustedStartTime = minutesToTime(prevEnd);
                    console.log("📌 빈 시간 슬롯 발견:", adjustedStartTime);
                    break;
                }
            }
        } else {
            console.log(
                "✅ 겹치는 일정 없음 → 그대로 배치:",
                adjustedStartTime
            );
        }

        if (!droppedItem.tripScheduleId) {
            createAndAddSchedule(
                droppedItem,
                dropDate,
                adjustedStartTime,
                dropDuration
            );
            console.log("🆕 새 일정 추가 완료");
        } else {
            splitAndSetSchedule(
                droppedItem,
                dropDate,
                adjustedStartTime,
                dropDuration
            );
            console.log("✂️ 기존 일정 이동 완료");
        }

        console.log("🏁 [드롭 종료]");
    };

    const createAndAddSchedule = (place, dropDate, dropStartTime, stayTime) => {
        const generateSchedule = (date, startTime, endTime) => ({
            tripScheduleId: place.tripScheduleId || Date.now() + Math.random(),
            placeId: place.id || place.placeId,
            date,
            startTime,
            stayTime,
            endTime,
            isLocked: 0,
            isSplit: false,
            viewStartTime: startTime,
            viewEndTime: endTime,
            place: { ...place },
        });

        const splitSchedules = [
            generateSchedule(
                dropDate,
                dropStartTime,
                minutesToTime(parseTime(dropStartTime) + stayTime)
            ),
        ];

        setSchedules((prev) => [...prev, ...splitSchedules]);
    };

    const splitAndSetSchedule = (
        schedule,
        dropDate,
        dropStartTime,
        duration
    ) => {
        const generateSchedule = (date, startTime, endTime) => ({
            ...schedule,
            date,
            startTime,
            stayTime: duration,
            endTime,
            viewStartTime: startTime,
            viewEndTime: endTime,
        });

        const splitSchedules = [
            generateSchedule(
                dropDate,
                dropStartTime,
                minutesToTime(parseTime(dropStartTime) + duration)
            ),
        ];

        setSchedules((prev) => [
            ...prev.filter((s) => s.tripScheduleId !== schedule.tripScheduleId),
            ...splitSchedules,
        ]);
    };

    const parseTime = (timeStr) => {
        if (!timeStr || typeof timeStr !== "string") {
            console.warn("❗ 잘못된 시간 값:", timeStr);
            return 0;
        }
        const [h, m] = timeStr.split(":").map(Number);
        return h * 60 + m;
    };

    const minutesToTime = (totalMinutes) => {
        const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(
            2,
            "0"
        );
        const minutes = String(totalMinutes % 60).padStart(2, "0");
        return `${hours}:${minutes}:00`;
    };

    return (
        <div css={S.SWrapper}>
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
                        const daySchedules = schedules.filter(
                            (s) =>
                                format(new Date(s.date), "yyyy.MM.dd") === date
                        );
                        return (
                            <DropZone
                                key={date}
                                date={date}
                                index={index}
                                onDrop={handleDrop}
                            >
                                {daySchedules.map((s, i) => (
                                    <ScheduleCard
                                        key={`${s.tripScheduleId}_${s.startTime}_${i}`}
                                        schedule={s}
                                        onToggleLock={(id) => {
                                            setSchedules((prev) =>
                                                prev.map((sch) =>
                                                    sch.tripScheduleId === id
                                                        ? {
                                                              ...sch,
                                                              isLocked:
                                                                  sch.isLocked
                                                                      ? 0
                                                                      : 1,
                                                          }
                                                        : sch
                                                )
                                            );
                                        }}
                                        onUpdate={(id, updates) => {
                                            setSchedules((prev) =>
                                                prev.map((item) =>
                                                    item.tripScheduleId === id
                                                        ? {
                                                              ...item,
                                                              ...updates,
                                                          }
                                                        : item
                                                )
                                            );
                                        }}
                                    />
                                ))}
                            </DropZone>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlanTable;
