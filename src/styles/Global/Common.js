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
    /* 전체 스크롤바에만 스타일 적용 */
    html::-webkit-scrollbar {
        width: 15px;
    }

    html::-webkit-scrollbar-track {
        background-color: #dbdbdb;
        border-radius: 1rem;
    }

    /* 스크롤바 thumb */
    html::-webkit-scrollbar-thumb {
        background-color: #51748b;
        border-radius: 1rem;
        /* Thumb을 작게 보이게 하려면 padding을 줘서 작아 보이게 하는 방식 사용 */
        border: 3px solid #dbdbdb; /* 배경색과 동일하게 처리해 테두리처럼 보이게 */
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