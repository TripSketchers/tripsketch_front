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
    const { tripInfo, schedules, setSchedules, storedAccommodations } = useTrip();
    const { handleDrop } = useScheduleDropHandler(schedules, setSchedules);

    const startDate = tripInfo?.startDate || tripInfo?.trip?.startDate;
    const endDate = tripInfo?.endDate || tripInfo?.trip?.endDate;

    const tripDates = startDate && endDate
        ? eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) })
              .map((d) => format(d, "yyyy-MM-dd")) // ← 하이픈(-)으로!
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

                        // 날짜별 숙소 정보 가져오기
                        const place = storedAccommodations?.[date];

                        // 숙소를 Schedule 형식으로 변환
                        let accommodationSchedule = null;
                        if (place) {
                            accommodationSchedule = {
                                tripScheduleId: null,
                                tripId: tripInfo?.tripId ?? null,
                                placeStoreId: place.placeId ?? null,
                                date: date,
                                startTime: "23:00:00", // 숙소 입실 시간
                                endTime: "30:00:00",   // 숙소 퇴실 시간(다음날)
                                stayTime: 420,
                                travelTime: null,
                                position: null,
                                isLocked: 0,
                                place: place,
                                isAccommodation: true,
                            };
                        }              

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
                                {/* 숙소가 있으면 마지막에 추가 */}
                                {accommodationSchedule && (
                                    <ScheduleCard
                                        key={`accommodation_${place.googlePlaceId || place.placeId}_${date}`}
                                        schedule={accommodationSchedule}
                                        isAccommodation
                                    />
                                )}
                            </DropZone>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlanTable;
