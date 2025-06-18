import { css } from "@emotion/react";
import { getColorByCategory } from "../../../utils/CategoryUtils";

export const SLayout = (isPlace) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 5px;
    border-radius: 10px;
    padding: ${isPlace ? "10px 10px 10px 5px" : "10px"};
    font-size: 14px;
    box-shadow: 3px -2px 8px rgb(203, 203, 203);
    height: 70px;
    cursor: pointer;
    img {
        border-radius: 10px;
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
`;

export const SContainer = css`
    display: flex;
`;

export const SIndexBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    color: rgb(170, 170, 170);
`;

export const SInfoContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 5px 0 10px;
    width: 150px;
    height: 100%;
    span {
        line-height: 16px;
        font-size: 11px;
    }
    * {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const STitle = css`
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
`;

export const SCategory = (category) => css`
    color: ${getColorByCategory(category)};
`;

export const SAddress = css`
    color: #777777;
`;

export const STimeContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > span {
        font-size: 12px;
        margin-bottom: 5px;
    }
`;

export const STimeBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    border-radius: 5px;
    padding: 5px;
    font-size: 12px;
    background-color: rgb(230, 230, 230);
    white-space: nowrap;
    cursor: pointer;
`;

export const SDeleteBtn = css`
    * {
        color: rgb(100, 100, 100);
        :hover {
            color: #e35454;
        }
    }
`;
