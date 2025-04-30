import { css } from "@emotion/react";

export const SLayout = (selectedStep) => css`
	transition: all 0.4s ease-in-out;
	display: flex;
	flex-direction: column;
	background-color: rgb(229, 236, 238);
	overflow: hidden;
	${selectedStep === 1 ? `min-width: 350px;` : `min-width: 600px;`}
`;

export const SContainer = css`
	height: calc(100% - 130px);
	overflow-y: auto;
`;
