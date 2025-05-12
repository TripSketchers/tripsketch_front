import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    width: 100%;
    height: 100px;
    & img {
        height: 100px;
    }
`;

export const SContainer = css`
    /* margin-right: 30px; */
`;

export const SLoginBox = css`
    background-color: rgb(140, 211, 206);
    border-radius: 20px;
    padding: 15px 35px;
    cursor: pointer;
    width: 100%;

    & * {
        font-weight: 600;
        color: white;
    }

    :active {
        background-color: rgb(106, 175, 171);
    }
`;

export const SDropLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
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
    right: 0px;
    transform: translateX(-10%); /* 한 번에 처리 */
    border: 1px solid #dbdbdb;
    border-radius: 1rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 12rem;
    font-size: 16px;
    z-index: 3;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, transform 0.3s ease-out, visibility 0s linear 0.3s;

    & > li {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    & > li:hover {
        background-color: #dff2f6;
        color: white;
    }

    & li:first-of-type {
        border-bottom: 1px solid #dbdbdb;
        border-radius: 1rem 1rem 0 0;
    }

    & li:last-of-type {
        border-radius: 0 0 1rem 1rem ;
    }

    /* 미디어 쿼리로 작은 화면에서 크기 조정 */
    @media (max-width: 768px) {
        width: 10rem;
    }
`;