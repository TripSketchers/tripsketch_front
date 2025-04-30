import { css } from "@emotion/react";

export const SLayout = css`
	position: relative;
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
	display: flex;
	justify-content: center; /* 좌우 끝 정렬 */
	align-items: flex-start;
	position: relative;
	width: 100%;
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

export const STitle = css`
	display: block;
	text-align: center;
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
	text-align: center;
`;

export const SDateRange = css`
	padding: 5px;
	font-size: 12px;
`;