import React, { useEffect, useState } from "react";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../components/StoredPlacePanel/StoredPlacePanel";
import PlaceSelectPanel from "../../components/PlaceSelectPanel/PlaceSelectPanel";
import Map from "../../components/TripCreate/Map/Map";
import PlanTable from "../../components/TripPlan/PlanTable/PlanTable";
import PlanHeader from "../../components/TripPlan/PlanHeader/PlanHeader";
import Split from "react-split";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { instance } from "../../api/config/instance";
import { useTrip } from "../../components/Routes/TripContext";
import PlaceDetailModal from "../../components/PlaceDetailModal/PlaceDetailModal";
import { convertArrayToAccommodationMap } from "../../utils/StoredAccommdationsUtils";
import {
	mergeSplitSchedules,
	splitAndSetSchedule,
} from "../../utils/ScheduleCreateUtils";
import { eachDayOfInterval, format } from "date-fns";
import { timeToMinutes } from "../../utils/ScheduleTimeUtils";
import { calculateAllTravelTimes } from "../../utils/ScheduleTravelUtils";
import { adjustScheduleTimes } from "../../utils/ScheduleOverlapUtils";

function TripPlan() {
	const [isStoredPanelOpen, setIsStoredPanelOpen] = useState(true);
	const [showPlaceSelectPanel, setShowPlaceSelectPanel] = useState(false);
	const toggleStoredPanel = () => setIsStoredPanelOpen(!isStoredPanelOpen);
	const categories = ["명소", "맛집", "카페", "숙소"];
	const [initialSchedules, setInitialSchedules] = useState([]);

	const { tripId } = useParams(); // URL에서 tripId 가져오기
	const {
		setTripInfo,
		storedPlaces,
		setStoredPlaces,
		setStoredAccommodations,
		setSchedules,
		setTripDestination,
	} = useTrip();

    const fetchTripInfo = async () => {
        try {
            const res = await instance.get(`/trips/${tripId}`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });

            const data = res.data;
            setTripInfo(data.trip);
            setTripDestination(data.tripDestination);
            setStoredPlaces(data.storedPlaces);
            const accommodationMap = convertArrayToAccommodationMap(
                data.storedAccommodations
            );
            setStoredAccommodations(accommodationMap);

            const updatedSchedules = [];
            data.tripSchedules.forEach((schedule) => {
                const result = splitAndSetSchedule(
                    schedule,
                    schedule.date,
                    schedule.startTime,
                    schedule.endTime
                );
                updatedSchedules.push(...result);
            });

            const tripDates =
                data.trip.startDate && data.trip.endDate
                    ? eachDayOfInterval({
                            start: new Date(data.trip.startDate),
                            end: new Date(data.trip.endDate),
                      }).map((d) => format(d, "yyyy-MM-dd"))
                    : [];

            tripDates?.forEach((date) => {
                const accommodation = accommodationMap[date];

                const hasAccommodationSchedule = updatedSchedules.some(
                    (s) => {
                        if (!s.isAccommodation || !s.place) return false;
                        if (
                            s.place.googlePlaceId !==
                            accommodation?.googlePlaceId
                        )
                            return false;

                        const sStart = timeToMinutes(s.startTime);
                        const sEnd = timeToMinutes(s.endTime);

                        // ✅ 그 날짜의 "밤" (23:00 ~ 06:00 다음날) 일정이 있는지 확인
                        return (
                            s.date === date &&
                            (sStart >= 1380 || sEnd > 1440) // 23:00 이후 또는 "32:00" 같은 경우
                        );
                    }
                );

                if (accommodation && !hasAccommodationSchedule) {
                    const result = splitAndSetSchedule(
                        {
                            tripScheduleId: `accommodation_${date}`,
                            tripId: data.trip.tripId,
                            date,
                            startTime: "23:00",
                            endTime: "32:00",
                            stayTime: 540,
                            travelTime: 0,
                            position: null,
                            isLocked: 0,
                            place: accommodation,
                            isAccommodation: 1,
                            viewStartTime: "23:00",
                            viewEndTime: "32:00",
                        },
                        date,
                        "23:00",
                        "32:00"
                    );
                    updatedSchedules.push(...result);
                }
            });

            // 🚨 transportType이 바뀐 경우에만 travelTime 계산
            const currentTransportType = parseInt(
                localStorage.getItem("transportType") ?? "1"
            ); // default: 1
            const lastUsedTransportType = parseInt(
                localStorage.getItem("lastUsedTransportType") ?? "-1"
            );

            if (currentTransportType !== lastUsedTransportType) {
                console.log(
                    "🚗 교통 수단 변경 감지 → travelTime 재계산 실행"
                );
                const travelSchedules = await calculateAllTravelTimes(
                    updatedSchedules,
                    currentTransportType
                );
                const adjustedSchedules =
                    adjustScheduleTimes(travelSchedules);

                setSchedules(adjustedSchedules);
                setInitialSchedules(adjustedSchedules);

                localStorage.setItem(
                    "lastUsedTransportType",
                    currentTransportType
                );

                try {
                    const mergedSchedules = mergeSplitSchedules(
                        adjustedSchedules,
                        data.trip.tripId
                    );
                    await instance.post(
                        `/trips/${tripId}/schedules`,
                        mergedSchedules,
                        {
                            headers: {
                                Authorization:
                                    localStorage.getItem("accessToken"),
                            },
                        }
                    );
                } catch (err) {
                    console.error("🛑 travelTime 일정 저장 실패", err);
                }
            } else {
                setSchedules(updatedSchedules);
                setInitialSchedules(updatedSchedules);
            }
        } catch (err) {
            console.error("여행 정보를 불러오는 데 실패했습니다.", err);
        }
    };

	const handleSaveStoredPlaces = async () => {
		const formattedPlaces = storedPlaces.map((place) => ({
			place: {
				googlePlaceId: place.googlePlaceId || place.id, // ID 통일 처리
				name: place.name || place.displayName?.text,
				address: place.address || place.formattedAddress,
				latitude: place.latitude || place.location?.latitude,
				longitude: place.longitude || place.location?.longitude,
				category: place.category,
				rating: place.rating,
				photoReference: place.photoReference || place.photos?.[0]?.name,
			},
		}));

		await instance.post(
			`/trips/${tripId}/places`,
			{ storedPlaces: formattedPlaces },
			{
				headers: {
					Authorization: localStorage.getItem("accessToken"),
				},
			}
		);

		// 저장 후 최신 데이터 다시 불러오기
		await fetchTripInfo();
	};

	useEffect(() => {
		fetchTripInfo();
	}, []);

	return (
		<NavLayout>
			<div css={S.SLayout}>
				<Split
					sizes={[60, 40]}
					minSize={[100, 0]}
					gutterSize={8}
					direction="horizontal"
					className="split"
				>
					<div css={S.SContainer(isStoredPanelOpen)}>
						<PlanHeader />
						<div css={S.SBox}>
							<div
								css={S.SStoredPanel(
									isStoredPanelOpen,
									showPlaceSelectPanel
								)}
							>
								{isStoredPanelOpen && (
									<>
										{showPlaceSelectPanel && (
											<>
												<PlaceSelectPanel
													text={"계획"}
													categories={categories}
												/>
												<PlaceDetailModal />
											</>
										)}
										<StoredPlacePanel
											text="계획"
											onAddPlaceClick={() =>
												setShowPlaceSelectPanel(
													(prev) => !prev
												)
											}
											isAddingPlace={showPlaceSelectPanel}
											onSave={handleSaveStoredPlaces}
										/>
									</>
								)}
								<button
									onClick={toggleStoredPanel}
									css={S.SToggleButton(isStoredPanelOpen)}
								>
									{isStoredPanelOpen ? (
										<FaAngleLeft />
									) : (
										<FaAngleRight />
									)}
								</button>
							</div>
							<PlanTable
								initialSchedules={initialSchedules}
								setInitialSchedules={setInitialSchedules}
								showPlaceSelectPanel={showPlaceSelectPanel}
							/>
						</div>
					</div>
					<div css={S.SMapContainer}>
						<Map selectedStep={2} />
					</div>
				</Split>
			</div>
		</NavLayout>
	);
}

export default TripPlan;
