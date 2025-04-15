import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	margin: 10px;
	border-radius: 10px;
	padding: 10px;
	background-color: white;
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
	width: 170px;
	span {
		line-height: 20px;
		font-size: 14px;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
`;
export const SBtnBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SButton = css`
	border-radius: 5px;
	padding: 5px 10px;
	background-color: #aaaaaa;
`;
