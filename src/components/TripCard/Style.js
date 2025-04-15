import { css } from "@emotion/react";

export const SLayout = css`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: auto;
	border: 2px solid #dbdbdb;
	border-radius: 10px;
	padding: 15px;
	width: 100%;
	max-width: 220px;
	aspect-ratio: 1 / 1; /* 정사각형 비율 유지*/
	cursor: pointer;
`;

export const SHeader = css`
	width: 100%;
	display: flex;
	justify-content: center; /* 좌우 끝 정렬 */
	align-items: flex-start;
	position: relative;
`;

export const SDday = css`
	margin-bottom: 10px;
	border-radius: 20px;
	background-color: #365267;
	color: white;
	width: 70px;
	height: 28px;
	text-align: center;
	line-height: 28px;
	font-size: 14px;
`;

export const SMenu = css`
	position: absolute;
	top: 0px;
	right: -5px;
	* {
		font-size: 22px;
	}
`;

export const STitle = css`
	display: block;
	padding: 20px 5px;
	font-size: 24px;
	font-weight: bold;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
`;

export const SLocation = css`
	padding: 5px;
`;

export const SDateRange = css`
	padding: 5px;
	font-size: 12px;
`;

export const STogglePanel = css`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	top: -5px;
	right: -75px;
	border: 1px solid #dbdbdb;
	border-radius: 5px;
	background-color: white;
	box-shadow: 0 0 10px #dbdbdb;
	z-index: 2;
	overflow: hidden;
	div:first-of-type {
		border-bottom: 1px solid #dbdbdb;
	}
`;

export const SToggleMenu = css`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 10px;
	svg {
		margin-right: 8px;
		font-size: 14px;
	}
	span {
		font-size: 14px;
	}
	:hover {
		background-color: rgb(239, 239, 239);
	}
`;
