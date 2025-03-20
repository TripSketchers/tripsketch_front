import { css } from '@emotion/react';

export const SLayout = css`
    position : relative;
    transform : translateY(-100%);
    height: 100px;
    background-color: #f6f6f6;
    color: #a6a6a6;
`;

export const SContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    width: 100%;
    height: 100%;
    font-size: 12px;

    img {
        margin-right: 20px;
        width: 60px;
    }
`;

export const SBox = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 24px;
`;