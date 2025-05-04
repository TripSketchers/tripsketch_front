import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ModalLayout from "../../ModalLayout/ModalLayout";
import { FaBus, FaCar } from "react-icons/fa";

function TransportModal({ onClose, onSelect }) {
    const [selected, setSelected] = useState(null);

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
                <div
                    css={S.option(selected === 0)}
                    onClick={() => setSelected(0)}
                >
                    <FaBus css={S.icon} />
                    <span>대중교통</span>
                </div>
                <div
                    css={S.option(selected === 1)}
                    onClick={() => setSelected(1)}
                >
                    <FaCar css={S.icon} />
                    <span>자동차</span>
                </div>
            </div>
            <button
                css={S.confirmBtn}
                onClick={handleConfirm}
                disabled={selected === null}
            >
                여행 생성
            </button>
        </ModalLayout>
    );
}

export default TransportModal;
