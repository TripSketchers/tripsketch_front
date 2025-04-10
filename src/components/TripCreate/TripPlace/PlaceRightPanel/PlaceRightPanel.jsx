import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCheck } from "react-icons/fa6";
import StoredPlaceBox from "../StoredPlaceBox/StoredPlaceBox";

function PlaceRightPanel(props) {
	return (
		<div css={S.SLayout}>
			<div>보관함</div>
			<div>
				<div>
                    <FaCheck /> 담긴 개수
                </div>
				<button>초기화</button>
			</div>
			<div>
                <StoredPlaceBox/>
            </div>
		</div>
	);
}

export default PlaceRightPanel;
