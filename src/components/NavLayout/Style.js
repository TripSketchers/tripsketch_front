import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

export const SLayout = css`
    position: relative;
    top: 0px;
`;

export const SContainer = css`
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
