import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    border: 2px solid #dbdbdb;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
    max-width: 220px;
    aspect-ratio: 1 / 1;       /* 정사각형 비율 유지*/
    cursor: pointer;
`;

export const SHeader = css`
    width: 100%;
    display: flex;
    justify-content: center;  /* 좌우 끝 정렬 */
    align-items: flex-start;
    position: relative;
`;

export const SDday = css`
    margin: 10px 0;
    border-radius: 20px;
    background-color: #365267;
    color: white;
    width: 70px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
`

export const SMenu = css`
    position: absolute;
    top: 0px;
    right: -5px;
    * {
        font-size: 22px;
    }
`

export const STitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
`

export const SLocation = css`
    padding: 5px;
`

export const SDateRange = css`
    padding: 5px;
    font-size: 14px;
`