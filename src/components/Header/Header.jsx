import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import logo from '../../assets/TripSketch_가로.png'
import * as S from './Style';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'

function Header(props) {

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);

    // const [view, setView] = useState(false); 

    // const dropdownRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    //             setView(false);
    //         }
    //     };

    //     document.addEventListener('click', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    const handleLogoutOnClick = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            window.location.replace("/");
        }
    }

    // const toggleDropdown = (e) => {
    //     e.stopPropagation();    // 이벤트가 부모로 전파되지 않도록 처리
    //     setView(!view);
    // };

    return (
        <div css={S.SLayout}>
            <Link to={"/"} >
                <img src={logo} />
            </Link>
            <div css={S.SContainer}>
                {!!principalState?.data?.data ? (
                <div css={S.SDropLayout}>
                    <span>반가워요, {principalState.data.data.email.split("@")[0]}님!</span> 
                    <AiOutlineDown/>
                    <ul css={S.SDropDown}>
                        <li><Link to={"/account/mypage"} >마이페이지</Link></li>
                        <li><div onClick={handleLogoutOnClick}>로그아웃</div></li>
                    </ul>
                </div>
                ) : 
                <div css={S.SLoginBox}><Link to={"/auth/signin"} >로그인</Link></div>}
            </div>
        </div>
    );
}

export default Header;