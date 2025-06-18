import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function GradientBtn({ text, onClick }) {
	return (
		<button onClick={onClick} css={S.SaveBtnStyle}>
			{text}
		</button>
	);
}

export default GradientBtn;
