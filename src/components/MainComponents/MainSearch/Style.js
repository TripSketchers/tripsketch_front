import { css } from "@emotion/react";
import colors from "../../../constants/color";

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
		color:  white;
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
    padding: 20px 5px 10px 5px;
	overflow: auto;

	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background-color: white;
		border-radius: 1rem;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${colors.primaryLightGray};
		border-radius: 1rem;
	}
`;

export const STripDestinationBox = css`
	position: relative;
	display: flex;
	align-items: center;
	height: 50px;
	cursor: pointer;
    border-radius: 10px;

    :hover {
        background-color: ${colors.mainLightBlue};
    }

	svg {
		margin: 0 10px;
	}

	/* -> 여행 생성하기 텍스트 */
	.create-trip-hint {
        display: flex;
        justify-content: center;
        align-items: center;
		opacity: 0;
		position: absolute;
		right: 18px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0.98rem;
		color: ${colors.mainBlue};
		font-weight: 600;
		pointer-events: none;
		transition: opacity 0.2s;
		white-space: nowrap;
        * {
            color: ${colors.mainBlue};
        }
	}

	&:hover .create-trip-hint {
		opacity: 1;
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
