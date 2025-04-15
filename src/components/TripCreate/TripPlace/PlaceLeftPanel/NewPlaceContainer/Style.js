import { css } from "@emotion/react";

export const SLayout = css`
	padding: 10px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	input {
		font-size: 14px;
	}
	& > span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-size: 14px;
		font-weight: 500;
	}
`;

export const SMapContainer = css`
	margin: 10px 0;
	border-radius: 10px;
	overflow: hidden;
	width: 100%;
	height: 180px;
	* {
		height: 100%;
	}
`;

export const SNewPlaceContainer = css`
	margin-top: 10px;
	border-radius: 10px;
	flex: 1;
	overflow-y: auto;
	background-color: rgb(240, 240, 240);
`;
