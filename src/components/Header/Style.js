import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    & img {
        height: 100px;
    }
`;

export const SContainer = css`
    margin-right: 30px;
`;

export const SLoginBox = css`
    background-color: rgb(140, 211, 206);
    border-radius: 20px;
    padding: 15px 35px;
    cursor: pointer;
    & * {
        font-weight: 600;
        color: white;
    }

    :active {
        background-color: rgb(106, 175, 171);
    }
`;