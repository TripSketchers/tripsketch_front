import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Folder({img, date, place}) {
    return (
        <div>
            <div css={SFolderTap}></div>
            <div css={SFolderBody(img)}>
                <span>place</span>
                <span>date</span>
            </div>
        </div>
    );
}

export default Folder;

// css
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