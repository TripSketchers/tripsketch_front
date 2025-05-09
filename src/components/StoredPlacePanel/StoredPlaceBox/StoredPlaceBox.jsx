import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaTrash } from "react-icons/fa6";
import TimeInputEditor from "../../TimeInputEditer/TimeInputEditer";
import { useTrip } from "../../Routes/TripContext";

function StoredPlaceBox({ index, type, place, onRemove }) {
    const [isEditing, setIsEditing] = useState(false);
    const { setStoredPlaces, setFocusedPlace } = useTrip();
    const [tempStayTime, setTempStayTime] = useState(place.stayTime ?? 120);

    const formatTime = (num) => String(num).padStart(2, "0");

    return (
        <div
            css={S.SLayout(type === "place")}
            onClick={() => setFocusedPlace(place)}
        >
            {isEditing && type === "place" ? (
                <TimeInputEditor
                    stayTime={tempStayTime}
                    onChange={(newTime) => setTempStayTime(newTime)}
                    onSave={() => {
                        setIsEditing(false);
                        setStoredPlaces((prev) =>
                            prev.map((p) =>
                                p.id === place.id
                                    ? { ...p, stayTime: tempStayTime }
                                    : p
                            )
                        );
                    }}
                />
            ) : (
                <>
                    <div css={S.SContainer}>
                        {type === "place" && (
                            <div css={S.SIndexBox}>{index}</div>
                        )}
                        <img
                            src={place.imageUrl}
                            alt={place.displayName?.text || "장소 이미지"}
                            loading="lazy"
                            onError={(e) => (e.target.src = fallbackImg)}
                        />
                        <div css={S.SInfoContainer(type === "place")}>
                            <h2 css={S.STitle}>
                                {place.displayName?.text || "이름 없음"}
                            </h2>
                            <div>
                                <span css={S.SCategory(place.category)}>
                                    {place.category}
                                </span>
                                <span css={S.SAddress}>
                                    {place.formattedAddress}
                                </span>
                            </div>
                        </div>
                    </div>

                    {type === "place" && (
                        <div css={S.STimeContainer}>
                            <span>머무는 시간</span>
                            <div
                                css={S.STimeBox}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTempStayTime(place.stayTime); // 편집 시작 시 현재 값 적용
                                    setIsEditing(true);
                                }}
                            >
                                {`${formatTime(
                                    Math.floor(tempStayTime / 60)
                                )}시간 ${formatTime(tempStayTime % 60)}분`}
                            </div>
                        </div>
                    )}

                    <button
                        css={S.SDeleteBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(place.id);
                        }}
                    >
                        <FaTrash />
                    </button>
                </>
            )}
        </div>
    );
}

export default StoredPlaceBox;
