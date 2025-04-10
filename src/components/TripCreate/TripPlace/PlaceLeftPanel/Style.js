import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	flex-direction: column;
	border-right: 1px solid #dbdbdb;
	width: 50%;
	height: 100%;
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
	padding: 10px;
	overflow: hidden;
`;

export const STabSelector = css`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

export const STab = (isActive) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 48%;
	border-radius: 10px;
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	background-color: ${isActive ? "#6ec4d3" : "#e0e0e0"};
	color: ${isActive ? "white" : "#b6b7b7"};
	box-shadow: ${isActive ? "2px 2px 5px #a7b5b9" : "none"};
	transition: 0.3s;
`;

export const SSearchBox = css`
	input {
		font-size: 14px;
	}
	path {
		font-size: 16px;
	}
`;

export const SPlaceContainer = css`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 0 10px 10px 10px;
	overflow-y: auto;
`;

export const SPlaceBox = css`
	
`;
