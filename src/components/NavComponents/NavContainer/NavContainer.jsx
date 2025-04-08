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
    z-index: 2;

    display: flex;
    justify-content: center;
    
    & > div {
        border-radius: 10px;
        padding: 30px 40px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
        background-color: white;
        
        width: 60%; //부모 요소 대비 적절한 크기로 설정
        min-width: 430px;
    }
    
    h1 {
        font-size: 30px;
        font-weight: 600;
    }
`;
