import React, { useState } from "react";
import Header from "../Header/Header";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripDate from "../TripDate/TripDate";
import TripPlace from "../TripPlace/TripPlace";
import TripAccommodation from "../TripAccommodation/TripAccommodation";

function TripSelectContainer({ selectedStep }) {
	const [showModal, setShowModal] = useState(true);

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
				{selectedStep === 2 && <TripPlace />}
				{selectedStep === 3 && <TripAccommodation />}
			</div>
		</div>
	);
}

export default TripSelectContainer;
