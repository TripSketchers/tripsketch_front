import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { addDays, eachDayOfInterval, format } from "date-fns";
import { FaPlus } from "react-icons/fa6";
import ReactDOM from "react-dom";
import { useTrip } from "../TripCreate/TripContext";
import fallbackImg from "../../assets/fallbackImg.png";

function AccommodationModal({ onClose, onConfirm, dateRange, selectedPlace }) {
    const { storedAccommodation } = useTrip();

    const stayDays = eachDayOfInterval({
        start: dateRange.startDate,
        end: addDays(dateRange.endDate, -1),
    });

    const [selectedDateMap, setSelectedDateMap] = useState(() => {
        const initMap = {};
        stayDays.forEach((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            if (storedAccommodation[dateStr]) {
                initMap[dateStr] = storedAccommodation[dateStr];
            }
        });
        return initMap;
    });

    const handleBackdropClick = () => onClose();
    const handleModalClick = (e) => e.stopPropagation();

    const handleSetDate = (date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        setSelectedDateMap((prev) => ({
            ...prev,
            [dateStr]: selectedPlace,
        }));
    };

    const handleSelectAll = () => {
        const allMapped = {};
        stayDays.forEach((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            allMapped[dateStr] = selectedPlace;
        });
        setSelectedDateMap(allMapped);
    };

    return ReactDOM.createPortal(
        <div css={S.backdrop} onClick={handleBackdropClick}>
            <div css={S.modal} onClick={handleModalClick}>
                <h1 css={S.STitle}>
                    숙소 <span>{selectedPlace.name}</span>에서
                    <br />
                    숙박하실 날짜를 선택해주세요.
                </h1>

                <div css={S.SContainer}>
                    {stayDays.map((day) => {
                        const dateStr = format(day, "yyyy-MM-dd");
                        const isSelected = !!selectedDateMap[dateStr];
                        const photoUrl =
                            selectedDateMap[dateStr]?.imageUrl || fallbackImg;
                        const placeName = selectedDateMap[dateStr]?.name;

                        return (
                            <div
                                key={dateStr}
                                css={S.SBox(isSelected, photoUrl)}
                                onClick={() => handleSetDate(day)}
                            >
                                <p css={S.SDateTag}>{format(day, "MM.dd")}</p>
                                <div css={S.SImageBox(isSelected, photoUrl)}>
                                    {!isSelected && <FaPlus />}
                                </div>
                                <span css={S.SPlaceName}>{placeName}</span>
                            </div>
                        );
                    })}
                </div>

                <div css={S.SBtnContainer}>
                    <button css={S.selectAllBtn} onClick={handleSelectAll}>
                        전체 선택
                    </button>
                    <div css={S.buttonGroup}>
                        <button css={S.cancelBtn} onClick={onClose}>
                            취소
                        </button>
                        <button
                            css={S.selectBtn}
                            onClick={() => onConfirm(selectedDateMap)}
                        >
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default AccommodationModal;
