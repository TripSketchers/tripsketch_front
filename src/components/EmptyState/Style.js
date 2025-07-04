import { css } from '@emotion/react';
export const SLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    color: #666;
    text-align: center;
    height: 100%;

    img {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        opacity: 0.6;
    }

    p {
        margin-bottom: 12px;
        font-size: 16px;
        color: #666;
    }

    button {
        padding: 8px 16px;
        background-color: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }

    button:hover {
        background-color: #357ab8;
    }
`;