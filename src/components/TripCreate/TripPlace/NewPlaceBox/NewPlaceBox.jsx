import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function NewPlaceBox(props) {
	return (
		<div css={S.SLayout}>
			<div css={S.SContainer}>
				<span>상호명</span>
				<span>8459-8481 Kalanianaʻole Hwy, Honolulu, HI 96825, USA</span>
			</div>
            <div css={S.SBtnBox}>
			    <button css={S.SButton}>등록</button>
            </div>
		</div>
	);
}

export default NewPlaceBox;
