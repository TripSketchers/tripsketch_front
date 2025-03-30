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
    & a {
        background-color: transparent;
        border: 0;
        font-size: 16px;
    }
`;