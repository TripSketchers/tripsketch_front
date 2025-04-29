import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { IoMdMore, IoMdShare } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { instance } from "../../api/config/instance";
import TogglePanel from "../TogglePanel/TogglePanel";

function TripCard({
    onClick,
    tripId,
    dDay,
    title,
    location,
    dateRange,
    onDeleteSuccess,
}) {

    const handleDeleteTrip = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.delete(`account/trip/${tripId}`, option);
            onDeleteSuccess();
        } catch (error) {
            console.log(error);
        }
    };

    const handleShareBtnOnClick = () => {};

    return (
        <>
            <div css={S.SLayout} onClick={onClick}>
                <TogglePanel
                    triggerIcon={<IoMdMore />}
                    menuItems={[
                        {
                            icon: <FaTrash />,
                            label: "삭제",
                            action: handleDeleteTrip,
                            confirm: {
                                title: "여행 삭제",
                                message: "정말로 이 여행을 삭제하시겠습니까?",
                                confirmText: "삭제하기",
                            },
                        },
                        {
                            icon: <IoMdShare />,
                            label: "공유",
                            action: handleShareBtnOnClick,
                        },
                    ]}
                />
                <div css={S.SHeader}>
                    <div css={S.SDday}>{dDay}</div>
                </div>
                <h2 css={S.STitle}>{title}</h2>
                <div css={S.SLocation}>{location}</div>
                <div css={S.SDateRange}>{dateRange}</div>
            </div>
        </>
    );
}

export default TripCard;
