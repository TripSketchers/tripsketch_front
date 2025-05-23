import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TripAlbum from "../../pages/TripAlbum/TripAlbum";
import TripPlan from "../../pages/TripPlan/TripPlan";
import TripAlbumUpload from "../../pages/TripAlbumUpload/TripAlbumUpload";
import TripCreate from "../../pages/TripCreate/TripCreate";
import { useQueryClient } from "@tanstack/react-query";

function TripRoute(props) {
	const queryClient = useQueryClient();
	const principal = queryClient.getQueryState(["getPrincipal"]);

	if (!principal?.data?.data) {
		return <Navigate to="/" />;
	}

	return (
		<Routes>
			<Route path="create" element={<TripCreate />} />
			<Route path="plan/:tripId" element={<TripPlan />} />
			<Route path="album/:tripId" element={<TripAlbum />} />
			<Route path="album/:tripId/upload" element={<TripAlbumUpload />} />
		</Routes>
	);
}

export default TripRoute;
