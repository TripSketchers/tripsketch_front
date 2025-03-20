import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function SigninButton({ onClick, children }) {
    return (
        <button onClick={onClick} css={S.SLayout}>
            {children}
        </button>
    );
}

export default SigninButton;