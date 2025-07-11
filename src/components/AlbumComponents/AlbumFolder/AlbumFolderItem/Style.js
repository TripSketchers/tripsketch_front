import { css } from "@emotion/react";
import colors from "../../../../constants/color";

export const SFolder = css`
    position: relative;
    width: 100%;

    path {
        cursor: pointer;
    }
`;

export const SfolderIconWrapper = css`
    height: 230px;          /* 원하는 높이 지정 */
    overflow: hidden;       /* 아이콘의 위/아래 잘라냄 */
    display: flex;
    align-items: center;
    justify-content: center;

    .folderFrame {
        font-size: 265px;
    }
`;

export const SFolderPhotoFrame = css`
    position: absolute;
    top: 52px;
    left: 3px;
    width: 259px;
    height: 159px;
    border-radius: 1.4rem;
    overflow: hidden;
    background-color: white;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.7;
    }
`;

export const SFolderInner = css`
    position: absolute;
    top: 52px;
    width: 100%;

    .missingFlag {
        position: absolute;
        top: 12px;
        right: 34px;
        font-size: 20px;
        path {
            color: ${colors.primaryRed};
        }
    }

    .innerBox {
        //장소, 날짜 Box
        padding: 5px 15px;
        cursor: pointer;
    }

    .infoBox {
        display: flex;
        align-items: center;
        flex-direction: column;

        * {
            color: white;
            text-shadow: 0 0 5px black;
        }
    }

    h3 {
        //장소
        margin-top: 40px;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 30px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
`;
