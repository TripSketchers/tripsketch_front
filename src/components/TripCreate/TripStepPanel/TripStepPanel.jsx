import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../StoredPlacePanel/StoredPlacePanel";
import PlaceSelectPanel from "../../PlaceSelectPanel/PlaceSelectPanel";

function TripStepPanel({ label, categories }) {
	return (
		<div css={S.SLayout}>
			<PlaceSelectPanel text={label} categories={categories} />
			<StoredPlacePanel text={label} />
		</div>
	);
}

export default TripStepPanel;
