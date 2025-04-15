import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 20px;

    @media (max-width: 1300px) { // SRightContainer 위치 조정
        flex-direction: column;
    }

    h3 { // 제목
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const SLeftContainer = css`
    flex: 1;
`;

export const SRightContainer = css`
    flex: 0.6;

    @media (max-width: 1350px) { // SRightContainer 위치 조정
        flex: 0.7;
    }

    .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    span {
        font-size: 14px;
    }
`;

export const STripBox = css`
    padding: 4px;
    background-color: #d9d9d9;
    border-radius: 1rem;
    overflow: hidden;
`;

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

export const SUploadButton = css`
    margin-top: 10px;
    border-radius: 1rem;
    width: 100%;
    background-color: black;
    color: white;
    padding: 10px;
    font-size: 1.3rem;
    height: 100px;

    @media (max-width: 1300px) { // SRightContainer 위치 조정
        height: 50px;
    }
`;

