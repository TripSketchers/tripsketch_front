import { css } from "@emotion/react";
import colors from "../../constants/color";

export const SLayout = css`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 50%;
`;

export const SSearchBox = css`
	padding: 10px;

	input {
		font-size: 14px;
	}

	path {
		font-size: 16px;
	}
`;

export const SCategoryTabContainer = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
`;

export const SCategoryTab = (selectedCategory) => css`
	margin-right: 5px;
	border: ${!selectedCategory && "1px solid #dbdbdb"};
	border-radius: 5px;
	padding: 5px 10px;
	background-color: ${selectedCategory && colors.mainBlueHover};
	color: ${selectedCategory ? "white" : "#999"};
	font-size: 14px;
	cursor: pointer;
`;

export const SPlaceContainer = css`
	overflow-y: auto;
	flex: 1;
	margin-bottom: 10px;
`;

export const SMoreButtonWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SMoreButton = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px;
	padding: 5px 10px;
	color: #777;
	font-size: 14px;
	svg {
		margin-right: 10px;
	}
	path {
		color: #777;
	}
`;

export const SEndMessage = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px;
	font-size: 12px;
	color: #777;
`;
