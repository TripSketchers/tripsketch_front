import { css } from '@emotion/react';
import reset from 'styled-reset';
/** @jsxImportSource @emotion/react */

export const Common = css`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif !important;
        color: #444444;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    button {
        cursor: pointer;
    }
`;