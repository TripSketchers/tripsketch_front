import React from 'react';
/** @jsxImportSource @emotion/react */
import logo from '../../assets/TripSketch_가로.png'
import * as S from './Style';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function Header(props) {

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);

    return (
        <div css={S.SLayout}>
            <Link to={"/"} >
                <img src={logo} />
            </Link>
            <div css={S.SContainer}>
                {!!principalState?.data?.data ? 
                <span>반가워요, {principalState.data.data.email.split("@")[0]}님!</span> : 
                <div css={S.SLoginBox}><Link to={"/auth/signin"} >로그인</Link></div>}
            </div>
        </div>
    );
}

export default Header;