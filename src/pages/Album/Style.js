import { css } from '@emotion/react';

export const SLayout = css`
    position: relative;
    top: -2px;
    border-radius: 10px;
    margin-left: clamp(40px, 10vw, 160px);
    margin-right: clamp(40px, 10vw, 160px);
    margin-top: 0;
    margin-bottom: 0;
    padding: 40px 60px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
    background-color: white;
    z-index: 2;

    width: 80%; /* 부모 요소 대비 적절한 크기로 설정 */
    max-width: 1400px; /* 최대 크기 제한 */

    h1 {
        font-size: 30px;
        font-weight: 600;
    }
`;

export const ViewType = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        cursor: pointer;
        border-bottom: 3px solid #51748b;
    }

    a {
        border: 0;
        border-radius: 10px;
        padding: 10px;
        background-color: #51748b;
    }
`;

export const SortingBox = css`
    position: relative;
    display: flex;
    justify-content: right;
    top: 20px;
    cursor: pointer;
`;

export const AlbumContainer = css`
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

export const SFolderContainer = css`
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