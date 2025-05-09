import { css } from "@emotion/react";

export const SLayout = css`
    position: relative;
    padding-top: 10px;
`;

export const SSelectMode = css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    gap: 5px;

    button {
        display: flex;
        align-items: center;
        font-size: 16px;
        background-color: #51748b;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        padding: 5px;
        border-radius: 10px;
        color: white;

        * {
            color: white;
        }

        :hover {
            background-color: rgb(47, 102, 136);
            color:rgb(211, 13, 13);
            * {
                color: rgb(211, 13, 13);
            }
        }
    }

    input {
        width: 18px;
        height: 18px;
    }

    .cancel:hover {
        color: #dbdbdb;
    }
`;

export const SScheduleBox = css`
    span {
        font-weight: 600;
    }
`;

export const SAlbumContainer = css`
    margin-bottom: 15px;
`;

export const SAlbumBox = css`
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 177px); /* 기본 5개 */
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
