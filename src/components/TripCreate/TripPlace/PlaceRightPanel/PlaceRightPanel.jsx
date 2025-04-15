import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCheck } from "react-icons/fa6";
import StoredPlaceBox from "../StoredPlaceBox/StoredPlaceBox";

function PlaceRightPanel(props) {
    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <h1>장소 보관함</h1>
                <div css={S.SHeader}>
                    <div css={S.SStoredNum}>
                        <FaCheck /> <span>3</span>
                    </div>
                    <button>초기화</button>
                </div>
                <div css={S.SContentBox}>
                    <StoredPlaceBox />
                </div>
            </div>
        </div>
    );
}

export default PlaceRightPanel;
