import { css } from "@emotion/react";

export const SLayout = css`
	position: relative;
	width: 100%;
	height: 900px;
	z-index: 0;
	margin-top: -100px; //헤더 높이만큼 위로 올리기
`;

export const SImg = css`
	width: 100%;
	height: 900px;
	object-fit: cover;
`;

export const SIndicator = css`
	position: absolute;
	left: 50%;
	bottom: 30px;
	transform: translateX(-50%);
	display: flex;
	gap: 8px;
	z-index: 10;

	.dot {
		font-size: 2rem;
		font-weight: bold;
		color: #bbb;
		opacity: 0.5;
		transition: color 0.2s, opacity 0.2s;
		user-select: none;
	}
	.dot.active {
		color: #222;
		opacity: 1;
	}
`;

export const SSearchContainer = css`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 700px;
	top: 35%;
	left: calc(50% - 350px);
	* {
	}

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		width: 100%;
	}

	h1 {
		//문구
		margin-bottom: 50px;
		font-size: 40px;
		line-height: 50px;
		letter-spacing: 1.5px;
		font-weight: 700;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
		color: white;
	}
`;

export const SSearchBox = css`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;

	& > div:first-of-type {
		// SearchInput 컴포넌트 height 조정
		height: 50px;
	}
`;

export const SStartBtn = css`
	* {
		font-size: 20px;
		transition: all 0.2s ease;
		:hover {
			transform: scale(0.95);
		}
	}
`;

export const STripDestinations = css`
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 0;
	width: 100%;
	height: 260px;
	background-color: white;
	border-end-end-radius: 10px;
	border-end-start-radius: 10px;
	padding-top: 10px; /* 스크롤 영역과 스크롤바 모두 10px 아래에서 시작 */
	overflow: auto;

	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		background-color: rgb(240, 240, 240);
		border-radius: 1rem;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	::-webkit-scrollbar-thumb {
		background-color: black;
		border-radius: 1rem;
	}
`;

export const STripDestinationBox = css`
	display: flex;
	align-items: center;
	height: 50px;
	cursor: pointer;

	svg {
		margin: 0 10px;
	}

	:hover {
		background-color: rgba(110, 196, 211, 0.2);
	}
`;

export const STripDestinationName = css`
	display: flex;
	flex-direction: column;
	text-align: left;
	font-size: 12px;

	span {
		margin-bottom: 5px;
		font-size: 16px;
		font-weight: 500;
	}
`;

export const SImgDescription = css`
	position: absolute;
	bottom: 10px;
	left: 10px;
	z-index: 0;

	font-weight: 700;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
	color: white;
`;
