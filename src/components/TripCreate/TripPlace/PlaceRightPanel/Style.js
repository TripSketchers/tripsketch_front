import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 100%;
	h1 {
		font-size: 18px;
		font-weight: 500;
	}
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
	padding: 10px;
	flex: 1;
	height: 100%;
`;

export const SHeader = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 0;
	button {
		color: #e35454;
	}
`;

export const SStoredNum = css`
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		margin-left: 5px;
	}
`;

export const SContentBox = css`
	flex: 1;
	border-radius: 10px;
	background-color: rgb(240, 240, 240);
	height: 100%;
	overflow-y: auto;
`;
