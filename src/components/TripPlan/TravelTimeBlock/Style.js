import { css } from "@emotion/react";

export const STravelTimeBlock = (top, height) => css`
	position: absolute;
	top: ${top}px;
	height: ${height}px;
	display: flex;
	justify-content: center;
	align-items: center;
    border-left: 5px dotted rgb(200, 200, 200);
	width: 100%;
	background-color: rgb(242, 242, 242);
    cursor: pointer;
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
    * {
        color: #777;
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
