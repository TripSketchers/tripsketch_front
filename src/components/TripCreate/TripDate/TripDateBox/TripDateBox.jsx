import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function TripDateBox({ date, startTime }) {
	const [time, setTime] = useState(startTime);

	return (
		<div css={S.SLayout}>
			<div css={S.SContainer}>
				<div css={S.SLabel}>일자</div>
				<div css={S.SValue}>{date}</div>
			</div>
			<div css={S.SContainer}>
				<div css={S.SLabel}>시작 시간</div>
				<input
					type="time"
					value={time}
					onChange={(e) => setTime(e.target.value)}
					css={S.STimeInput}
				/>
			</div>
		</div>
	);
}

export default TripDateBox;
