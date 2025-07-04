import { css } from "@emotion/react";
import { getColorByCategory } from "../../../utils/CategoryUtils";
import colors from "../../../constants/color";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 10px;
	padding: 10px 0;
	font-size: 14px;
	border-bottom: 1px solid #dbdbdb;
	height: 100px;
	cursor: pointer;
	img {
		border-radius: 10px;
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	margin: 0 10px;
	width: 120px;
	height: 100%;
	& span {
		line-height: 14px;
		font-size: 12px;
	}
`;

export const STitle = css`
	margin-bottom: 5px;
	font-size: 16px;
	font-weight: 600;
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const SCategory = (category) => css`
	color: ${getColorByCategory(category)};
`;

export const SAddress = css`
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	color: #777777;
`;

export const SLikeBox = css`
	display: flex;
	font-size: 12px;
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

export const SButton = (isAdded) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	padding: 5px;
	background-color: ${isAdded ? colors.mainBlueHover : colors.mainBlue};
	box-shadow: 1px 1px 5px #a7b5b9;
	& * {
		font-size: 18px;
		color: white;
	}
`;
