import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	border-radius: 20px;
	padding: 20px;
	background-color: white;
	box-shadow: 0px 0px 10px rgb(183, 201, 206);
`;

export const SContainer = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 40px;
`;

export const SLabel = css`
	font-size: 16px;
	color: #888;
`;

export const SValue = css`
	font-size: 18px;
	font-weight: 500;
	color: #333;
`;