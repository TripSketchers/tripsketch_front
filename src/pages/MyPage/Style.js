import { css } from "@emotion/react";

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
    padding: 10px 20px 30px 20px;
`;

export const SHeader = css`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    a {
        border-radius: 10px;
        padding: 10px 15px;
        color: white;
        font-size: 16px;
        background-color: rgb(0, 175, 206);
    }
`;

export const STitleBox = css`
    border-bottom: 4px solid #5c86b3;
    padding: 10px 0;
    width: max-content;
    h1 {
        font-size: 22px;
        font-weight: 600;
    }
`;

export const SFilterBox = css`
    padding: 10px 0;

    ul {
        display: flex;
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        padding: 10px 0;
        transition: color 0.3s;

        &:hover, &.active {
            color: #5c86b3;
            font-weight: 600;
        }
    }
`;

export const STripBox = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 190px);
    gap: 20px;
    justify-content: center;
`;
