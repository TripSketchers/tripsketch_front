import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

function TripMap(props) {
	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const center = {
		lat: 37.5665, // 서울 기준
		lng: 126.978,
	};

	return (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
			<Marker position={center} />
		</GoogleMap>
	);
}

export default TripMap;
