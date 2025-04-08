import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function AlbumWhole(props) {
    const [ sorting, setSorting ] = useState(0); //최신순 : 0, 과거순: 1
    
    const handleSortingClick =(num) => {
        setSorting(num);
    }

    return (
        <div>
            <div css={SSortingBox}>
                <span onClick={() => handleSortingClick(0) } >최신순</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span onClick={() => handleSortingClick(1)} >오래된 순</span>
            </div>
            <span>{"date"}&nbsp;{"place"}</span>
            <div css={SAlbumContainer}>
                {/* div 삽입 */}
                <div></div>
            </div>
        </div>
    );
}

export default AlbumWhole;

const SAlbumContainer = css`
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 174px); /* 기본 5개 */
    margin-top: 10px;

    div {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 170px;
        background-color: lightcoral;
        font-size: 18px;
        font-weight: bold;
    }
`;

const SSortingBox = css`
    position: relative;
    display: flex;
    justify-content: right;
    top: 15px;
    cursor: pointer;
`;