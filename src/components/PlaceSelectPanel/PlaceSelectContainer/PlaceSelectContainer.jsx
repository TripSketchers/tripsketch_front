import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SearchInput from "../../SearchInput/SearchInput";
import PlaceBox from "../PlaceBox/PlaceBox";

function PlaceSelectContainer(props) {
	return (
		<div css={S.SLayout}>
			<div css={S.SSearchBox}>
				<SearchInput placeholder={"장소명을 입력하세요"} />
			</div>
			<div css={S.SPlaceContainer}>
				<PlaceBox />
				<PlaceBox />
				<PlaceBox />
				<PlaceBox />
				<PlaceBox />
				<PlaceBox />
				<PlaceBox />
			</div>
		</div>
	);
}

export default PlaceSelectContainer;
