import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const STripTable = css`
    position: relative;
    display: flex;
    font-size: 18px;

    .title {
        padding: 5px 0;
        text-align: center;
    }

    div:nth-of-type(2) {
        flex: 1;
        min-width: 0;
    }

    ul {
        width: 100%;
        padding: 3px;
        margin: 0;
    }
`;

export const SScroll = css`
    display: flex;
    flex-direction: column;
    height: 435px;
    overflow-y: auto;
    list-style: none;

    flex: 1;
    min-width: 0;

    &::-webkit-scrollbar {
        width: 3px;
    }
`;

export const SSelectSchedule = (isActive) => css`
    margin-bottom: 3px;
    padding: 8px 15px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    background-color: ${isActive ? colors.primaryButton : "white"};
    color: ${isActive ? "white" : ""};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;

    &:active {
        background-color: #d6d6d6;
        color: black;
    }
`;
