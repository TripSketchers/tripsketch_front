import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function TripHeader(props) {
    return (
        <div css={S.SLayout}>
            <div css={S.STitle}>여행 이름</div>
            <div css={S.STripDes}>여행지</div>
            <div>2025.03.24 - 2025.03.26(3일)</div>
        </div>
    );
}

export default TripHeader;