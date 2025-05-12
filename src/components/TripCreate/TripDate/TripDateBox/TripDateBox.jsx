import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function TripDateBox({ index, date }) {
    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div css={S.SLabel}>여행 {index + 1}일차</div>
                <div css={S.SValue}>{date}</div>
            </div>
        </div>
    );
}

export default TripDateBox;
