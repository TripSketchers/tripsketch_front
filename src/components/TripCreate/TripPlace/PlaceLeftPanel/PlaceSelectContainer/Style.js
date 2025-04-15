import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

export const SSearchBox = css`
	padding: 10px;

	input {
		font-size: 14px;
	}

	path {
		font-size: 16px;
	}
`;

export const SPlaceContainer = css`
	overflow-y: auto;
	flex: 1;
	margin-bottom: 10px;
`;
