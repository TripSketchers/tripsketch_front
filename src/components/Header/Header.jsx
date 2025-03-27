import React from 'react';
/** @jsxImportSource @emotion/react */
import logo from '../../assets/TripSketch_가로.png'
import * as S from './Style';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div css={S.SLayout}>
            <Link to={"/"} >
                <img src={logo} />
            </Link>
            <div css={S.SContainer}>
                <Link to={"/auth/signin"} >로그인</Link>
            </div>
        </div>
    );
}

export default Header;