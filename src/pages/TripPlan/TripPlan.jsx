import React, { useEffect, useState } from "react";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../components/StoredPlacePanel/StoredPlacePanel";
import Map from "../../components/TripCreate/Map/Map";
import PlanTable from "../../components/TripPlan/PlanTable/PlanTable";
import PlanHeader from "../../components/TripPlan/PlanHeader/PlanHeader";
import Split from "react-split";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { instance } from "../../api/config/instance";
import { useTrip } from "../../components/Routes/TripContext";

function TripPlan() {
    const [isStoredPanelOpen, setIsStoredPanelOpen] = useState(true);
    const toggleStoredPanel = () => setIsStoredPanelOpen(!isStoredPanelOpen);

    const { tripId } = useParams(); // URL에서 tripId 가져오기
    const {
        setTripInfo,
        setStoredPlaces,
        setStoredAccommodations,
        setSchedules,
    } = useTrip();

    useEffect(() => {
        const fetchTripInfo = async () => {
            try {
                const res = await instance.get(`/trips/${tripId}`, {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });
                const data = res.data;

                setTripInfo(data.trip);
                setStoredPlaces(data.storedPlaces);
                setStoredAccommodations(data.storedAccommodations);
                setSchedules(data.tripSchedules);
            } catch (err) {
                console.error("여행 정보를 불러오는 데 실패했습니다.", err);
            }
        };

        fetchTripInfo();
    }, [tripId, setTripInfo, setStoredPlaces, setStoredAccommodations, setSchedules]);

    return (
        <NavLayout>
            <div css={S.SLayout}>
                <Split
                    sizes={[60, 40]}
                    minSize={[100, 0]}
                    gutterSize={8}
                    direction="horizontal"
                    className="split"
                >
                    <div css={S.SContainer(isStoredPanelOpen)}>
                        <PlanHeader />
                        <div css={S.SBox}>
                            <div css={S.SStoredPanel(isStoredPanelOpen)}>
                                {isStoredPanelOpen && <StoredPlacePanel text="계획" />}
                                <button
                                    onClick={toggleStoredPanel}
                                    css={S.SToggleButton(isStoredPanelOpen)}
                                >
                                    {isStoredPanelOpen ? <FaAngleLeft /> : <FaAngleRight />}
                                </button>
                            </div>
                            <PlanTable />
                        </div>
                    </div>
                    <div css={S.SMapContainer}>
                        <Map selectedStep={2}/>
                    </div>
                </Split>
            </div>
        </NavLayout>
    );
}

export default TripPlan;
