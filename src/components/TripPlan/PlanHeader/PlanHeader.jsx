import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { formatDateRange } from "../../../utils/DateUtils";
import { useTrip } from "../../Routes/TripContext";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../../assets/w1.jpg"; // 기본 이미지 경로

function PlanHeader() {
    const { tripInfo, tripDestination } = useTrip();
    const navigate = useNavigate();

    if (!tripDestination?.img) {
        return <div>로딩 중...</div>;
    }

    return (
        <div css={S.SLayout(tripDestination?.img || defaultImage)}>
            <div css={S.STitle}>
                {tripInfo?.title || "여행 이름을 입력하세요"}
            </div>
            <div css={S.SContainer}>
                <div>{tripInfo?.tripDestinationKoName || "여행지"}</div>
                <div>
                    {formatDateRange(tripInfo?.startDate, tripInfo?.endDate) ||
                        "시작날짜 ~ 종료날짜"}
                </div>
                <div
                    css={S.SButton}
                    onClick={() =>
                        navigate("/trip/create", {
                            state: {
                                editMode: true,
                                tripId: tripInfo?.tripId, // tripId도 함께 전달
                            },
                        })
                    }
                >
                    <MdEdit />편집
                </div>
            </div>
        </div>
    );
}

export default PlanHeader;
