import { css } from "@emotion/react";

export const SLayout = (selectedStep) => css`
	display: flex;
	flex-direction: column;
	margin-right: 5px;
	border-radius: 30px;
	height: 100%;
	background-color: rgb(229, 236, 238);
	box-shadow: 0px 0px 10px #a7b5b9;
	overflow: hidden;
	${selectedStep === 1
		? `min-width: 250px; max-width: 400px;`
		: `min-width: 600px; max-width: 800px;`}
`;

export const SContainer = css`
	height: 100%;
	overflow-y: auto;
`;
