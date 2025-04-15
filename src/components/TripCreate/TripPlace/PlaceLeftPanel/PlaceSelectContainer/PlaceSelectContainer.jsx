import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SearchInput from "../../../../SearchInput/SearchInput";
import TripPlaceBox from "../../TripPlaceBox/TripPlaceBox";

function PlaceSelectContainer(props) {
	return (
		<div css={S.SLayout}>
			<div css={S.SSearchBox}>
				<SearchInput placeholder={"장소명을 입력하세요"} />
			</div>
			<div css={S.SPlaceContainer}>
				<TripPlaceBox />
				<TripPlaceBox />
				<TripPlaceBox />
				<TripPlaceBox />
				<TripPlaceBox />
				<TripPlaceBox />
				<TripPlaceBox />
			</div>
		</div>
	);
}

export default PlaceSelectContainer;
