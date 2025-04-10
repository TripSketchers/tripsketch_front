import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCalendar } from "react-icons/fa";

function TripHeader({ selectedStep, onOpenModal }) {
	return (
		<div css={S.SLayout}>
			<div css={S.STitle}>여행 이름</div>
			<div css={S.STripDes}>여행지</div>
			<div css={S.SDateBox}>
				<div>2025.03.24 - 2025.03.26(3일)</div>
				{selectedStep === 1 ? (
					<button onClick={onOpenModal}>
						<FaCalendar />
					</button>
				) : (<></>)}
			</div>
		</div>
	);
}

export default TripHeader;
