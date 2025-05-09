import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TripAlbum from "../../pages/TripAlbum/TripAlbum";
import TripPlan from "../../pages/TripPlan/TripPlan";
import TripAlbumUpload from "../../pages/TripAlbumUpload/TripAlbumUpload";
import TripCreate from "../../pages/TripCreate/TripCreate";
import { useQueryClient } from "@tanstack/react-query";
import { TripProvider } from "./TripContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function TripRoute(props) {
	const queryClient = useQueryClient();
	const principal = queryClient.getQueryState(["getPrincipal"]);

	if (!principal?.data?.data) {
		return <Navigate to="/" />;
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<TripProvider>
				<Routes>
					<Route path="create" element={<TripCreate />} />
					<Route path="plan/:tripId" element={<TripPlan />} />
					<Route path="album/:tripId" element={<TripAlbum />} />
					<Route
						path="album/:tripId/upload"
						element={<TripAlbumUpload />}
					/>
				</Routes>
			</TripProvider>
		</DndProvider>
	);
}

export default TripRoute;
