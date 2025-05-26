import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCalendar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { formatDateRange } from "../../../utils/DateUtils";
import { useTrip } from "../../Routes/TripContext";

function Header({ selectedStep, onOpenModal }) {
    const { tripDestination, tripInfo, setTripInfo } = useTrip();
    const [isEditing, setIsEditing] = useState(false);
	const [tempTripName, setTempTripName] = useState(tripInfo?.title || "");

    const location = useLocation();
    const { img, koName } = tripDestination || location?.state || {};

	// tripInfo.title이 바뀌면 tempTripName도 동기화
	useEffect(() => {
		setTempTripName(tripInfo?.title || "");
	}, [tripInfo?.title]);

	const handleBlur = () => {
		setIsEditing(false);
		setTripInfo((prev) => ({
			...prev,
			title: tempTripName,
		}));
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setIsEditing(false);
			setTripInfo((prev) => ({
				...prev,
				title: tempTripName,
			}));
		}
	};

    if (!img || !koName) {
        return <div>로딩 중...</div>;
    }

    return (
        <div css={S.SLayout(img || "")}>
            <div css={S.STitle(isEditing)} onClick={() => setIsEditing(true)}>
                {isEditing ? (
                    <input
                        type="text"
                        value={tempTripName}
                        onChange={(e) => setTempTripName(e.target.value)}
                        onBlur={handleBlur}
						onKeyDown={handleKeyDown}
                        autoFocus
                        css={S.SInput}
                    />
                ) : (
                    <span>{tripInfo?.title || "여행 이름을 입력하세요"}</span>
                )}
            </div>
            <div>
                <div css={S.STripDes}>{koName}</div>
                <div css={S.SDateBox}>
                    <div>
                        {formatDateRange(
							tripInfo?.startDate,
							tripInfo?.endDate
                        )}
                    </div>
                    {selectedStep === 1 && (
                        <button onClick={onOpenModal}>
                            <FaCalendar />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
