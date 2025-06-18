import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripDate from "../TripDate/TripDate";
import TripStepPanel from "../TripStepPanel/TripStepPanel";

function TripSelectContainer({ selectedStep }) {
	const location = useLocation();
	// editMode면 false, 아니면 true
	const [showModal, setShowModal] = useState(
		location.state?.editMode ? false : true
	);

	return (
		<div css={S.SLayout(selectedStep)}>
			<Header
				selectedStep={selectedStep}
				onOpenModal={() => setShowModal(true)}
			/>
			<div css={S.SContainer}>
				{selectedStep === 1 && (
					<TripDate
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				)}
				{selectedStep === 2 && (
					<TripStepPanel
						label="장소"
						categories={["명소", "맛집", "카페"]}
					/>
				)}
				{selectedStep === 3 && (
					<TripStepPanel label="숙소" categories={["숙소"]} />
				)}
			</div>
		</div>
	);
}

export default TripSelectContainer;
