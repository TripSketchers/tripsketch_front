import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import img from "../../../assets/MainImg.jpg";
import { FaTrash } from "react-icons/fa6";

function StoredPlaceBox({ type }) {
    const [isEditing, setIsEditing] = useState(false);
    const [hour, setHour] = useState(18); // 기본값: 18시
    const [minute, setMinute] = useState(0);

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => setIsEditing(false);

    // ⏰ 숫자를 2자리로 포맷
    const formatTime = (num) => String(num).padStart(2, "0");

    return (
        <div css={S.SLayout}>
            {isEditing ? (
                <div css={S.SInputContainer}>
                    <input
                        type="number"
                        value={hour}
                        onChange={(e) => {
                            let value = Math.max(
                                0,
                                Math.min(23, +e.target.value || 0)
                            );
                            setHour(value);
                        }}
                        css={S.SInputTime}
                    />
                    <span>{type === "place" ? "시간" : " : "}</span>
                    <input
                        type="number"
                        value={minute}
                        onChange={(e) => {
                            let value = Math.max(
                                0,
                                Math.min(59, +e.target.value || 0)
                            );
                            setMinute(value);
                        }}
                        css={S.SInputTime}
                    />
					{type ==="place" && <span>분</span>}
                    <button css={S.SSaveBtn} onClick={handleSave}>
                        저장
                    </button>
                </div>
            ) : (
                <>
                    <img src={img} alt="장소 이미지" />
                    <div css={S.SInfoContainer}>
                        <h2 css={S.STitle}>파크 하얏트 부산</h2>
                        <div>
                            <span css={S.SCategory}>명소</span>
                            <span css={S.SAddress}>
                                명소 부산광역시 해운대구
                            </span>
                        </div>
                    </div>

                    <div css={S.STimeContainer}>
                        <span>
                            {type === "place" ? "머무는 시간" : "체크인 시간"}
                        </span>
                        <div css={S.STimeBox} onClick={handleEdit}>
                            {type === "place"
                                ? `${hour}시간 ${minute}분`
                                : `${formatTime(hour)}:${formatTime(minute)}`}
                        </div>
                    </div>

                    <button css={S.SDeleteBtn}>
                        <FaTrash />
                    </button>
                </>
            )}
        </div>
    );
}

export default StoredPlaceBox;
