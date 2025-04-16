import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SearchInput from "../SearchInput/SearchInput";
import Map from "../TripCreate/Map/Map";
import NewPlaceBox from "./NewPlaceBox/NewPlaceBox";

function NewPlacePanel(props) {
    return (
        <div css={S.SLayout}>
            <SearchInput placeholder={"상호명 또는 주소를 입력하세요"} />
            <div css={S.SMapContainer}>
                <Map />
            </div>
            <span>검색 결과 총 1건</span>
            <div css={S.SNewPlaceContainer}>
                <NewPlaceBox />
            </div>
        </div>
    );
}

export default NewPlacePanel;
