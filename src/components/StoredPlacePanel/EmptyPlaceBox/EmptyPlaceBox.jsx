import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { FaPlus } from 'react-icons/fa6';

function EmptyPlaceBox({ label, onClick }) {
    return (
        <div css={S.SLayout} onClick={onClick}>
			<div css={S.SDate}>{label}</div>
			<div css={S.SBox}>
                <div css={S.SPlusBox}><FaPlus /></div>
				<div css={S.SText}>숙소를 추가해주세요</div>
			</div>
		</div>
    );
}

export default EmptyPlaceBox;