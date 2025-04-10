import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from './Style';

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
        <div css={S.SLayout}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
	);
}

export default TripMap;
