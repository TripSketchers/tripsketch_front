import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function AlbumWhole(props) {
    return (
        <div>
            <span>{"date"}&nbsp;{"place"}</span>
            <div css={AlbumContainer}>
                {/* div 삽입 */}
            </div>
        </div>
    );
}

export default AlbumWhole;

const AlbumContainer = css`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr); /* 기본 5개 */
    margin-top: 10px;

    @media (max-width: 1154px) {
        grid-template-columns: repeat(4, 1fr); /* 화면이 작아지면 3개씩 */
    }
    
    @media (max-width: 954px) {
        grid-template-columns: repeat(3, 1fr); /* 화면이 작아지면 3개씩 */
    }

    @media (max-width: 754px) {
        grid-template-columns: repeat(2, 1fr); /* 더 작아지면 2개씩 */
    }

    @media (max-width: 554px) {
        grid-template-columns: repeat(1, 1fr); /* 모바일에서는 1개씩 */
    }

    div {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        min-width: 150px;
        height: 150px;
        background-color: lightcoral;
        font-size: 18px;
        font-weight: bold;
    }
`;
