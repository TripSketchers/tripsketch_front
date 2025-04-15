import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripPlaceBox from "../TripPlaceBox/TripPlaceBox";
import SearchInput from "../../../SearchInput/SearchInput";

function PlaceLeftPanel({ selectedTab }) {
	return (
		<div css={S.SLayout}>
			{selectedTab === 1 ? (
				<>
					<div css={S.SSearchBox}>
						<SearchInput placeholder={"장소를 검색하세요"} />
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
				</>
			) : (
				<div>지도 검색 내용</div>
			)}
		</div>
	);
}

export default PlaceLeftPanel;
