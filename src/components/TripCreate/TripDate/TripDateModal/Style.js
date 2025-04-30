/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const STitle = css`
    font-size: 30px;
    margin-bottom: 15px;
    font-weight: 500;
`;

export const SSubText = css`
    font-size: 14px;
    color: #555;
    margin-bottom: 24px;
    line-height: 18px;
    & > b {
        text-decoration: underline;
        font-weight: 500;
    }
`;

export const SConfirmButton = css`
    margin: 24px auto 0 auto;
    display: block;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    background-color: rgb(110, 196, 211);
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
