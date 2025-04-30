import { css } from "@emotion/react";

export const STitle = css`
	font-size: 20px;
    font-weight: 600;
    width: 280px;
`;

export const SMessage = css`
	margin: 40px 0;
	font-size: 14px;
	color: #555;
`;

export const buttonGroup = css`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

export const cancelBtn = css`
	flex: 1;
	padding: 10px;
	background: #ddd;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		background: #ccc;
	}
`;

export const deleteBtn = css`
	flex: 1;
	padding: 10px;
	background: #e74c3c;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		background: #c0392b;
	}
`;
