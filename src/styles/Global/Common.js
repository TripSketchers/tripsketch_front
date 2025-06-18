import { css } from '@emotion/react';
import reset from 'styled-reset';
/** @jsxImportSource @emotion/react */

export const Common = css`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif' !important; 
        color: #444444;

        ::-webkit-scrollbar {
            width: 14px;
            height: 14px;
        }
        
        ::-webkit-scrollbar-thumb {
            outline: none;
            border-radius: 10px;
            border: 4px solid transparent;
            box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.15);
            cursor: pointer;
        }

        ::-webkit-scrollbar-thumb:hover {
            border: 4px solid transparent;
            box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
        }

        ::-webkit-scrollbar-track {
            box-shadow: none;
            background-color: transparent;
        }
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    button {
        cursor: pointer;
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