import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const STripTable = css`
    position: relative;
    display: flex;
    gap: 5px;
    font-size: 18px;

    .title {
        padding: 5px 0;
        text-align: center;
    }

    div:nth-of-type(2) {
        flex: 1;
        min-width: 0;
    }
`;

export const SScroll = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 260px;
    overflow-y: auto;

    /* ✅ 브라우저 기본 스타일 초기화 */
    padding: 0 !important;
    margin: 0 !important;
    list-style: none;

    flex: 1;
    min-width: 0;

    @media (min-width: 1300px) {
        min-height: 435px;
    }

    ::-webkit-scrollbar {
        width: 3px;
    }

    ::-webkit-scrollbar-track {
		background-color: white;
		border-radius: 1rem;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${colors.primaryLightGray};
		border-radius: 1rem;
	}
`;

export const SSelectSchedule = (isActive) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 34px;
    margin-bottom: 3px;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${isActive ? colors.primaryButton : "white"};
    color: ${isActive ? "white" : "black"};
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;

    &:active {
        background-color: #d6d6d6;
        color: black;
    }
`;
