import { css } from '@emotion/react';

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

export const SFolder = css`
    position: relative;
    width: 100%;

    .folderFrame { font-size: 265px; }
    path { cursor: pointer; }
`;

export const SFolderPhotoFrame = css`
    position: absolute;
    z-index: 1;
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

    .infoBox {  //장소, 날짜 Box
        position: absolute;
        text-align: center;
        z-index: 2;
        top: 50px;
        width: 100%;
    }
    
    h3 {      //장소
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 30px;
    }
`;

export const SFolderMoreBtn = css`
    .folderMoreBtn {
        position: absolute;
        font-size: 34px;
        top: 75px;
        right: 6px;
        z-index: 2;
        cursor: pointer;
    }

    .folderMoreModal {
        position: absolute;
        z-index: 4;
        top: 75px;
        right: -70px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        width: 80px;
        height: 30px;
    }

    .folderMoreModal:hover {
        background-color: #dff2f6;
    }
`;

export const SModalBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SModal = css`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 1rem;
  width: 300px;
  text-align: center;

  .closeBtn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
  }

    .btnGroup {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }

    button {
        padding: 8px 16px;
        border-radius: 10px;
        cursor: pointer;
        border: none;
        font-weight: 600;
    }

    button:first-of-type {
        background-color: #ff7675;
        color: white;
    }

    button:last-of-type {
        background-color: #dff2f6;
    }
`;
