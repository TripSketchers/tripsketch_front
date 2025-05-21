import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useQuery } from "@tanstack/react-query";
import TripCard from "../../components/TripCard/TripCard";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import { instance } from "../../api/config/instance";
import { format, differenceInDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

function MyPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;	// 한 페이지에 보여줄 여행 카드 개수

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

    if (getTripsQuery.isLoading || !getTripsQuery.data?.data?.tripList)
        return <div>로딩 중...</div>;

    const tripList = getTripsQuery.data.data.tripList;

    // 페이징 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTrips = tripList.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // 페이지 이동 시 스크롤 맨 위로
    };

    // D-Day 계산
    const calculateDDay = (startDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const diff = differenceInDays(start, today) + 1;
        if (diff === 0) return "D - Day";
        if (diff > 0) return `D - ${diff}`;
        return `D + ${Math.abs(diff)}`;
    };

    // 날짜 포맷
    const formatDate = (date) => format(new Date(date), "yyyy/MM/dd");

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <ProfileContainer isMyPage={true} />
                <div css={S.STripContainer}>
                    <div css={S.SHeader}>
                        <div css={S.STitleBox}>
                            <h1>나의 여행</h1>
                        </div>
                        <Link to={"/trip/create"}>여행 생성</Link>
                    </div>
                    <div css={S.STripBox}>
                        {currentTrips.map((trip) => (
                            <TripCard
                                onClick={() => {
                                    navigate(`/trip/plan/${trip.tripId}`);
                                }}
                                key={trip.tripId}
                                tripId={trip.tripId}
                                dDay={calculateDDay(trip.startDate)}
                                title={trip.title}
                                location={trip.tripDestinationKoName}
                                dateRange={`${formatDate(
                                    trip.startDate
                                )} - ${formatDate(trip.endDate)}`}
                                onDeleteSuccess={() => getTripsQuery.refetch()}
                            />
                        ))}
                    </div>
                    {/* 페이지네이션 */}
                    {tripList.length > itemsPerPage && (
                        <div style={{ marginTop: "30px", textAlign: "center" }}>
                            <Pagination
                                currentPage={currentPage}
                                totalItems={tripList.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={(newPage) => setCurrentPage(newPage)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyPage;
