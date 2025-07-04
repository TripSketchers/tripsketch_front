import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { instance } from "../../../api/config/instance";
import TripCard from "../../TripCard/TripCard";
import { getDday, tripDateFormatting } from "../../../utils/DateUtils";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../Loading/Loading";
import EmptyState from "../../EmptyState/EmptyState";

function MyTrip({ filterType }) {
	const navigate = useNavigate();
	const containerRef = useRef(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20); // 한 페이지에 보여줄 여행 카드 개수

	const calculateItemsPerPage = () => {
		if (!containerRef.current) return;

		const containerWidth = containerRef.current.clientWidth;
		const containerHeight = window.innerHeight - 200; // 상단 영역 제외 등

		const cardWidth = 190 + 20; // 카드 + gap
		const cardHeight = 190 + 20;

		const cardsPerRow = Math.floor(containerWidth / cardWidth);
		const rows = Math.floor(containerHeight / cardHeight);

		const total = cardsPerRow * rows;
		setItemsPerPage(total);
	};

	// 최초 한 번 + resize 될 때마다 실행
	useEffect(() => {
		calculateItemsPerPage(); // 초기 실행

		window.addEventListener("resize", calculateItemsPerPage);
		return () =>
			window.removeEventListener("resize", calculateItemsPerPage);
	}, []);

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
		return <Loading />;

	if (getTripsQuery.data?.data.length === 0) {
		return <EmptyState message="생성한 여행이 존재하지 않습니다." />;
	}

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
			<div css={S.STripBox} ref={containerRef}>
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
