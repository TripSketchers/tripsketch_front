import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function Navbar() {
	const { tripId } = useParams();
	const location = useLocation();
	const currentPath = location.pathname;

	if (!tripId) return null;
    
	return (
		<div css={S.SNav}>
			<NavLink
				to={`/trip/plan/${tripId}`}
				css={S.SNavItem(currentPath === `/trip/plan/${tripId}`)}
			>
				여행 계획
			</NavLink>
			<NavLink
				to={`/trip/album/${tripId}`}
				css={S.SNavItem(
					currentPath === `/trip/album/${tripId}` ||
						currentPath === `/trip/album/${tripId}/upload`
				)}
			>
				여행 앨범
			</NavLink>
		</div>
	);
}

export default Navbar;
