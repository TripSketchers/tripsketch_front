import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { formatDateRange } from "../../../utils/DateUtils";
import { useTrip } from "../../Routes/TripContext";

function PlanHeader() {
	const { dateRange, tripName } = useTrip();
	return (
		<div css={S.SLayout}>
			<div css={S.STitle}>여행 이름이다아아아ㅏ아아아아아아아ㅏ아아아앙아ㅏㅏ</div>
			<div css={S.SContainer}>
				<div>여행지</div>
				<div>
					{formatDateRange(dateRange.startDate, dateRange.endDate) ||
						"시작날짜~종료날짜"}
				</div>
			</div>
		</div>
	);
}

export default PlanHeader;
