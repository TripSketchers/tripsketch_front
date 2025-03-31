import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function AlbumFolder({img, date, place}) {
    return (
        <div>
            <span>{"date"}&nbsp;{"place"}</span>
            <div css={SFolderContainer}>
                {/* 이게 하나임 */}
                <div>
                    <div css={SFolderTap}></div>
                    <div css={SFolderBody(img)}>
                        <span>place</span>
                        <span>date</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumFolder;

// css
const SFolderContainer = css`
    display: grid;
    gap: 15px 50px;
    grid-template-columns: repeat(4, 1fr); /* 기본 3개 */
    
    @media (max-width: 1460px) {
        grid-template-columns: repeat(3, 1fr); /* 화면이 작아지면 3개씩 */
    }

    @media (max-width: 1115px) {
        grid-template-columns: repeat(2, 1fr); /* 화면이 작아지면 3개씩 */
    }
    
    @media (max-width: 780px) {
        grid-template-columns: repeat(1, 1fr); /* 화면이 작아지면 3개씩 */
    }
`;

const SFolderTap = css`
    position: relative;
    top: 2px;
    left: 20px;
    width: 60px;
    height: 20px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.5);
    z-index: 0;
`;

const SFolderBody = (img) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    min-width: 220px;
    height: 180px;
    background-color: lightcoral;
    /* background-image: ${img}; */
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;