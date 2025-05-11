import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { formatDateRange } from "../../../utils/DateUtils";
import { useTrip } from "../../Routes/TripContext";

function PlanHeader() {
    const { tripInfo } = useTrip();

    return (
        <div css={S.SLayout}>
            <div css={S.STitle}>
                {tripInfo?.title || "여행 이름을 입력하세요"}
            </div>
            <div css={S.SContainer}>
                <div>{tripInfo?.tripDestinationKoName || "여행지"}</div>
                <div>
                    {formatDateRange(tripInfo?.startDate, tripInfo?.endDate) ||
                        "시작날짜 ~ 종료날짜"}
                </div>
            </div>
        </div>
    );
}

export default PlanHeader;
