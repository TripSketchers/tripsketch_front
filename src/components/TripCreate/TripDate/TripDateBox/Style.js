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
	flex-direction: column;
	justify-content: space-between;
	height: 40px;
`;

export const SLabel = css`
	font-size: 14px;
	color: #888;
`;

export const SValue = css`
	font-size: 16px;
	font-weight: 500;
	color: #333;
`;

export const STimeInput = css`
	width: 90px;
	
	font-size: 16px;
	border: none;
	outline: none;
	line-height: 16px;

	&::-webkit-calendar-picker-indicator {
		display: none;
		-webkit-appearance: none;
	}
`;
