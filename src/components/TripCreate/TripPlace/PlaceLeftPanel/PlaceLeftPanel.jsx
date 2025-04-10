import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripPlaceBox from "../TripPlaceBox/TripPlaceBox";
import SearchInput from "../../../SearchInput/SearchInput";

function PlaceLeftPanel(props) {
	const [selectedTab, setSelectedTab] = useState(1);

	return (
		<div css={S.SLayout}>
			<div css={S.SContainer}>
				<div css={S.STabSelector}>
					<div
						css={S.STab(selectedTab === 1)}
						onClick={() => setSelectedTab(1)}
					>
						장소 선택
					</div>
					<div
						css={S.STab(selectedTab === 2)}
						onClick={() => setSelectedTab(2)}
					>
						지도 검색
					</div>
				</div>
				{selectedTab === 1 ? (
					<div css={S.SSearchBox}>
						<SearchInput placeholder={"장소를 검색하세요"} />
					</div>
				) : (
					<></>
				)}
			</div>
			<div css={S.SPlaceContainer}>
				{selectedTab === 1 ? (
					<div css={S.SPlaceBox}>
						<TripPlaceBox />
						<TripPlaceBox />
						<TripPlaceBox />
						<TripPlaceBox />
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default PlaceLeftPanel;
