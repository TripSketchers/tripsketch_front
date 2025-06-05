import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { instance } from "../../../api/config/instance";
import TripCard from "../../TripCard/TripCard";
import { getDday, tripDateFormatting } from "../../../utils/DateUtils";
import Pagination from "../../Pagination/Pagination";

function MyTrip({ filterType }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // 한 페이지에 보여줄 여행 카드 개수

    const getTripsQuery = useQuery({
        queryKey: ["getTripsByUserId"],
        queryFn: async () => {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            return await instance.get("/account/trips", option);
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    if (getTripsQuery.isLoading || !getTripsQuery.data?.data)
        return <div>로딩 중...</div>;

    const tripList = getTripsQuery.data.data;

    // 필터링된 여행
    const today = new Date();
    const filteredTrips = tripList.filter((trip) => {
        const endDate = new Date(trip.endDate);

        if (filterType === "upcoming") return endDate >= today;
        if (filterType === "past") return endDate < today;
        return true; // all
    });

    // 페이징 계산 (filteredTrips 기준으로!)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTrips = filteredTrips.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div css={S.STripBox}>
                {currentTrips?.map((trip) => (
                    <TripCard
                        onClick={() => {
                            navigate(`/trip/plan/${trip.tripId}`);
                        }}
                        key={trip.tripId}
                        tripId={trip.tripId}
                        dDay={getDday(trip.startDate)}
                        title={trip.title}
                        location={trip.tripDestinationKoName}
                        dateRange={tripDateFormatting(
                            trip.startDate,
                            trip.endDate
                        )}
                        onDeleteSuccess={() => getTripsQuery.refetch()}
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            {filteredTrips.length > itemsPerPage && (
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredTrips.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(newPage) => setCurrentPage(newPage)}
                    />
                </div>
            )}
        </>
    );
}

export default MyTrip;
