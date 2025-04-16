import { css } from '@emotion/react';
// 폰트 링크 동적 추가
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

export const backdrop = css`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export const modal = css`
    background: #fff;
    padding: 10px;
    width: 440px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);

    * {
        font-family: "Nanum Pen Script", cursive !important;
        font-weight: 400;
        font-style: normal;
    }
`;

export const closeBtn = css`
    display: flex;
    justify-content: right;
    button { font-size: 1.2rem; }
`;

export const SPhotoContainer = css`
    width: 100%;
    height: 420px;
    background-color: black;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const SPhotoMemo = css`
    width: 100%;
    height: 70px;
    margin: 8px 0;
    font-size: 22px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px; /* 세로 스크롤일 경우 */
    }

    &::-webkit-scrollbar-track {
        background-color: #dbdbdb;
        border-radius: 1rem;
    }

    /* 스크롤바 thumb */
    &::-webkit-scrollbar-thumb {
        background-color: black;
        border-radius: 1rem;
    }
`;

export const SEditBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    svg {
        display: flex;
        justify-content: center;
    }
`;

export const deleteBtn = css`
    padding: 0;
    font-size: 19px;
    margin-right: 5px;

    svg { padding-bottom: 2px; }
    
    & path:hover {
        color: #da2a2a;
    }
`;

export const editBtn = css`
    font-size: 22px;

    & path:hover {
        color: #3731db;
    }
`;
