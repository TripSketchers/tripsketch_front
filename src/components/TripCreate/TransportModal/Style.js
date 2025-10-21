import { css } from "@emotion/react";

export const STitle = css`
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 600;
`;

export const SMessage = css`
    font-size: 14px;
    color: rgb(150, 150, 150);
`;

export const optionList = css`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
    & > div {
        display: flex;
        flex-direction: column;
    }
`;

export const option = (isSelected) => css`
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 10px;
    background-color: ${isSelected ? "#4CAF50" : "#f0f0f0"};
    font-size: 18px;
    font-weight: 500;
    width: 150px;
    height: 130px;
    cursor: pointer;

    * {
        color: ${isSelected ? "white" : "#333"};
    }

    &:hover {
        background-color: ${isSelected ? "#45a049" : "#e0e0e0"};
    }

    svg {
        font-size: 35px;
    }
`;

export const icon = css`
    flex-shrink: 0;
`;

export const notice = css`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #d75252ff;
    margin: 10px 0;
    font-size: 14px;
`;

export const confirmBtn = css`
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    background: #2196f3;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        background-color: #9e9e9e;
        cursor: not-allowed;
    }
`;
