import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import {
    IoBedOutline,
    IoCalendarClearOutline,
    IoLocationOutline,
    IoCreateOutline,
} from "react-icons/io5";
import TransportModal from "../TransportModal/TransportModal";
import { instance } from "../../../api/config/instance";
import { useTrip } from "../TripContext";
import { convertStoredAccommodationMapToArray } from "../../../utils/StoredAccommdationsUtils";
import { useNavigate } from "react-router-dom";

function Sidebar({ selectedStep, setSelectedStep }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { tripName, dateRange, storedPlaces, storedAccommodations } =
        useTrip();

    const handleSaveBtnOnClick = () => {
        setShowModal(true);
    };

    const handleTransportSelect = async (selectedTransport) => {
        try {
            const mergedAccommodations =
                convertStoredAccommodationMapToArray(storedAccommodations);

            const reqData = {
                trip: {
                    title: tripName,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    tripDestinationId: 5, // 임시 고정값
                    transportType: selectedTransport,
                },
                storedPlaces: storedPlaces.map((place) => ({
                    place: {
                        googlePlaceId: place.id,
                        name: place.displayName?.text,
                        address: place.formattedAddress,
                        latitude: place.location.latitude,
                        longitude: place.location.longitude,
                        category: place.category,
                        rating: place.rating,
                        photoReference: place.photos?.[0]?.name || "",
                    },
                    stayTime: place.stayTime ?? 120, // 기본값 2시간
                })),
                storedAccommodations: mergedAccommodations.map((item) => ({
                    place: {
                        googlePlaceId: item.place.id,
                        name: item.place.displayName?.text,
                        address: item.place.formattedAddress,
                        latitude: item.place.location.latitude,
                        longitude: item.place.location.longitude,
                        category: item.place.category,
                        rating: item.place.rating,
                        photoReference: item.place.photos?.[0]?.name || "",
                    },
                    checkInDate: item.checkInDate,
                    checkOutDate: item.checkOutDate,
                })),
            };
            await instance.post("/trip", reqData, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            alert("여행이 생성되었습니다!");
            navigate("/account/mypage");
        } catch (err) {
            console.error(err);
            alert("여행 생성에 실패했습니다.");
        }
    };

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div>
                    <div
                        css={S.SBox(selectedStep === 1)}
                        onClick={() => setSelectedStep(1)}
                    >
                        <IoCalendarClearOutline />
                        <span className="step-label">
                            STEP 1<br />
                            날짜 선택
                        </span>
                    </div>
                    <div
                        css={S.SBox(selectedStep === 2)}
                        onClick={() => setSelectedStep(2)}
                    >
                        <IoLocationOutline />
                        <span className="step-label">
                            STEP 2<br />
                            장소 선택
                        </span>
                    </div>
                    <div
                        css={S.SBox(selectedStep === 3)}
                        onClick={() => setSelectedStep(3)}
                    >
                        <IoBedOutline />
                        <span className="step-label">
                            STEP 3<br />
                            수소 선택
                        </span>
                    </div>
                </div>
                <button css={S.SSaveBtn} onClick={handleSaveBtnOnClick}>
                    <IoCreateOutline />
                    <span className="step-label">저장하기</span>
                </button>
            </div>
            {showModal && (
                <TransportModal
                    onClose={() => setShowModal(false)}
                    onSelect={handleTransportSelect}
                />
            )}
        </div>
    );
}

export default Sidebar;
