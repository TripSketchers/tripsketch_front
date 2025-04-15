import React, { useState } from "react";
import TripHeader from "../TripHeader/TripHeader";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripDate from "../TripDate/TripDate";
import TripPlace from "../TripPlace/TripPlace";
import TripAccommodation from "../TripAccommodation/TripAccommodation";

function TripSelectContainer({ selectedStep }) {
    const [showModal, setShowModal] = useState(true);

    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    return (
        <div css={S.SLayout(selectedStep)}>
            <TripHeader
                selectedStep={selectedStep}
				dateRange={dateRange}
                onOpenModal={() => setShowModal(true)}
            />
            <div css={S.SContainer}>
                {selectedStep === 1 && (
                    <TripDate
                        showModal={showModal}
                        setShowModal={setShowModal}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                )}
                {selectedStep === 2 && <TripPlace />}
                {selectedStep === 3 && <TripAccommodation />}
            </div>
        </div>
    );
}

export default TripSelectContainer;
