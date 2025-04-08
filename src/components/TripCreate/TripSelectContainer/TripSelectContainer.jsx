import React from "react";
import TripHeader from "../TripHeader/TripHeader";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripDate from "../TripDate/TripDate";
import TripPlace from "../TripPlace/TripPlace";
import TripAccommodation from "../TripAccommodation/TripAccommodation";

function TripSelectContainer({ selectedStep }) {
	return (
		<div css={S.SLayout}>
			<TripHeader />
			<div css={S.SContainer}>
				{selectedStep === 1 && <TripDate />}
				{selectedStep === 2 && <TripPlace />}
				{selectedStep === 3 && <TripAccommodation />}
			</div>
		</div>
	);
}

export default TripSelectContainer;
