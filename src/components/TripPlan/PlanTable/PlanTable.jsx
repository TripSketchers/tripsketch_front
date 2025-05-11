import React from "react";
import { subDays, format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";

const MORNING_BOUNDARY = 360; // 새벽 6시

function splitSchedule(schedule) {
    const startTime = schedule.startTime;
    const endTime = schedule.endTime;

    if (!startTime || !endTime) return [];

    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const startTotal = sh * 60 + sm;
    const endTotal = eh * 60 + em;
    const prevDate = format(subDays(new Date(schedule.date), 1), "yyyy.MM.dd");

    const commonViewTimes = {
        viewStartTime: schedule.viewStartTime || startTime,
        viewEndTime: schedule.viewEndTime || endTime,
    };

    if (startTotal < MORNING_BOUNDARY && endTotal > MORNING_BOUNDARY) {
        return [
            {
                ...schedule,
                date: prevDate,
                endTime: "06:00:00",
                isSplit: true,
                ...commonViewTimes,
            },
            {
                ...schedule,
                startTime: "06:00:00",
                isSplit: true,
                ...commonViewTimes,
            },
        ];
    }

    if (endTotal <= MORNING_BOUNDARY) {
        return [
            { ...schedule, date: prevDate, isSplit: true, ...commonViewTimes },
        ];
    }

    return [{ ...schedule, ...commonViewTimes }];
}

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

    const handleDrop = (schedule, dropDate, dropStartTime) => {
        const duration = schedule.stayTime;
        const [h, m] = dropStartTime.split(":").map(Number);
        const startDateTime = new Date(2025, 0, 1, h, m);
        const endDateTime = new Date(
            startDateTime.getTime() + duration * 60000
        );
        const newEnd = endDateTime?.toTimeString().slice(0, 8);

        const dropStartMinutes = h * 60 + m;
        const dropEndMinutes = dropStartMinutes + duration;
        const prevDate = format(subDays(new Date(dropDate), 1), "yyyy.MM.dd");

        const updatedSchedule = {
            ...schedule,
            startTime: dropStartTime,
            endTime: newEnd,
            stayTime: duration,
            viewStartTime: schedule.viewStartTime || dropStartTime,
            viewEndTime: schedule.viewEndTime || newEnd,
        };

        if (
            dropStartMinutes < MORNING_BOUNDARY &&
            dropEndMinutes > MORNING_BOUNDARY
        ) {
            const splitSchedules = [
                {
                    ...updatedSchedule,
                    date: prevDate,
                    endTime: "06:00:00",
                    isSplit: true,
                },
                {
                    ...updatedSchedule,
                    date: dropDate,
                    startTime: "06:00:00",
                    isSplit: true,
                },
            ];
            setSchedules((prev) => [
                ...prev.filter(
                    (s) => s.tripScheduleId !== schedule.tripScheduleId
                ),
                ...splitSchedules,
            ]);
        } else {
            const targetDate =
                dropEndMinutes <= MORNING_BOUNDARY ? prevDate : dropDate;
            setSchedules((prev) =>
                prev.map((s) =>
                    s.tripScheduleId === schedule.tripScheduleId
                        ? {
                              ...updatedSchedule,
                              date: targetDate,
                              isSplit: dropEndMinutes <= MORNING_BOUNDARY,
                          }
                        : s
                )
            );
        }
    };

    return (
        <div css={S.SWrapper}>
            <div css={S.SLayout}>
                <div css={S.SContainer}>
                    {/* 시간 라벨 */}
                    <div css={S.STimeColumn}>
                        <div css={S.SStickyHeaderSpacer} />
                        {hours.map((h) => (
                            <div key={h} css={S.STimeRow}>
                                {formatHour(h)}
                            </div>
                        ))}
                    </div>

                    {/* 날짜별 일정 */}
                    {tripDates.map((date, index) => {
                        const daySchedules = schedules
                            .flatMap(splitSchedule)
                            .filter(
                                (s) =>
                                    format(new Date(s.date), "yyyy.MM.dd") ===
                                    date
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
