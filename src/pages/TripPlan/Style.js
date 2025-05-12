import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	width: 100%;
	height: calc(100vh - 140px);
	overflow: hidden;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
	.split {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.split > div {
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}

	.gutter {
		background-color: #bbb;
		background-clip: content-box;
	}

	.gutter.gutter-horizontal {
		cursor: col-resize;
		width: 8px;
	}
`;

export const SContainer = (isOpen) => css`
    min-width: 300px;
	height: 100%;
	overflow: hidden;
`;

export const SMapContainer = css`
	flex: 1;
	height: 100%;
`;

export const SBox = css`
	display: flex;
	height: 100%;
	overflow: hidden;
`;

export const SStoredPanel = (isOpen) => css`
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: #f7f7f7;
	transition: width 0.3s ease;
	width: ${isOpen ? "300px" : "0"};
	height: 100%;
`;

export const SToggleButton = (isOpen) => css`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	z-index: 100;
	background: #fff;
	border: 1px solid #dbdbdb;
	width: 30px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	${isOpen
		? "border-top-left-radius: 15px;border-bottom-left-radius: 15px;"
		: "border-top-right-radius: 15px;border-bottom-right-radius: 15px;"}

	${isOpen ? "right: 0px;" : "right: -30px;"}

	&:hover {
		background: #f0f0f0;
	}
`;
