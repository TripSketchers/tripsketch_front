import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 10%;
`;

export const SContainer = css`
    max-width: 1100px;
    width: 100%;
    height: 100%;
`;

export const STripContainer = css`
    padding: 10px 20px;
`;

export const STitleBox = css`
    margin-bottom: 30px;
    border-bottom: 4px solid #5C86B3;
    padding: 10px 0;
    width: max-content;
    h1 {
        font-size: 22px;
        font-weight: 600;
    }
`;

export const STripBox = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 190px);
    gap: 20px;
    justify-content: center;
`;