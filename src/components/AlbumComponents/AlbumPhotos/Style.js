import { css } from "@emotion/react";

export const SAlbumContainer = css`
    margin-bottom: 15px;
`;

export const SSelectMode = css`
    position: relative;
    display: flex;
    align-items: center;
    button {font-size: 16px;}
`;

export const SScheduleBox = css`
    span {
        font-weight: 600;
    }
`;

export const SAlbumBox = css`
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 174px); /* 기본 5개 */
    margin-top: 10px;
`;

export const SAlbumImg = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background-color: transparent;
    height: 170px;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const SImgCheckBox = css`
    position: absolute;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
`;