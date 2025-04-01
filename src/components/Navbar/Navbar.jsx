import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function Navbar() {
    // const [activeLink, setActiveLink] = useState("/album");

    // const handleClick = (link) => {
    //     setActiveLink(link); // 클릭한 링크의 경로 저장
    // };

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div css={S.SNav}>
            <NavLink to='/plan' css={S.SNavItem(currentPath === "/plan")} >
                    여행 계획
            </NavLink>
            <NavLink to='/album' css={S.SNavItem(currentPath === "/album" || currentPath === "/album/upload")}>
                    여행 앨범
            </NavLink>
        </div>
    );
}

export default Navbar;