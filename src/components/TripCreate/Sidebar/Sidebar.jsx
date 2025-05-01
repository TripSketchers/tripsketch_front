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

function Sidebar({ selectedStep, setSelectedStep }) {
    const [showModal, setShowModal] = useState(false);
    const { tripName, dateRange, storedPlaces, storedAccommodations } =
        useTrip();

    const handleSaveBtnOnClick = () => {
        setShowModal(true);
    };
    const handleTransportSelect = async (selectedTransport) => {
        try {
            const reqData = {
                trip: {
                    title: tripName,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    tripDestinationId: 101,
                    transportType: selectedTransport,
                },
                storedPlaces: storedPlaces,
                storedAccommodations: storedAccommodations,
            };

            await instance.post("/trip", reqData);
            alert("여행이 생성되었습니다!");
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
                            숙소 선택
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
