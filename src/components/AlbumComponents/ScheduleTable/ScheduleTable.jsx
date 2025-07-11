import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function ScheduleTable({ selectedSchedule, setSelectedSchedule, scheduleData, style }) {
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    useEffect(() => {
        if (scheduleData.length > 0) {
            setSelectedDayIndex(0);
            setSelectedSchedule(scheduleData[0]?.places[0]);
        }
    }, [scheduleData, setSelectedSchedule]);

    // 날짜 클릭 시 해당하는 장소 목록 업데이트
    const handleDateClick = (index) => {
        setSelectedDayIndex(index);

        const selectedDay = scheduleData[index];
        if (selectedDay && selectedDay.places.length > 0) {
            setSelectedSchedule(selectedDay.places[0]); // 날짜 바꾸면 첫 장소 선택
        }
    };

    // 장소 클릭 시 trip_schedule_id 출력
    const handlePlaceClick = (item) => {
        setSelectedSchedule(item);
    };

    const currentDay = scheduleData[selectedDayIndex];

    return (
        <div css={S.STripTable} style={style}>
            {/* 날짜 목록 (세로 스크롤 가능) */}
            <div>
                <div className="title">날짜</div>
                <ul css={S.SScroll}>
                    {scheduleData?.map((day, idx) => (
                        <li
                            key={day.date}
                            css={S.SSelectSchedule(idx === selectedDayIndex)}
                            onClick={() => handleDateClick(idx)}
                        >
                            {day.dayLabel}
                        </li>
                    ))}
                </ul>
            </div>
            {/* 장소 목록 (세로 스크롤 가능) */}
            <div>
                <div className="title">장소</div>
                <ul css={S.SScroll}>
                    {currentDay?.places?.map((item) => (
                        <li
                            key={item.tripScheduleId}
                            css={S.SSelectSchedule(
                                item.tripScheduleId === selectedSchedule.tripScheduleId
                            )}
                            onClick={() =>
                                handlePlaceClick(item)
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
