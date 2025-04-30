import { css } from "@emotion/react";
import { getColorByCategory } from "../../utils/CategoryUtils";

export const SModalWrapper = css`
	text-align: left;
`;

export const SImage = css`
	margin: 10px 0;
	border-radius: 10px;
	width: 100%;
	height: 60%;
	max-height: 500px;
	object-fit: cover;
`;

export const SInfoBox = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const STitle = css`
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 8px;
`;

export const SLikeBox = css`
	display: flex;
	font-size: 14px;
	* {
		display: flex;
		align-items: center;
		margin-right: 5px;
	}
`;

export const SStar = css`
	path {
		color: rgb(255, 207, 64);
	}
`;

export const SCategory = (category) => css`
	margin-bottom: 10px;
	color: ${getColorByCategory(category)};
`;

export const SAddress = css`
	font-size: 16px;
`;

export const SCloseBtn = css`
	margin-top: 16px;
	align-self: center;
	padding: 6px 20px;
	background-color: #1976d2;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;

	&:hover {
		background-color: #155fa0;
	}
`;
