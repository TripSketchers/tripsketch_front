import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaTrash } from "react-icons/fa6";
import TimeInputEditor from "../../TimeInputEditer/TimeInputEditer";

function StoredPlaceBox({ type, place, onRemove }) {
    const [isEditing, setIsEditing] = useState(false);
    const [hour, setHour] = useState(type === "place" ? 2 : 18);
    const [minute, setMinute] = useState(0);

    const formatTime = (num) => String(num).padStart(2, "0");

    return (
        <div css={S.SLayout}>
            {isEditing ? (
                <TimeInputEditor
                    hour={hour}
                    minute={minute}
                    setHour={setHour}
                    setMinute={setMinute}
                    type={type}
                    onSave={() => setIsEditing(false)}
                />
            ) : (
                <>
                    <div css={S.SContainer}>
                        <img
                            src={place.imageUrl || fallbackImg}
                            alt="장소 이미지"
                            onError={(e) => (e.target.src = fallbackImg)}
                        />
                        <div css={S.SInfoContainer}>
                            <h2 css={S.STitle}>{place.name}</h2>
                            <div>
                                <span css={S.SCategory(place.category)}>
                                    {place.category}
                                </span>
                                <span css={S.SAddress}>
                                    {place.formatted_address
                                        ?.split(" ")
                                        .slice(2)
                                        .join(" ")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div css={S.STimeContainer}>
                        <span>
                            {type === "place" ? "머무는 시간" : "체크인 시간"}
                        </span>
                        <div
                            css={S.STimeBox}
                            onClick={() => setIsEditing(true)}
                        >
                            {type === "place"
                                ? `${formatTime(hour)}시간 ${formatTime(
                                      minute
                                  )}분`
                                : `${formatTime(hour)}:${formatTime(minute)}`}
                        </div>
                    </div>

                    <button
                        css={S.SDeleteBtn}
                        onClick={() => onRemove(place.place_id)}
                    >
                        <FaTrash />
                    </button>
                </>
            )}
        </div>
    );
}

export default StoredPlaceBox;
