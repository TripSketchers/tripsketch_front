import { css } from '@emotion/react';

export const SFolderContainer = css`
    display: grid;
    gap: 15px 45px;
    margin-top: 20px;
    grid-template-columns: repeat(auto-fill, 200px); /* 기본 3개 */
`;

export const SFolderTap = css`
    position: relative;
    top: 2px;
    left: 10px;
    width: 60px;
    height: 20px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.5);
    z-index: 0;
`;

export const SFolderBody = (img) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 180px;
    background-color: lightcoral;
    /* background-image: ${img}; */
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

export const SSortingBox = css`
    position: relative;
    display: flex;
    justify-content: right;
    top: 15px;
    cursor: pointer;
`;