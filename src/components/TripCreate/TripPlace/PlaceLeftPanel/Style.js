import { css } from "@emotion/react";

export const SLayout = css`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    width: 50%;
    height: 100%;
`;

export const STabWrapper = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: calc(100% - 35px);
`;

export const STabSelector = css`
    display: flex;
    gap: 5px;
`;

export const STab = (isActive) => css`
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100px;
    height: 35px;
    color: ${!isActive && "#fff"};
    font-size: 15px;
    font-weight: 500;
    background: ${isActive ? "#fff" : "#52939e"};
    box-shadow: ${isActive ? "2px -4px 5px #37626a50" : "none"};
    z-index: ${isActive ? 2 : 0};
    cursor: pointer;
`;

export const STabContent = css`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgb(235, 235, 235);
    overflow-y: hidden;
    background: #fff;
    z-index: 1;
    box-shadow: -2px -4px 5px #37626a50;
`;

export const SSearchBox = css`
    padding: 10px;

    input {
        font-size: 14px;
    }

    path {
        font-size: 16px;
    }
`;

export const SPlaceContainer = css`
    overflow-y: auto;
    flex: 1;
    margin-bottom: 10px;
`;