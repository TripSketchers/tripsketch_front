import { css } from "@emotion/react";

export const SWrapper = css`
	width: 100%;
	height: 100%;
	overflow: auto;
`;

export const SLayout = css`
	display: flex;
	width: fit-content;
`;

export const SContainer = css`
	display: flex;
	flex-direction: row;
	min-width: max-content;
	flex-shrink: 0;
`;

export const STimeColumn = css`
	position: sticky;
	left: 0;
	z-index: 10;
	width: 60px;
	min-width: 60px;
	flex-shrink: 0;
	background-color: #f0f0f0;
	border-right: 1px solid #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const SStickyHeaderSpacer = css`
	height: 40px;
	width: 100%;
	background-color: #f0f0f0;
	border-bottom: 1px solid #ccc;
`;

export const STimeRow = css`
	height: 60px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid #ccc;
	font-size: 12px;
	color: #555;
`;

export const SDayColumn = css`
	position: relative;
	min-width: 200px;
	height: 2880px;
	background-color: #f8f8f8;
	border-left: 1px solid #ccc;
`;

export const SDayHeader = css`
	position: sticky;
	top: 0;
	z-index: 5;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	background-color: white;
	border-bottom: 1px solid #ccc;
`;

export const STimeCell = css`
	height: 60px;
	border-top: 1px solid #eee;
	background-color: rgb(227, 227, 227);
`;

export const STimeBlock = css`
	position: relative;
	margin: 8px;
	border-radius: 8px;
	padding: 8px;
	background-color: white;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	font-size: 13px;
`;

export const STimeText = css`
	font-weight: bold;
	font-size: 12px;
	color: #333;
`;

export const SLabelText = css`
	margin-top: 4px;
`;

export const SDurationText = css`
	margin-top: 4px;
	font-size: 11px;
	color: gray;
`;

export const SDropActive = css`
	background-color: #d0f0ff;
	outline: 2px dashed #1890ff;
`;

export const SDropPreview = css`
	position: absolute;
	left: 5%;
	width: 90%;
	border: 2px dashed #1890ff;
	border-radius: 6px;
	background-color: rgba(24, 144, 255, 0.05);
	pointer-events: none;
	z-index: 20;
`;

export const SDropBody = css`
	position: relative;
	height: 1440px;
`;
