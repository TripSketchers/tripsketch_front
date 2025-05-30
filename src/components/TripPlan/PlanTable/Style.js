import { css } from "@emotion/react";

export const SWrapper = css`
	position: relative;
	flex: 1;
	border-left: 1px solid #dbdbdb;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

export const SLayout = css`
	display: flex;
	flex: 1;
`;

export const SContainer = css`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	min-width: 0;
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

export const STravelTimeBlock = (top, height) => css`
	position: absolute;
	top: ${top}px;
	height: ${height}px;
	width: 100%;
	background-color: rgb(242, 242, 242);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const STravelTimeText = css`
    display: flex;
    justify-content: center;
    align-items: center;
	font-size: 12px;
	color: #777;
    padding: 2px 8px;
    svg {
        margin-right: 4px;
    }
`;

export const STrashDropZone = css`
	position: sticky;
	bottom: 0;
	height: 0; // 공간 확보
	display: flex;
	align-items: flex-end;
	justify-content: center;
	z-index: 10;
`;
