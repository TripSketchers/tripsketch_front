import React from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import * as S from "./Style"
import Navbar from '../Navbar/Navbar';

function NavLayout({ children }) {
    return (
        <div css={S.SLayout}>
            <Navbar />
            {children}
        </div>
    );
}

export default NavLayout;