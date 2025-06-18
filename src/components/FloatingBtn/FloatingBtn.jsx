/** @jsxImportSource @emotion/react */
import React, { forwardRef } from "react";
import * as S from "./Style";
import { FaXmark } from "react-icons/fa6";

// ✅ 함수 이름 명시
const FloatingBtn = forwardRef(function FloatingBtn(props, ref) {
	return (
		<div css={S.SLayout}>
			<a css={S.MoreBtn} ref={ref}>
				<span></span>
				<span></span>
				<span></span>
				<FaXmark />
			</a>
		</div>
	);
});

// ✅ default export는 함수가 되어야 함!
export default FloatingBtn;
