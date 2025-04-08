/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// ✅ 모달 오버레이
export const SModalOverlay = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
`;

// ✅ 모달 박스
export const SModalBox = css`
	background: #ffffff;
	border-radius: 12px;
	padding: 30px 32px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
	text-align: center;
`;

// ✅ 제목
export const STitle = css`
	font-size: 22px;
	font-weight: 600;
	margin-bottom: 15px;
`;

// ✅ 서브텍스트
export const SSubText = css`
	font-size: 14px;
	color: #555;
	margin-bottom: 24px;
`;

// ✅ 버튼
export const SConfirmButton = css`
	margin: 24px auto 0 auto;
	display: block;
	border: none;
	border-radius: 8px;
	padding: 12px 24px;
	color: white;
	font-size: 16px;
	font-weight: bold;
	background-color: rgb(110, 196, 211);
	cursor: pointer;

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;

// ✅ 달력 커스터마이징
export const SDatePickerWrapper = css`
	
`;
