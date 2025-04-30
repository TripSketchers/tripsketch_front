import { css } from "@emotion/react";

export const STitle = css`
	margin-bottom: 10px;
	font-size: 24px;
	font-weight: 600;
	line-height: 28px;
	span {
		color: rgb(60, 134, 231);
	}
`;

export const SContainer = css`
	display: grid;
	grid-template-columns: repeat(auto-fill, 130px);
	gap: 20px;
	justify-content: center;
	align-items: center;
	margin: 20px 0;
`;

export const SBox = (isSelected, backgroundUrl) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	cursor: pointer;
`;

export const SDateTag = css`
	border-radius: 10px;
	padding: 5px 8px;
	background-color: rgb(57, 180, 193);
	color: white;
	font-size: 14px;
`;

export const SImageBox = (isSelected, backgroundUrl, fallbackImg) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px 0;
	border-radius: 15px;
	width: 100px;
	height: 100px;
	background-color: ${isSelected ? "transparent" : "rgb(239, 239, 239)"};
	background-image: ${isSelected ? `url(${backgroundUrl})` : "none"};
	background-size: cover;
	background-position: center;
	overflow: hidden;

	svg {
		font-size: 24px;
	}
	path {
		color: #999;
	}
`;

export const SPlaceName = css`
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 130px;
	font-size: 14px;
	color: rgb(100, 100, 100);
`;

export const SBtnContainer = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const selectAllBtn = css`
	flex: 1;
	padding: 8px;
	border: 2px solid rgb(57, 180, 193);
	color: rgb(57, 180, 193);
	font-weight: 600;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		border: 2px solid rgb(48, 152, 164);
	}
`;

export const buttonGroup = css`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

export const cancelBtn = css`
	flex: 1;
	padding: 10px;
	background: #ddd;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		background: #ccc;
	}
`;

export const selectBtn = css`
	flex: 1;
	padding: 10px;
	background: rgb(60, 134, 231);
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		background: rgb(43, 103, 192);
	}
`;
