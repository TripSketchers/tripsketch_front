import { css } from "@emotion/react";

export const SSortingBox = css`
    position: relative;
    display: flex;
    justify-content: right;
    top: 15px;
    cursor: pointer;
`;

export const SFolderContainer = css`
    position: relative;
    display: grid;
    gap: 15px 70px;
    margin-top: 20px;
    grid-template-columns: repeat(auto-fill, 265px); /* 기본 3개 */
`;