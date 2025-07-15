import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import logo from "../../assets/TripSketch.png";
import * as S from "./Style";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineDown } from "react-icons/ai";

function Header(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);
    const location = useLocation(); // 현재 경로 확인

    const [isScrolled, setIsScrolled] = useState(false);

    // 메인페이지면 글자색 white, 아니면 기본
    const isMain = location.pathname === "/";
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // 10px 이상 스크롤 시 true
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogoutOnClick = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            window.location.replace("/tripsketch_front");
        }
    };

    return (
        <div css={S.SLayout(isScrolled, isMain)}>
            <Link to={"/"}>
                <img src={logo} />
                <h1>Trip Sketch</h1>
            </Link>
            <div>
                {!!principalState?.data?.data ? (
                    <div css={S.SDropLayout}>
                        <span className="loginName">
                            {principalState.data.data.email.split("@")[0]}님 
                        </span>
                        <AiOutlineDown />
                        <ul css={S.SDropDown} >
                            <li>
                                <Link to={"/account/mypage"}>마이페이지</Link>
                            </li>
                            <li>
                                <div onClick={handleLogoutOnClick}>
                                    로그아웃
                                </div>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div css={S.SLoginBox(isScrolled, isMain)}>
                        <Link to={"/auth/signin"}>로그인</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
