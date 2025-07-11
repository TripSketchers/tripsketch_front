import { useQuery } from "@tanstack/react-query";
import { instance } from "../api/config/instance";
import { useMemo } from "react";
import { getNday } from "../utils/DateUtils";

function useGroupedSchedule(tripId) {
    const { data, refetch, isLoading } = useQuery({
        queryKey: ["getTripSchedule", tripId],
        queryFn: async () => {
            const options = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            return await instance.get(`/trips/${tripId}/schedules`, options);
        },
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!tripId,
    });

    const groupedSchedule = useMemo(() => {
        const scheduleList = data?.data?.tripSchedulePlaceViews;
        const startDate = data?.data?.trip?.startDate;

        if (!scheduleList || !startDate) return [];

        // 날짜별로 장소를 묶기
        const map = scheduleList.reduce((acc, cur) => {
            const date = cur.date;
            if (!acc[date]) acc[date] = [];
            acc[date].push(cur);
            return acc;
        }, {});

        // 날짜 정렬 후, startDate 기준 n일차 계산
        const sortedDates = Object.keys(map).sort(); // ISO 형식이면 문자열 정렬로 OK

        return sortedDates.map((date) => ({
            dayLabel: getNday(startDate, date), // ✅ n일차 계산
            date,
            places: map[date],
        }));
    }, [data]);

    return { groupedSchedule, isLoading, refetch };
}

export default useGroupedSchedule;
