import { css } from "@emotion/react";

export const SSortingBox = css`
    float: right;
    position: relative;
    top: -35px;

    span {
        cursor: pointer;
        
        &:hover {
            text-decoration: underline;
            font-weight: 500;
        }
    }
`;

export const SFolderLayout = css`
    padding-top: 5px;
`;

export const SDateBox = css`
    span {
        font-weight: 600;
    }
`;

export const SBackButton = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;

    svg {
        margin-right: 5px;
        border-radius: 50%;
        color:rgb(255, 255, 255);
    }
`;

export const SFolderContainer = css`
    position: relative;
    display: grid;
    gap: 15px 70px;
    grid-template-columns: repeat(auto-fill, 265px); /* 기본 3개 */
`;