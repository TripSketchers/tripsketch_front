import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function NavContainer({children}) {
    return (
        <div css={SLayout}>
            <div>
                {children}
            </div>
        </div>
    );
}

export default NavContainer;

const SLayout = css`
    position: relative;
    top: -2px;

    display: flex;
    justify-content: center;
    
    & > div {
        position: relative;
        margin: 0 20% 40px;
        border-radius: 10px;
        padding: 30px 40px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
        background-color: white;
        
        width: 100%;
        min-width: 430px;
        min-height: 600px;
    }
    
    h1 {
        font-size: 30px;
        font-weight: 600;
    }
`;
