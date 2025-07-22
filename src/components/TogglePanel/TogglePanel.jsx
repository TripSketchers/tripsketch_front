import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { IoMdMore } from "react-icons/io";
import SwalAlert from "../SwalAlert/SwalAlert";

function TogglePanel({ triggerIcon, menuItems }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
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
            SwalAlert({
                title: item.confirm.title,
                text: item.confirm.message,
                icon: "warning",
                confirmButtonText: item.confirm.confirmText,
                showCancelButton: true,
                onConfirm: () => {
                    item.action(e);
                    SwalAlert({
                        icon: "success",
                        title: "삭제 완료",
                        text: "성공적으로 삭제되었습니다.",
                    });
                    setIsPanelOpen(false);
                },
            });
        } else {
            // 그냥 바로 액션 실행
            item.action(e);
            setIsPanelOpen(false);
        }
    };

    return (
        <div ref={panelRef} css={S.SPanelWrapper}>
            <button
                css={S.SMenu}
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
        </div>
    );
}

export default TogglePanel;
