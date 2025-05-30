import { css } from "@emotion/react";
import { getColorByCategory } from "../../../utils/CategoryUtils";

export const SCard = (category) => css`
	position: absolute;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #dbdbdb;
	border-left: 4px solid ${getColorByCategory(category)};
	padding: 0 8px;
	background-color: ${getColorByCategory(category, true)};
	width: 100%;
`;

export const SCompactText = css`
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	span {
		font-weight: bold;
		margin-right: 3px;
	}
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
    width: 90%;
`;

export const SCardTime = css`
	font-size: 12px;
	font-weight: bold;
	color: #333;
	margin-bottom: 5px;
	span {
		margin-left: 5px;
		font-weight: 400;
		color: rgb(100, 100, 100);
	}
`;

export const SCardLabel = css`
	font-size: 14px;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
    padding-bottom: 2px;
`;

export const SLocked = css`
	font-size: 14px;
	cursor: pointer;
	* {
		color: rgb(100, 100, 100);
	}
`;
