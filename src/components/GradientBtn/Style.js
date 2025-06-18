import { css } from "@emotion/react";

export const SaveBtnStyle = css`
	min-width: 180px;
	font-size: 16px;
	font-weight: 600;
	color: #fff;
	cursor: pointer;
	margin: 20px;
	height: 50px;
	text-align: center;
	border: none;
	background-size: 300% 100%;

	border-radius: 50px;
	-moz-transition: all 0.4s ease-in-out;
	-o-transition: all 0.4s ease-in-out;
	-webkit-transition: all 0.4s ease-in-out;
	transition: all 0.4s ease-in-out;

	background-image: linear-gradient(
		to right,
		#cdffd8,
		#94b9ff,
		#6b9cff,
		rgb(177, 255, 194)
	);
	box-shadow: 0 4px 15px 0 rgba(58, 130, 212, 0.5);

	:hover {
		background-position: 100% 0;
		-moz-transition: all 0.4s ease-in-out;
		-o-transition: all 0.4s ease-in-out;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}

	:focus {
		outline: none;
	}
`;
