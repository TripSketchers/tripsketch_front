import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function Navbar() {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div css={S.SNav}>
            <NavLink to='/trip/plan/:trip_id' css={S.SNavItem(currentPath === "/trip/plan/:trip_id")} >
                    여행 계획
            </NavLink>
            <NavLink to='/trip/album/:trip_id' css={S.SNavItem(currentPath === "/trip/album/:trip_id" || currentPath === "/trip/album/:trip_id/upload")}>
                    여행 앨범
            </NavLink>
        </div>
    );
}

export default Navbar;