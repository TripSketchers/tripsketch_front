import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import img from "../../../../assets/MainImg.jpg";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaPlus, FaCheck } from "react-icons/fa6";

function TripPlaceBox(props) {
	return (
		<div css={S.SLayout}>
			<img src={img} alt="" />
			<div css={S.SContainer}>
				<h2 css={S.STitle}>장소명</h2>
				<div>
					<span>명소</span>
					<span css={S.SAddress}>
						8459-8481 Kalanianaʻole Hwy, Honolulu, HI 96825, USA
					</span>
				</div>
				<div css={S.SLikeBox}>
					<span css={S.SLike}>
						<FaHeart /> 2.5
					</span>
					<span css={S.SStar}>
						<FaStar /> 4.5
					</span>
				</div>
			</div>
			<button css={S.SButton}>
				<FaPlus />
				{/* <FaCheck /> */}
			</button>
		</div>
	);
}

export default TripPlaceBox;
