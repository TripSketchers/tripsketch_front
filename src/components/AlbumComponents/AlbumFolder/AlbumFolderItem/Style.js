import { css } from "@emotion/react";

export const SFolder = css`
    position: relative;
    width: 100%;

    .folderFrame {
        font-size: 265px;
    }
    path {
        cursor: pointer;
    }
`;

export const SFolderPhotoFrame = css`
    position: absolute;
    top: 70px;
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
    top: 70px;
    width: 100%;
    
    .innerBox {  //장소, 날짜 Box
        padding: 5px 15px;
        cursor: pointer;
    }
    
    .infoBox {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    h3 {        //장소
        margin-top: 40px;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 30px;
    }
`;