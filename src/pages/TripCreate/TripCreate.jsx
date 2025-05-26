import React, { useEffect, useState } from "react";
import Sidebar from "../../components/TripCreate/Sidebar/Sidebar";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripSelectContainer from "../../components/TripCreate/TripSelectContainer/TripSelectContainer";
import Map from "../../components/TripCreate/Map/Map";
import PlaceDetailModal from "../../components/PlaceDetailModal/PlaceDetailModal";
import { TripProvider } from "../../components/Routes/TripContext";

function TripCreate(props) {
	const [selectedStep, setSelectedStep] = useState(1);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);

	return (
		<div css={S.SLayout}>
			<Sidebar
				selectedStep={selectedStep}
				setSelectedStep={setSelectedStep}
			/>
			<div css={S.SContainer}>
				<TripSelectContainer selectedStep={selectedStep} />
				<Map selectedStep={selectedStep} />
				<PlaceDetailModal />
			</div>
		</div>
	);
}

export default TripCreate;
