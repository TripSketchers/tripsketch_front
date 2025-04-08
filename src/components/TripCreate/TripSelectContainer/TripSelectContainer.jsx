import React, { useState } from "react";
import TripHeader from "../TripHeader/TripHeader";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripDate from "../TripDate/TripDate";
import TripPlace from "../TripPlace/TripPlace";
import TripAccommodation from "../TripAccommodation/TripAccommodation";

function TripSelectContainer({ selectedStep }) {
	const [showModal, setShowModal] = useState(true);

	return (
		<div css={S.SLayout}>
			<TripHeader onOpenModal={() => setShowModal(true)} />
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
