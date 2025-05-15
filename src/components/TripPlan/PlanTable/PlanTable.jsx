import React from "react";
import { format, eachDayOfInterval } from "date-fns";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import DropZone from "../DropZone/DropZone";
import { useTrip } from "../../Routes/TripContext";
import useScheduleDropHandler from "../../../hooks/useScheduleDropHandler";
import { formatHour } from "../../../utils/scheduleUtils";

function PlanTable() {
    const { tripInfo, schedules, setSchedules } = useTrip();
    const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);

    const startDate = tripInfo?.startDate || tripInfo?.trip?.startDate;
    const endDate = tripInfo?.endDate || tripInfo?.trip?.endDate;

    const tripDates = startDate && endDate
        ? eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) })
              .map((d) => format(d, "yyyy.MM.dd"))
        : [];

    const hours = [...Array.from({ length: 19 }, (_, i) => i + 6), ...Array.from({ length: 5 }, (_, i) => i + 1)];

    // ✅ 일정 잠금/해제 토글 핸들러
    const onToggleLock = (id) => {
        setSchedules((prev) =>
            prev.map((sch) =>
                sch.tripScheduleId === id ? { ...sch, isLocked: sch.isLocked ? 0 : 1 } : sch
            )
        );
    };

    // ✅ 일정 업데이트 핸들러
    const onUpdate = (id, updates) => {
        setSchedules((prev) =>
            prev.map((item) =>
                item.tripScheduleId === id ? { ...item, ...updates } : item
            )
        );
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
                            (s) => format(new Date(s.date), "yyyy.MM.dd") === date
                        );
                        return (
                            <DropZone key={date} date={date} index={index} onDrop={handleDrop}>
                                {daySchedules.map((s, i) => (
                                    <ScheduleCard
                                        key={`${s.tripScheduleId}_${s.startTime}_${i}`}
                                        schedule={s}
                                        onToggleLock={onToggleLock}
                                        onUpdate={onUpdate}
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
