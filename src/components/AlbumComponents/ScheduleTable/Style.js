import { css } from '@emotion/react';

export const STripTable = css`
    position: relative; //내부 요소 상대 위치
    display: flex;
    text-align: center;
    font-size: 18px;

    .title {
        padding: 5px 10px;
    }

    div:nth-child(2) {
        flex: 1;
    }

    ul {
        padding: 3px;
    }
`;

export const SScroll = css`
    display: flex;
    flex-direction: column;
    height: 535px;
    overflow-y: auto;
    list-style: none;
    width: 100%;

    &::-webkit-scrollbar{
        width: 3px; /* 스크롤바 너비 */
    }
`;

export const SSelectSchedule = (isActive) => css`
    margin-bottom: 2px;
    padding: 8px 15px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    background-color: ${isActive ? "#51748b" : "white"};
    color: ${isActive ? "white" : ""};

    &:active {
        background-color: #d6d6d6;
        color: black;
    }
`;
