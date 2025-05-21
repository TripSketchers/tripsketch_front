import { css } from "@emotion/react";

export const SLayout = css`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
`;

export const PageButton = css`
    padding: 6px 10px;
    background: #eee;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

export const PageNumber = (active) => css`
    padding: 6px 10px;
    background: ${active ? "#365267" : "#fff"};
    color: ${active ? "#fff" : "#000"};
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: ${active ? "#444" : "#f0f0f0"};
    }
`;
