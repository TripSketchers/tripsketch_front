import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AlbumPhoto from "../../../assets/AlbumPhoto.jpg";
import AlbumDetailModal from '../AlbumDetailModal/AlbumDetailModal';

function AlbumWhole(props) {
    const [ sorting, setSorting ] = useState(0); //최신순 : 0, 과거순: 1
    const [ openDetailModal, setOpenDetailModal ] = useState(0);
    
    const handleSortingClick =(num) => {
        setSorting(num);
    }

    const handle = () => {
        setOpenDetailModal(1);
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
                <div><img src={AlbumPhoto}/></div>
            </div>
            <button onClick={handle}>임시버튼</button>
            {openDetailModal && <AlbumDetailModal /> }
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
        border-radius: 1rem;
        background-color: wheat;
        height: 170px;
        font-size: 18px;
        font-weight: bold;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const SSortingBox = css`
    position: relative;
    display: flex;
    justify-content: right;
    top: 15px;
    cursor: pointer;
`;