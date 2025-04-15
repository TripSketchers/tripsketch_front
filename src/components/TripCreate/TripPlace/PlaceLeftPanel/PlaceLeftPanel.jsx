import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import PlaceSelectContainer from "./PlaceSelectContainer/PlaceSelectContainer";
import NewPlaceContainer from "./NewPlaceContainer/NewPlaceContainer";

function PlaceLeftPanel({ selectedTab }) {
	return (
		<div css={S.SLayout}>
			{selectedTab === 1 ? (
				<PlaceSelectContainer />
			) : (
				<NewPlaceContainer />
			)}
		</div>
	);
}

export default PlaceLeftPanel;
