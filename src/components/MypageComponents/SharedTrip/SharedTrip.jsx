import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/config/instance";
import TripCard from "../../TripCard/TripCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { getDday, tripDateFormatting } from "../../../utils/DateUtils";

function SharedTrip({ filterType }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // 한 페이지에 보여줄 여행 카드 개수

    const getTripInvitations = useQuery({
        queryKey: ["getTripInvitations"],
        queryFn: async () => {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            return await instance.get(`/account/invitations`, option);
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    console.log(getTripInvitations.data?.data?.tripList);

    if (
        getTripInvitations.isLoading ||
        !getTripInvitations.data?.data?.tripList
    )
        return <div>로딩 중...</div>;

    const tripList = getTripInvitations.data.data.tripList;

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
                        onDeleteSuccess={() => getTripInvitations.refetch()}
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

export default SharedTrip;
