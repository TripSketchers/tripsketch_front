import { css } from "@emotion/react";

export const SWrapper = css`
	position: relative;
	flex: 1;
	border-left: 1px solid #dbdbdb;
	width: 100%;
	height: 100%;
	overflow: auto;
	* {
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none;
	}
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
	* {
		pointer-events: none; // 자식 요소에서만 이벤트 처리
	}
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

export const STrashDropZone = css`
	position: sticky;
	bottom: 0;
	height: 0; // 공간 확보
	display: flex;
	align-items: flex-end;
	justify-content: center;
	z-index: 10;
`;
