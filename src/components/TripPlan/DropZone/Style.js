import { css } from "@emotion/react";

export const SDayColumn = css`
	display: flex;
	flex-direction: column;
	min-width: 200px;
	background-color:rgb(255, 255, 255);
	border-left: 1px solid #ccc;
    flex-grow: 1;
`;

export const SDayHeader = (isSelected) => css`
	position: sticky;
	top: 0;
	z-index: 5;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	background-color: ${isSelected ? "#cccccc" : "white"};
    ${isSelected && "color: white;"}
	border-bottom: 1px solid #ccc;
    cursor: pointer;
`;

export const SDropBody = css`
	position: relative;
	height: 1440px; // 24시간 기준
	overflow: hidden;
`;

export const SHourLine = css`
	position: absolute;
	left: 0;
	width: 100%;
	height: 0;
	border-top: 1px solid #ccc;
	z-index: 0;
`;

export const SDropPreview = css`
	position: absolute;
	left: 0;
	width: 100%;
	border: 2px dashed #1890ff;
	background-color: rgba(24, 144, 255, 0.05);
	pointer-events: none;
	z-index: 20;
`;
