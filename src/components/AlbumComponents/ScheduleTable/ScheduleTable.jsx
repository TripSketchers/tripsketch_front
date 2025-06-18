import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { instance } from "../../../api/config/instance";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";

function ScheduleTable({ selectedPlaceId, setSelectedPlaceId }) {
    const { tripId } = useParams();
    const navigate = useNavigate();

    const getTripSchedule = useQuery({
        queryKey: ["getTripSchedule"],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                return await instance.get(
                    `/trips/${tripId}/schedules`,
                    options
                );
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const groupedSchedule = getTripSchedule?.data?.data?.tripSchedulePlaceViews
        .filter((item) => item !== null && item !== undefined)
        .reduce((acc, cur) => {
            const date = cur.date;
            if (!acc[date]) acc[date] = [];
            acc[date].push(cur);
            return acc;
        }, {});

    // 날짜 클릭 시 해당하는 place 목록을 1열부터 순서대로 배치
    const dateKeys = Object.keys(groupedSchedule || {});
    const [selectedDate, setSelectedDate] = useState(dateKeys[0] || ""); // 최초 선택된 날짜
    const [selectedPlaces, setSelectedPlaces] = useState(
        groupedSchedule?.[dateKeys[0]]
    );

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

    useEffect(() => {
        if (
            getTripSchedule.isFetched &&
            (!groupedSchedule || dateKeys.length === 0)
        ) {
            alert("등록된 일정이 없어요. 먼저 여행 일정을 추가해 주세요!");
            navigate(`/trip/plan/${tripId}`);
        }
    }, [
        getTripSchedule.isFetched,
        groupedSchedule,
        dateKeys,
        navigate,
        tripId,
    ]);

    if (getTripSchedule.isLoading) {
        // return <div>일정을 불러오는 중입니다...</div>;
        return <Loading />;
    }

    console.log(getTripSchedule.data?.data?.tripSchedulePlaceViews);

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
            <div>
                {/* 장소 목록 (세로 스크롤 가능) */}
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
