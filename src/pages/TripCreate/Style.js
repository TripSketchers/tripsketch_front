import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	padding: 40px;
	width: 100%;
	height: calc(100vh - 100px);
	overflow: hidden;
	background-color: rgb(239, 247, 248);

	.split-horizontal {
		display: flex;
		height: 100%;
		width: 100%;
	}

	.gutter {
		position: relative;
		cursor: col-resize;
		border-radius: 30px;
	}

	/* 가운데 점 3개 표시 */
	.gutter::before {
		content: "⋮";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		align-items: center;
		justify-content: center;

		height: 40px;
		width: 10px;
		border-radius: 30px;
		font-size: 18px;

		color: #888;
		background-color: rgb(164, 193, 193);
        box-shadow: 0px 0px 5px #a7b5b9;
		pointer-events: none;
	}
`;
