import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 5%;
    padding: 0 50px;
    `;

export const SContainer = css`
    max-width: 1100px;
    width: 100%;
    height: 100%;
`;

export const SProfileContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px;
`;

export const SUser = css`
    padding: 10px 0 5px;
`;

export const SEditBtn = css`
    color: #0888d8;
    font-size: 12px;
`;

export const SProfile = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    background-color:rgb(245, 245, 245);
    img {
        padding: 10px;
        width: 100%;
        height: 100%;
    }
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