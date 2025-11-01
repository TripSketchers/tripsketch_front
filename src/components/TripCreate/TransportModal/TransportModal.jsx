import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ModalLayout from "../../ModalLayout/ModalLayout";
import { FaBus, FaCar } from "react-icons/fa";
import { useTrip } from "../../Routes/TripContext";
import { useLocation } from "react-router-dom";

function TransportModal({ onClose, onSelect }) {
    const { tripInfo, tripDestination } = useTrip();

    // tripDestinationId 1~3이면 일본으로 간주
    const location = useLocation();
    const { tripDestinationId } = tripDestination || location?.state || {};
    const isJapan = [1, 2, 3].includes(Number(tripDestinationId));

    const [selected, setSelected] = useState(() => {
        const t = tripInfo?.transportType ?? null;
        // 일본이면 대중교통(0) 초기 선택 제거
        if (isJapan && t === 0) return null;
        return t;
    });

    // tripInfo 변경 시 일본 여부에 따라 선택 보정
    useEffect(() => {
        if (isJapan && selected === 0) {
            setSelected(null);
        }
    }, [isJapan, selected]);

    const isEdit = !!tripInfo?.tripId; // tripId가 있으면 수정 모드

    const handleConfirm = async () => {
        if (selected !== null) {
            onSelect(selected);
            onClose();
        }
    };

    return (
        <ModalLayout onClose={onClose}>
            <h2 css={S.STitle}>교통수단 선택</h2>
            <span css={S.SMessage}>
                여행 중 이용할 교통수단을 선택해주세요!
            </span>
            <div css={S.optionList}>
                {!isJapan && (
                    <div
                        css={S.option(selected === 0)}
                        onClick={() => setSelected(0)}
                    >
                        <FaBus css={S.icon} />
                        <span>대중교통</span>
                    </div>
                )}

                <div
                    css={S.option(selected === 1)}
                    onClick={() => setSelected(1)}
                >
                    <FaCar css={S.icon} />
                    <span>자동차</span>
                </div>
            </div>
            {isJapan && (
                <div css={S.notice}>
                    ※ 일본은 대중교통 API를 지원하지 않습니다.
                </div>
            )}
            <button
                css={S.confirmBtn}
                onClick={handleConfirm}
                disabled={selected === null}
            >
                {isEdit ? "여행 수정" : "여행 생성"}
            </button>
        </ModalLayout>
    );
}

export default TransportModal;
