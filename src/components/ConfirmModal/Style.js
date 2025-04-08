import { css } from "@emotion/react";

export const backdrop = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

export const modal = css`
	background: #fff;
	padding: 30px 40px;
	border-radius: 12px;
	text-align: center;
	width: 360px;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	h2 {
		margin-bottom: 30px;
		font-size: 20px;
	}
	p {
		margin-bottom: 30px;
		font-size: 14px;
		color: #555;
	}
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
