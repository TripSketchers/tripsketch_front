import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useQuery } from "@tanstack/react-query";
import TripCard from "../../components/TripCard/TripCard";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import { instance } from "../../api/config/instance";
import { format, differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";

function MyPage() {
	const navigate = useNavigate();
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

	useEffect(() => {
		getTripsQuery.refetch();
	}, []);

	if (getTripsQuery.isLoading || !getTripsQuery.data?.data?.tripList)
		return <div>로딩 중...</div>;

	const tripList = getTripsQuery.data.data.tripList;

	// D-Day 계산
	const calculateDDay = (startDate) => {
		const today = new Date();
		const start = new Date(startDate);
		const diff = differenceInDays(start, today);
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
					<div css={S.STitleBox}>
						<h1>나의 여행</h1>
					</div>
					<div css={S.STripBox}>
						{tripList.map((trip) => (
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
				</div>
			</div>
		</div>
	);
}

export default MyPage;
