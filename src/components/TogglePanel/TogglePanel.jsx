import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { IoMdMore } from "react-icons/io";

function TogglePanel({ triggerIcon, menuItems }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedConfirmInfo, setSelectedConfirmInfo] = useState(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setIsPanelOpen(false);
            }
        };
        // 마운트될 때 실행 (add)
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // 언마운트될 때 실행 (remove)
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleItemClick = (item, e) => {
        e.stopPropagation();
        if (item.confirm) {
            // 이 메뉴는 모달 띄우기
            setSelectedAction(() => item.action);
            setSelectedConfirmInfo(item.confirm);
            setIsModalOpen(true);
        } else {
            // 그냥 바로 액션 실행
            item.action(e);
            setIsPanelOpen(false);
        }
    };

    const handleConfirm = () => {
        if (selectedAction) {
            selectedAction();
        }
        setIsModalOpen(false);
        setIsPanelOpen(false);
    };

    return (
        <div ref={panelRef} css={S.SPanelWrapper}>
            <button css={S.SMenu}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsPanelOpen((prev) => !prev);
                }}
            >
                {triggerIcon || <IoMdMore />}
            </button>
            {isPanelOpen && (
                <div css={S.STogglePanel}>
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            css={S.SToggleMenu}
                            onClick={(e) => handleItemClick(item, e)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && selectedConfirmInfo && (
                <ConfirmModal
                    title={selectedConfirmInfo.title}
                    message={selectedConfirmInfo.message}
                    confirmText={selectedConfirmInfo.confirmText}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    );
}

export default TogglePanel;
