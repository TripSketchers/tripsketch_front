import { css } from "@emotion/react";
import colors from "../../constants/color";

export const SLayout = (isScrolled, isMain) => css`
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30px;
	width: 100%;
	height: 100px;
	background-color: transparent;
	z-index: 10;
	${(isMain && !!isScrolled) || !isMain
		? "background-color: white;"
		: "background-color: transparent;"};
	transition: background-color 0.3s, color 0.3s;

	a {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	img {
		height: 90px;
	}

	h1 {
		font-size: 45px;
		font-weight: 400;
		margin-left: 10px;
		font-family: "Ultra", serif !important;
		${(isMain && !!isScrolled) || !isMain
			? "color: #a1c8f6;"
			: "color: white;"}
		${(isMain && !!isScrolled) || !isMain
			? ""
			: "text-shadow: 2px 2px 4px rgb(135, 135, 135);"}
	}

	.loginName,
	path {
		${(isMain && !!isScrolled) || !isMain
			? "color: black;"
			: "color: white;"}
	}
`;

export const SLoginBox = (isScrolled, isMain) => css`
	${!isScrolled && isMain && "border: 1.5px solid white;"}
	${(isScrolled || !isMain) && "background-color: " + colors.mainBlue + ";"}
    border-radius: 15px;
	padding: 15px 35px;
	width: max-content;
	cursor: pointer;

	& * {
		font-weight: 700;
		color: white;
	}

	:active {
		${(isScrolled || !isMain) &&
		"background-color: " + colors.mainBlueHover + ";"}
	}
`;

export const SDropLayout = css`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	cursor: pointer;

	& svg {
		margin-left: 5px;
		transition: transform 0.2s ease;
	}

	&:hover svg {
		transform: rotate(180deg); /* 클릭 시 화살표 회전 효과 */
	}

	&:hover > ul {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.3s;
	}
`;

export const SDropDown = css`
	position: absolute;
	top: 70px;
	right: 10px;
	transform: translateX(-10%); /* 한 번에 처리 */
	border: 1px solid #dbdbdb;
	border-radius: 15px;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	background-color: #fff;
	width: 180px;
	font-size: 16px;
	z-index: 3;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s, transform 0.3s ease-out, visibility 0s linear 0.3s;
	* {
		color: black;
	}

	a,
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		cursor: pointer;
		width: 100%;
	}

	& > li {
		transition: background-color 0.2s ease, color 0.2s ease;
        margin: 8px;
        border-radius: 10px;
	}

	& > li:hover {
		background-color: ${colors.primaryLightGray};
	}

	/* 미디어 쿼리로 작은 화면에서 크기 조정 */
	@media (max-width: 768px) {
		width: 10rem;
	}
`;
