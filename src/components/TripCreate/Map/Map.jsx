import {
	GoogleMap,
	Marker,
	useJsApiLoader,
	Polyline,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useMemo } from "react";
import { useTrip } from "../../Routes/TripContext";
import { getColorByCategory } from "../../../utils/CategoryUtils";
import { useLocation } from "react-router-dom";
import Loading from "../../Loading/Loading";
import {
	createBedMarkerIcon,
	createPinMarkerIcon,
	createPinMarkerIconWithDayAndIndex,
	dayColors,
} from "../../../utils/MapMarkerUtils";

const GOOGLE_MAP_LIBRARIES = ["places"];

function Map({ selectedStep }) {
	const {
		tripDestination,
		storedPlaces,
		storedAccommodations,
		setPlaceModalInfo,
		focusedPlace,
		setFocusedPlace,
		schedules,
		selectedDayIdx, // ✅ 일차 필터링용 state (useTrip에서 가져옴)
	} = useTrip();

	const location = useLocation();
	const { lowLat, lowLng, highLat, highLng } =
		tripDestination || location?.state || {};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
		libraries: GOOGLE_MAP_LIBRARIES,
		language: "ko",
	});

	const mapRef = useRef(null);

	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const defaultCenter = {
		lat: (lowLat + highLat) / 2,
		lng: (lowLng + highLng) / 2,
	};

	// ✅ daySchedules 생성: 날짜별로 스케줄 묶기
	const daySchedules = useMemo(() => {
		if (!Array.isArray(schedules)) return [];
		const grouped = {};
		schedules.forEach((s) => {
			if (!grouped[s.date]) grouped[s.date] = [];
			grouped[s.date].push(s);
		});
		// [{ date, schedules: [...] }, ...] 형태로 변환
		return Object.entries(grouped)
			.sort(([a], [b]) => new Date(a) - new Date(b))
			.map(([date, schedules]) => ({
				date,
				schedules: schedules.slice().sort((a, b) => {
					// startTime이 "HH:mm" 문자열일 경우
					return (a.startTime || "").localeCompare(b.startTime || "");
				}),
			}));
	}, [schedules]);

	// 📌 지도 중심 이동
	useEffect(() => {
		if (!isLoaded || !mapRef.current) return;

		// 1. focusedPlace가 있으면 해당 장소로만 panTo (마커 클릭 시)
		if (focusedPlace) {
			const lat =
				focusedPlace.location?.latitude ?? focusedPlace.latitude;
			const lng =
				focusedPlace.location?.longitude ?? focusedPlace.longitude;
			if (lat && lng) {
				mapRef.current.panTo({ lat, lng });
				mapRef.current.setZoom(16);
			}
			return;
		}

		// 2. 4단계에서 특정 일차만 선택된 경우: 해당 일차의 장소 모두 보이도록 bounds 조정
		if (
			selectedStep === 4 &&
			selectedDayIdx !== null &&
			selectedDayIdx !== undefined &&
			daySchedules[selectedDayIdx]
		) {
			const schedulesOfDay =
				daySchedules[selectedDayIdx]?.schedules || [];
			const positions = schedulesOfDay
				.map((s) =>
					s.place?.location
						? [
								s.place.location.latitude,
								s.place.location.longitude,
						  ]
						: s.place?.latitude && s.place?.longitude
						? [s.place.latitude, s.place.longitude]
						: null
				)
				.filter(Boolean);

			if (positions.length > 0) {
				const bounds = new window.google.maps.LatLngBounds();
				positions.forEach(([lat, lng]) => bounds.extend({ lat, lng }));
				mapRef.current.fitBounds(bounds, 100);
				return;
			}
		}

		// 3. 4단계에서 selectedDayIdx == null(전체 보기)면 전체 스케줄 장소 모두 보이도록 bounds 조정
		if (
			selectedStep === 4 &&
			(selectedDayIdx === null || selectedDayIdx === undefined) &&
			daySchedules.length > 0
		) {
			// 모든 스케줄의 장소 좌표 수집
			const positions = daySchedules.flatMap((day) =>
				day.schedules
					.map((s) =>
						s.place?.location
							? [
									s.place.location.latitude,
									s.place.location.longitude,
							  ]
							: s.place?.latitude && s.place?.longitude
							? [s.place.latitude, s.place.longitude]
							: null
					)
					.filter(Boolean)
			);

			if (positions.length > 0) {
				const bounds = new window.google.maps.LatLngBounds();
				positions.forEach(([lat, lng]) => bounds.extend({ lat, lng }));
				mapRef.current.fitBounds(bounds, 100);
				return;
			}
		}

		// 4. 기존 로직: 마지막 장소로 panTo
		const places =
			selectedStep === 2
				? storedPlaces
				: Object.values(storedAccommodations);

		if (!mapRef.current) return;

		const targetPlace = places.at(-1);
		if (!targetPlace?.location && !targetPlace?.latitude) return;

		const { latitude, longitude } = targetPlace.location || targetPlace;
		mapRef.current.panTo({ lat: latitude, lng: longitude });
		mapRef.current.setZoom(13);
	}, [
		isLoaded,
		selectedStep,
		tripDestination,
		storedPlaces,
		storedAccommodations,
		focusedPlace,
		selectedDayIdx,
		daySchedules,
	]);

	// ✅ 아직 로딩 중이면 표시
	if (
		!isLoaded ||
		!window.google?.maps ||
		!lowLat ||
		!lowLng ||
		!highLat ||
		!highLng
	) {
		return <Loading content={"지도 정보 불러오는 중..."} />;
	}

	// ✅ 4단계에서 일차별 마커 필터링
	let filteredDaySchedules = daySchedules;
	if (
		selectedStep === 4 &&
		selectedDayIdx !== null &&
		selectedDayIdx !== undefined
	) {
		filteredDaySchedules = [daySchedules[selectedDayIdx]].filter(Boolean);
	}

	// ✅ 4단계에서 schedules에 없는 focusedPlace가 들어온 경우 마커 표시
	const isFocusedPlaceInSchedules =
		selectedStep === 4 &&
		focusedPlace &&
		!schedules.some(
			(s) =>
				(s.place?.googlePlaceId || s.place?.id) ===
				(focusedPlace.googlePlaceId || focusedPlace.id)
		);

	// ✅ 4단계에서 선택된 일차의 마커 좌표 배열 구하기 (점선용)
	let polylinePath = [];
	if (
		selectedStep === 4 &&
		selectedDayIdx !== null &&
		selectedDayIdx !== undefined &&
		daySchedules[selectedDayIdx]
	) {
		polylinePath = daySchedules[selectedDayIdx].schedules
			.map((schedule) => {
				const lat =
					schedule.place?.location?.latitude ||
					schedule.place?.latitude;
				const lng =
					schedule.place?.location?.longitude ||
					schedule.place?.longitude;
				if (lat && lng) return { lat, lng };
				return null;
			})
			.filter(Boolean);
	}

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			defaultCenter={defaultCenter}
			zoom={13}
			onLoad={(map) => {
				mapRef.current = map;
				map.panTo(defaultCenter);
			}}
		>
			{/* ✅ 선택된 일차가 있을 때 점선 Polyline 표시 */}
			{polylinePath.length > 1 && (
				<Polyline
					path={polylinePath}
					options={{
						strokeColor: "#6c6c6c",
						strokeOpacity: 1,
						strokeWeight: 0,
						icons: [
							{
								icon: {
									path: "M 0,-1 0,1",
									strokeOpacity: 1,
									scale: 3,
								},
								offset: "0",
								repeat: "16px",
							},
						],
						geodesic: true,
					}}
				/>
			)}

			{selectedStep === 2 &&
				storedPlaces.map((place, idx) => (
					<Marker
						key={idx}
						position={{
							lat: place?.location?.latitude || place?.latitude,
							lng: place?.location?.longitude || place?.longitude,
						}}
						icon={createPinMarkerIcon(
							idx + 1,
							getColorByCategory(place.category)
						)}
						onClick={() => {
							setPlaceModalInfo(place);
							setFocusedPlace(place);
						}}
					/>
				))}

			{selectedStep === 3 &&
				Object.values(storedAccommodations).map((place, idx) => (
					<Marker
						key={idx}
						position={{
							lat: place?.location?.latitude || place?.latitude,
							lng: place?.location?.longitude || place?.longitude,
						}}
						icon={createBedMarkerIcon(
							getColorByCategory(place.category)
						)}
						onClick={() => {
							setPlaceModalInfo(place);
							setFocusedPlace(place);
						}}
					/>
				))}

			{selectedStep === 4 &&
				filteredDaySchedules &&
				filteredDaySchedules.flatMap((day, dayIdx) =>
					day.schedules.map((schedule, idx) => {
						const markerColor =
							dayColors[
								(selectedDayIdx ?? dayIdx) % dayColors.length
							];
						return (
							<Marker
								key={`${day.date}-${
									schedule.tripScheduleId || idx
								}`}
								position={{
									lat:
										schedule.place?.location?.latitude ||
										schedule.place?.latitude,
									lng:
										schedule.place?.location?.longitude ||
										schedule.place?.longitude,
								}}
								icon={
									schedule.isAccommodation
										? createBedMarkerIcon(markerColor)
										: createPinMarkerIconWithDayAndIndex(
												(selectedDayIdx ?? dayIdx) + 1,
												idx + 1,
												markerColor
										  )
								}
								onClick={() => {
									setPlaceModalInfo(schedule.place);
									setFocusedPlace(schedule.place);
								}}
							/>
						);
					})
				)}

			{/* ✅ 4단계에서 schedules에 없는 focusedPlace가 있으면 별도 마커 표시 */}
			{isFocusedPlaceInSchedules && (
				<Marker
					key={`focusedPlace-only`}
					position={{
						lat:
							focusedPlace.location?.latitude ??
							focusedPlace.latitude,
						lng:
							focusedPlace.location?.longitude ??
							focusedPlace.longitude,
					}}
					icon={createPinMarkerIcon("★", "#1976d2")}
					onClick={() => {
						setPlaceModalInfo(focusedPlace);
						setFocusedPlace(focusedPlace);
					}}
				/>
			)}
		</GoogleMap>
	);
}

export default Map;
