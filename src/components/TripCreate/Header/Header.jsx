import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaCalendar } from "react-icons/fa";
import { differenceInCalendarDays, format } from "date-fns";

function Header({ selectedStep, dateRange, onOpenModal }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tripName, setTripName] = useState("여행 이름");

    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const formatDateRange = (startDate, endDate) => {
        if (!startDate || !endDate) return "";
        const formattedStart = format(startDate, "yyyy.MM.dd");
        const formattedEnd = format(endDate, "yyyy.MM.dd");
        const duration = differenceInCalendarDays(endDate, startDate) + 1;
        return `${formattedStart} - ${formattedEnd} (${duration}일)`;
    };

    return (
        <div css={S.SLayout}>
            <div css={S.STitle} onClick={handleNameClick}>
                {isEditing ? (
                    <input
                        type="text"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                        css={S.SInput}
                    />
                ) : (
                    <span>{tripName}</span>
                )}
            </div>
            <div>
                <div css={S.STripDes}>여행지</div>
                <div css={S.SDateBox}>
                    <div>
                        {formatDateRange(
                            dateRange.startDate,
                            dateRange.endDate
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
