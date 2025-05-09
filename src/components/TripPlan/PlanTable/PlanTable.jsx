import React, { useState } from "react";
import { addDays, subDays, format } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";

const MORNING_BOUNDARY = 360; // 새벽 6시 기준 (분 단위)

// 일정 분할 (새벽 6시 전후)
function splitSchedule(schedule) {
    const [sh, sm] = schedule.start_time.split(":").map(Number);
    const [eh, em] = schedule.end_time.split(":").map(Number);
    const startTotal = sh * 60 + sm;
    const endTotal = eh * 60 + em;
    const prevDate = format(subDays(new Date(schedule.date), 1), "yyyy.MM.dd");

    if (startTotal < MORNING_BOUNDARY && endTotal > MORNING_BOUNDARY) {
        return [
            { ...schedule, date: prevDate, end_time: "06:00:00", view_start_time: schedule.start_time, view_end_time: schedule.end_time, is_split: true },
            { ...schedule, start_time: "06:00:00", view_start_time: schedule.start_time, view_end_time: schedule.end_time, is_split: true },
        ];
    }

    if (endTotal <= MORNING_BOUNDARY) {
        return [{ ...schedule, date: prevDate, view_start_time: schedule.start_time, view_end_time: schedule.end_time, is_split: true }];
    }

    return [schedule];
}

function PlanTable() {
    const [schedules, setSchedules] = useState([
        { trip_schedule_id: "sch1", place_store_id: 101, start_time: "07:30:00", end_time: "08:50:00", stay_time: 80, travel_time: 10, is_locked: 1, date: "2025.04.25", label: "조식" },
        { trip_schedule_id: "sch2", place_store_id: 102, start_time: "12:00:00", end_time: "14:00:00", stay_time: 120, travel_time: 5, is_locked: 0, date: "2025.04.25", label: "돼지국밥" },
        { trip_schedule_id: "sch3", place_store_id: 103, start_time: "13:10:00", end_time: "14:10:00", stay_time: 60, travel_time: null, is_locked: 0, date: "2025.04.26", label: "광안리 해수욕장" },
        { trip_schedule_id: "sch4", place_store_id: 103, start_time: "09:50:00", end_time: "10:00:00", stay_time: 10, travel_time: null, is_locked: 0, date: "2025.04.26", label: "44444444444444444444444" },
        { trip_schedule_id: "sch5", place_store_id: 103, start_time: "04:00:00", end_time: "08:00:00", stay_time: 240, travel_time: null, is_locked: 0, date: "2025.04.26", label: "55555555555555555555" },
    ]);

    const dates = ["2025.04.25", "2025.04.26", "2025.04.27"];

    // 🔧 일정 잠금/해제 처리
    const toggleLock = (id) => {
        setSchedules((prev) =>
            prev.map((sch) =>
                sch.trip_schedule_id === id ? { ...sch, is_locked: sch.is_locked ? 0 : 1 } : sch
            )
        );
    };

    // 🔧 일정 업데이트 처리
    const updateSchedule = (id, updates) => {
        setSchedules((prev) =>
            prev.map((item) =>
                item.trip_schedule_id === id ? { ...item, ...updates } : item
            )
        );
    };

    // 📦 드롭 이벤트 처리
    const handleDrop = (schedule, dropDate, dropStartTime) => {
        const duration = schedule.stay_time;
        const [h, m] = dropStartTime.split(":").map(Number);
        const startDate = new Date(2025, 0, 1, h, m);
        const endDate = new Date(startDate.getTime() + duration * 60000);
        const newEnd = endDate.toTimeString().slice(0, 8);

        const dropStartMinutes = h * 60 + m;
        const dropEndMinutes = dropStartMinutes + duration;
        const prevDate = format(subDays(new Date(dropDate), 1), "yyyy.MM.dd");

        const updatedSchedule = {
            ...schedule,
            start_time: dropStartTime,
            end_time: newEnd,
            view_start_time: dropStartTime,
            view_end_time: newEnd,
            stay_time: duration,
        };

        if (dropStartMinutes < MORNING_BOUNDARY && dropEndMinutes > MORNING_BOUNDARY) {
            const splitSchedules = [
                { ...updatedSchedule, date: prevDate, end_time: "06:00:00", is_split: true },
                { ...updatedSchedule, date: dropDate, start_time: "06:00:00", is_split: true },
            ];
            setSchedules((prev) => [...prev.filter((s) => s.trip_schedule_id !== schedule.trip_schedule_id), ...splitSchedules]);
        } else {
            const targetDate = dropEndMinutes <= MORNING_BOUNDARY ? prevDate : dropDate;
            setSchedules((prev) =>
                prev.map((s) =>
                    s.trip_schedule_id === schedule.trip_schedule_id
                        ? { ...updatedSchedule, date: targetDate, is_split: dropEndMinutes <= MORNING_BOUNDARY }
                        : s
                )
            );
        }
    };

    // ⏰ 시간 라벨 생성
    const hours = [...Array.from({ length: 19 }, (_, i) => i + 6), ...Array.from({ length: 5 }, (_, i) => i + 1)];
    const formatHour = (h) => `${(h <= 24 ? h : h % 24).toString().padStart(2, "0")}:00`;

    return (
        <div css={S.SWrapper}>
            <div css={S.SLayout}>
                <div css={S.SContainer}>
                    {/* 시간 라벨 컬럼 */}
                    <div css={S.STimeColumn}>
                        <div css={S.SStickyHeaderSpacer} />
                        {hours.map((h) => (
                            <div key={h} css={S.STimeRow}>
                                {formatHour(h)}
                            </div>
                        ))}
                    </div>

                    {/* 날짜별 일정 렌더링 */}
                    {dates.map((date, index) => {
                        const daySchedules = schedules.flatMap(splitSchedule).filter((s) => s.date === date);
                        return (
                            <DropZone key={date} date={date} index={index} onDrop={handleDrop}>
                                {daySchedules.map((s, i) => (
                                    <ScheduleCard
                                        key={`${s.trip_schedule_id}_${s.start_time}_${i}`}
                                        schedule={s}
                                        onToggleLock={toggleLock}
                                        onUpdate={updateSchedule}
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
