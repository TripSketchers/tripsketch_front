/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

export const activeCircle = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const color = "#FF5733";
const color2 = "rgba(250, 41, 26, 0.5)";

export const Txt = css`
	display: block;
	font-size: 1.375em;
	letter-spacing: 0.04545em;
	color: ${color};
	font-weight: 600;
`;

export const SLayout = css`
	position: sticky;
	bottom: 120px;
	left: 50%;
	transform: translateX(-50%);
	width: 120px;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MoreBtn = css`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
	padding: 0 0 2px 2px;
	border-radius: 50%;
	line-height: 1;
	color: #fff;
	background: ${color};
	filter: drop-shadow(2px 8px 15px ${color});
	cursor: pointer;
	& > span {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		border: 1px solid ${color2};
		border-radius: 50%;
		animation: ${activeCircle} 1.5s cubic-bezier(1, 2, 0.66, 3) infinite;
	}

	& > span:nth-of-type(2) {
		animation-delay: 0.5s;
	}

	& > span:nth-of-type(3) {
		animation-delay: 1s;
	}

	svg {
		* {
			color: #fff;
		}
		margin: auto;
		font-size: 29px;
		transition: transform 0.4s;
	}

	&:hover svg {
		transform: rotate(270deg);
	}
`;
