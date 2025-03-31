import { css } from '@emotion/react';
import reset from 'styled-reset';
/** @jsxImportSource @emotion/react */

export const Common = css`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif' !important; 
        color: #444444;
    }

    a {
        text-decoration: none;
    }

    button{
        background: inherit ; 
        border:none; 
        box-shadow:none; 
        border-radius:0; 
        padding:0; 
        overflow:visible; 
        cursor:pointer;
    }
    
`;