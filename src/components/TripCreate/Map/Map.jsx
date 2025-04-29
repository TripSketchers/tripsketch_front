import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";
import { useTrip } from "../TripContext";
import { getCategoryFromTypes, getColorByCategory } from "../../../utils/CategoryUtils";

function Map({ selectedStep }) {
	const mapRef = useRef(null);
	const {
		storedPlaces,
		storedAccommodation,
		setPlaceModalInfo,
		focusedPlace,
		setFocusedPlace,
	} = useTrip();

	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const defaultCenter = {
		lat: 35.1796,
		lng: 129.0756,
	};

	// 📍 핀 모양 마커 SVG 생성 (숫자 포함)
	const createPinMarkerIcon = (number, color = "#1976d2") => ({
		url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="70" viewBox="0 0 40 60">
				<path d="M20 0C9 0 0 9 0 20c0 11.6 18 38.5 19.1 40.2a1.2 1.2 0 002 0C22 58.5 40 31.6 40 20c0-11-9-20-20-20z" fill="${color}"/>
				<circle cx="20" cy="20" r="15" fill="white"/>
				<text x="20" y="25" text-anchor="middle" font-size="16" fill="${color}" font-weight="bold" font-family="Arial">${number}</text>
			</svg>
		`)}`,
		scaledSize: new window.google.maps.Size(30, 70),
		anchor: new window.google.maps.Point(15, 70),
	});

	// 📍 침대 모양 마커 SVG 생성
	const createBedMarkerIcon = (color = "#1976d2") => ({
		url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="70" viewBox="0 0 40 60">
				<path d="M20 0C9 0 0 9 0 20c0 11.6 18 38.5 19.1 40.2a1.2 1.2 0 002 0C22 58.5 40 31.6 40 20c0-11-9-20-20-20z" fill="${color}" />
				<circle cx="20" cy="20" r="15" fill="white" />
				<g transform="translate(12, 14)" fill="${color}">
					<rect x="0" y="5" width="16" height="5" rx="1" />
					<rect x="0" y="1" width="7" height="4" rx="1" />
					<rect x="0" y="10" width="2" height="2" />
					<rect x="14" y="10" width="2" height="2" />
				</g>
			</svg>
		`)}`,
		scaledSize: new window.google.maps.Size(30, 70),
		anchor: new window.google.maps.Point(15, 70),
	});

	// ✅ 지도 중심 이동
	useEffect(() => {
		const places =
			selectedStep === 2
				? storedPlaces
				: Object.values(storedAccommodation);

		if (!mapRef.current) return;

		const targetPlace = focusedPlace ?? places.at(-1);
		if (!targetPlace?.location) return;

		const { latitude, longitude } = targetPlace.location;
		mapRef.current.panTo({ lat: latitude, lng: longitude });
	}, [selectedStep, storedPlaces, storedAccommodation, focusedPlace]);

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
			{selectedStep === 2 &&
				storedPlaces.map((place, idx) => (
					place.location && (
						<Marker
							key={place.id}
							position={{
								lat: place.location.latitude,
								lng: place.location.longitude,
							}}
							icon={createPinMarkerIcon(
								idx + 1,
								getColorByCategory(getCategoryFromTypes(place.types))
							)}
							onClick={() => {
								setPlaceModalInfo(place);
								setFocusedPlace(place);
							}}
						/>
					)
				))
			}

			{selectedStep === 3 &&
				Object.values(storedAccommodation).map((place) => (
					place.location && (
						<Marker
							key={place.id}
							position={{
								lat: place.location.latitude,
								lng: place.location.longitude,
							}}
							icon={createBedMarkerIcon(
								getColorByCategory(getCategoryFromTypes(place.types))
							)}
							onClick={() => {
								setPlaceModalInfo(place);
								setFocusedPlace(place);
							}}
						/>
					)
				))
			}
		</GoogleMap>
	);
}

export default Map;
