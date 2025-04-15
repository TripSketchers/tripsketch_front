import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { IoBedOutline, IoCalendarClearOutline, IoLocationOutline, IoCreateOutline  } from "react-icons/io5";

function TripStepSidebar({selectedStep, setSelectedStep}) {

    const handleSaveBtnOnClick = () => {
        try {
            window.location.replace("/trip/plan/:trip_id");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div>
                    <div css={S.SBox(selectedStep === 1)} onClick={() => setSelectedStep(1)}>
                        <IoCalendarClearOutline />
                        <span className="step-label">STEP 1<br/>날짜 선택</span>
                    </div>
                    <div css={S.SBox(selectedStep === 2)} onClick={() => setSelectedStep(2)}>
                        <IoLocationOutline />
                        <span className="step-label">STEP 2<br/>장소 선택</span>
                    </div>
                    <div css={S.SBox(selectedStep === 3)} onClick={() => setSelectedStep(3)}>
                        <IoBedOutline />
                        <span className="step-label">STEP 3<br/>숙소 선택</span>
                    </div>
                </div>
                <button css={S.SSaveBtn} onClick={handleSaveBtnOnClick}>
                    <IoCreateOutline />
                    <span className="step-label">저장하기</span>
                </button>
            </div>
        </div>
    );
}

export default TripStepSidebar;