import { css } from "@emotion/react";

export const SSearchBox = css`
	position: relative;
	display: flex;
	align-items: center;
	border: 1px solid #dbdbdb;
	border-radius: 10px;
	padding: 5px 10px;
	width: 100%;
	height: 2.5rem;
	box-shadow: 2px 2px 5px #a7b5b9;
	background-color: white;
	z-index: 1;
`;

export const SInput = css`
	border: none;
	flex: 1;
	font-size: 16px;
	:focus {
		outline: none;
	}
`;

export const SButton = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 5px;
	border-radius: 10px;
	padding: 0 10px;
	width: 20%;
	max-width: 100px;
	height: 100%;
	font-size: 16px;
	background-color: #6ec4d3;
	transition: all 0.2s ease;
	:hover {
		transform: scale(0.95);
	}

	path {
		color: white;
		font-size: 20px;
	}
`;
