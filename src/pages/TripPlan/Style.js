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

export const SContainer = css`
	width: 100%;
	max-width: max-content;
	min-width: 600px;
    height: 100%;
    overflow: hidden;
`;

export const SMapContainer = css`
	flex: 1;
    height: 100%;
`;

export const SBox = css`
	display: flex;
	width: 100%;
	height: 100%;
    overflow: hidden;
`;
