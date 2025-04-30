import React, { useState } from "react";
import Sidebar from "../../components/TripCreate/Sidebar/Sidebar";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripSelectContainer from "../../components/TripCreate/TripSelectContainer/TripSelectContainer";
import Map from "../../components/TripCreate/Map/Map";
import { TripProvider } from "../../components/TripCreate/TripContext";
import PlaceDetailModal from "../../components/PlaceDetailModal/PlaceDetailModal";

function TripCreate(props) {
	const [selectedStep, setSelectedStep] = useState(1);

	return (
		<TripProvider>
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
		</TripProvider>
	);
}

export default TripCreate;
