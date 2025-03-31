import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import Navbar from '../Navbar/Navbar';

function NavLayout({ children }) {
    return (
        <div css={SLayout}>
            <Navbar />
            {children}
        </div>
    );
}

export default NavLayout;

const SLayout = css`
    position: relative;
    top: 0px;
`;