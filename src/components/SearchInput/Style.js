import { css } from "@emotion/react";
import colors from "../../constants/color";

export const SSearchBox = css`
	position: relative;
	display: flex;
	align-items: center;
	border: 1px solid #dbdbdb;
	border-radius: 10px;
	padding: 5px 10px;
	width: 100%;
	height: 2.5rem;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
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
	background-color: ${colors.mainBlue};
	transition: all 0.2s ease;
	:hover {
		transform: scale(0.95);
	}

	path {
		color: white;
		font-size: 20px;
	}
`;
