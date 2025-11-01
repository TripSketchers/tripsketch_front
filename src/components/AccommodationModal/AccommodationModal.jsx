import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { addDays, eachDayOfInterval, format } from "date-fns";
import { FaPlus } from "react-icons/fa6";
import ReactDOM from "react-dom";
import { useTrip } from "../Routes/TripContext";
import fallbackImg from "../../assets/fallbackImg.png";
import ModalLayout from "../ModalLayout/ModalLayout";

function AccommodationModal({ onClose, onConfirm, selectedPlace }) {
    const { tripInfo, storedAccommodations } = useTrip();

    const toKSTDate = (date) => {
        if (typeof date === "string") {
            return new Date(date + "T00:00:00+09:00");
        }
        return date; // 이미 Date 객체면 그대로 반환
    };

    const stayDays =
        tripInfo?.startDate && tripInfo?.endDate
            ? eachDayOfInterval({
                  start: toKSTDate(tripInfo.startDate),
                  end: addDays(toKSTDate(tripInfo.endDate), -1),
              })
            : [];

    const [selectedDateMap, setSelectedDateMap] = useState(() => {
        const initMap = {};
        stayDays.forEach((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            if (storedAccommodations[dateStr]) {
                initMap[dateStr] = storedAccommodations[dateStr];
            }
        });
        return initMap;
    });

    const handleSetDate = (date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        setSelectedDateMap((prev) => {
            const current = prev[dateStr];

            const isSamePlace = (a, b) => {
                if (!a || !b) return false;
                if (a.id && b.id) return a.id === b.id;
                return false;
            };

            // 같은 장소를 다시 클릭하면 토글(제거)
            if (isSamePlace(current, selectedPlace)) {
                const { [dateStr]: _, ...rest } = prev;
                return rest;
            }

            // 아니면 해당 날짜에 장소 지정
            return {
                ...prev,
                [dateStr]: selectedPlace,
            };
        });
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
        <ModalLayout onClose={onClose}>
            <div css={S.SWrapper}>
                <h1 css={S.STitle}>
                    숙소 <span>{selectedPlace.displayName?.text}</span>에서
                    <br />
                    숙박하실 날짜를 선택해주세요.
                </h1>

                <div css={S.SContainer}>
                    {stayDays.map((day) => {
                        const dateStr = format(day, "yyyy-MM-dd");
                        const isSelected = !!selectedDateMap[dateStr];
                        const targetPlace = selectedDateMap[dateStr];
                        const placeName =
                            targetPlace?.displayName?.text ||
                            targetPlace?.name ||
                            "";
                        const photoUrl =
                            selectedDateMap[dateStr]?.imageUrl || fallbackImg;

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
        </ModalLayout>,
        document.body
    );
}

export default AccommodationModal;
