import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 30px;

    @media (max-width: 1100px) { // SRightContainer 위치 조정
        flex-direction: column;
    }

    h3 { // 제목
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const SLeftContainer = css`
    
`;

export const SRightContainer = css`
    flex: 1;
`;

export const TripTable = css`
    position: relative; //내부 요소 상대 위치
    display: flex;
    border: 1px solid #ddd;
    padding: 0px 5px 5px 5px;
    text-align: center;
    font-size: 18px;

    .title {
        padding: 5px 10px;
    }

    div:nth-child(2) {
        flex: 1;
    }
`;

export const Scroll = css`
    display: flex;
    flex-direction: column;
    max-height: 150px; /* 최대 5개까지만 보이도록 제한 */
    overflow-y: auto;
    list-style: none;
    width: 100%;
    
    & li {
        margin-bottom: 2px;
        padding: 8px 15px;
        background-color: #f0f0f0;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
    }

    & li:active {
        background-color: #d6d6d6;
        color: black;
    }

    &::-webkit-scrollbar{
        width: 3px; /* 스크롤바 너비 */
    }
`;

export const SContent = css`
    textarea {
        padding: 10px;
        width: 100%;
        height: 260px;
        resize: none;
    }
`;

export const UploadButton = css`
    display: flex;
    justify-content: right;
    margin-top: 10px;
`;

