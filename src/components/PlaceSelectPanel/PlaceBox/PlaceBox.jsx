import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import img from "../../../assets/default img.png";
import { FaStar } from "react-icons/fa";
import { FaPlus, FaCheck } from "react-icons/fa6";

function PlaceBox({ place, category, onToggle, isAdded }) {

	const handleImageError = (e) => {
		e.target.src = img;
	};

	return (
		<div css={S.SLayout}>
			<img
				src={place.photoUrl || img}
				alt={place.name}
				loading="lazy"
				onError={handleImageError}
			/>
			<div css={S.SContainer}>
				<h2 css={S.STitle}>{place.name}</h2>
				<div>
					<span css={S.SCategory(category)}>{category}</span>
					<span css={S.SAddress}>
						{place.formatted_address.split(" ").slice(2).join(" ")}
					</span>
				</div>
				<div css={S.SLikeBox}>
					<span css={S.SStar}>
						<FaStar /> {place.rating}
					</span>
				</div>
			</div>
			<button css={S.SButton(isAdded)} onClick={onToggle}>
				{isAdded ? <FaCheck /> : <FaPlus />}
			</button>
		</div>
	);
}

export default PlaceBox;
