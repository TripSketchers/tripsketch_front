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
import { useTrip } from "../../Routes/TripContext";
import { convertStoredAccommodationMapToArray } from "../../../utils/StoredAccommdationsUtils";
import { useLocation, useNavigate } from "react-router-dom";
import SwalAlert from "../../SwalAlert/SwalAlert";

function Sidebar({ selectedStep, setSelectedStep }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const { tripInfo, storedPlaces, storedAccommodations } = useTrip();

    const handleSaveBtnOnClick = () => {
        setShowModal(true);
    };

	const handleTransportSelect = async (selectedTransport) => {
		try {
			// ✅ 선택한 교통수단 저장
			localStorage.setItem("transportType", selectedTransport);
            
			const mergedAccommodations =
				convertStoredAccommodationMapToArray(storedAccommodations);

            const reqData = {
                trip: {
                    tripId: location.state.tripId ?? null,
                    title: tripInfo?.title || "여행 이름을 입력하세요",
                    startDate: tripInfo?.startDate,
                    endDate: tripInfo?.endDate,
                    tripDestinationId:
                        location.state.tripDestinationId ||
                        tripInfo?.tripDestinationId ||
                        5,
                    transportType: selectedTransport,
                    tripDestinationKoName:
                        tripInfo?.tripDestinationKoName || "여행지",
                },
                storedPlaces: storedPlaces.map((place) => ({
                    place: {
                        googlePlaceId: place.googlePlaceId || place.id,
                        name: place.name || place.displayName?.text,
                        address: place.address || place.formattedAddress,
                        latitude: place.latitude || place.location?.latitude,
                        longitude: place.longitude || place.location?.longitude,
                        category: place.category,
                        rating: place.rating,
                        photoReference:
                            place.photoReference ||
                            place.photos?.[0]?.name ||
                            "",
                    },
                })),
                storedAccommodations: mergedAccommodations.map((item) => ({
                    place: {
                        googlePlaceId:
                            item.place.googlePlaceId || item.place.id,
                        name: item.place.name || item.place.displayName?.text,
                        address:
                            item.place.address || item.place.formattedAddress,
                        latitude:
                            item.place.latitude ||
                            item.place.location?.latitude,
                        longitude:
                            item.place.longitude ||
                            item.place.location?.longitude,
                        category: item.place.category,
                        rating: item.place.rating,
                        photoReference:
                            item.place.photoReference ||
                            item.place.photos?.[0]?.name ||
                            "",
                    },
                    checkInDate: item.checkInDate,
                    checkOutDate: item.checkOutDate,
                })),
            };

            if (tripInfo?.tripId) {
                await instance.put(`/trip/${tripInfo.tripId}`, reqData, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });
                SwalAlert({
                    title: `여행이 수정되었습니다!`,
					icon: "success",
                });
                navigate(`/trip/plan/${tripInfo.tripId}`);
            } else {
                await instance.post("/trip", reqData, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });
                SwalAlert({
                    title: `여행이 생성되었습니다!`,
					icon: "success",
                });
                navigate("/account/mypage");
            }
        } catch (err) {
            console.error(err);
            SwalAlert({
                title: `여행 생성에 실패했습니다.`,
				text: `다시 시도해주세요.`,
				icon: "error",
            });
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
