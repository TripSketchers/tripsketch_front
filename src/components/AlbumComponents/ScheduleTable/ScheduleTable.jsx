import React, { useEffect, useMemo, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function ScheduleTable({
    selectedPlaceId,
    setSelectedPlaceId,
    scheduleData = [],
}) {
    const groupedSchedule = useMemo(() => {
        return scheduleData
            .filter((item) => item !== null && item !== undefined)
            .reduce((acc, cur) => {
                const date = cur.date;
                if (!acc[date]) acc[date] = [];
                acc[date].push(cur);
                return acc;
            }, {});
    }, [scheduleData]);

    const dateKeys = Object.keys(groupedSchedule);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPlaces, setSelectedPlaces] = useState([]);

    // ✅ scheduleData가 바뀔 때 초기화
    useEffect(() => {
        if (dateKeys.length > 0) {
            setSelectedDate(dateKeys[0]);
            setSelectedPlaces(groupedSchedule[dateKeys[0]]);
        }
    }, [dateKeys, groupedSchedule]);

    // 날짜 클릭 시 해당하는 장소 목록 업데이트
    const handleDateClick = (date) => {
        setSelectedDate(date);
        const places = groupedSchedule?.[date] || [];
        setSelectedPlaces(places);
    };

    // 장소 클릭 시 trip_schedule_id 출력
    const handlePlaceClick = (id) => {
        setSelectedPlaceId(id);
    };

    return (
        <div css={S.STripTable}>
            {/* 날짜 목록 (가로 스크롤 가능) */}
            <div>
                <div className="title">날짜</div>
                <ul css={S.SScroll}>
                    {dateKeys.map((date, index) => (
                        <li
                            key={date}
                            css={S.SSelectSchedule(selectedDate === date)}
                            onClick={() => handleDateClick(date)}
                        >
                            {index + 1}일차
                        </li>
                    ))}
                </ul>
            </div>
            {/* 장소 목록 (세로 스크롤 가능) */}
            <div>
                <div className="title">장소</div>
                <ul css={S.SScroll}>
                    {selectedPlaces?.map((item) => (
                        <li
                            key={item.tripScheduleId}
                            css={S.SSelectSchedule(
                                item.tripScheduleId === selectedPlaceId
                            )}
                            onClick={() =>
                                handlePlaceClick(item.tripScheduleId)
                            }
                        >
                            {item.placeName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ScheduleTable;
