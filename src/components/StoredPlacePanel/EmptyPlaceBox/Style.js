import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	flex-direction: column;
	margin: 10px 5px;
	cursor: pointer;
`;

export const SBox = css`
	display: flex;
	align-items: center;
	padding: 10px;
	box-shadow: 3px -2px 8px rgb(203, 203, 203);
	border-radius: 12px;
`;

export const SPlusBox = css`
	border-radius: 10px;
	padding: 10px;
	background-color: rgb(239, 239, 239);
	margin-right: 10px;
	* {
		font-size: 24px;
		color:rgb(200, 200, 200);
	}
`;

export const SText = css`
	font-size: 13px;
	color: #999;
`;
