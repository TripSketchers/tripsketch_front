import { css } from "@emotion/react";

export const SLayout = (selectedStep) => css`
	display: flex;
	flex-direction: column;
	background-color: rgb(229, 236, 238);
	overflow: hidden;
	${selectedStep === 1
		? `min-width: 250px; max-width: 400px;`
		: `min-width: 600px; max-width: 800px;`}
`;

export const SContainer = css`
	height: 100%;
	overflow-y: auto;
`;
