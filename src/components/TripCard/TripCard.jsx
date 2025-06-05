import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { IoMdMore, IoMdShare } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { instance } from "../../api/config/instance";
import TogglePanel from "../TogglePanel/TogglePanel";
import SharedModal from "../MypageComponents/SharedTrip/ShareModal/SharedModal";
import Toast, { showToast } from "../Toast/Toast";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function TripCard({
    onClick,
    tripId,
    dDay,
    title,
    location,
    dateRange,
    onDeleteSuccess,
    isShared = false,
    status = null,
    shareId = null,
    sharedByUserEmail = null,
    onRespondToInvitation = () => {},
}) {
    const [shareModalOpen, setshareModalOpen] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);

    // 여행 삭제
    const handleDeleteTrip = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.delete(`/account/trip/${tripId}`, option);
            onDeleteSuccess();
            showToast.info("선택된 여행을 삭제했습니다.");
        } catch (error) {
            console.log(error);
        }
    };

    // 공유받은 여행 삭제 및 거절
    const deleteSharedTrip = async ({ shareId, onSuccess, message }) => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.delete(`/account/invitations/${shareId}`, option);
            onSuccess(); // 후처리 콜백
            showToast.info(message);
        } catch (error) {
            console.error("공유받은 여행 처리 실패:", error);
        }
    };

    // 공유받은 여행 수락
    const handleAcceptInvitation = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.put(
                `/account/invitations/${shareId}/accept`,
                {}, // 요청 본문 (body가 없으면 빈 객체라도 넣어야 함)
                option
            );
            onRespondToInvitation(); // refetch 호출
            showToast.info("선택된 공유받은 여행을 수락했습니다.");
        } catch (error) {
            console.error("초대 수락 실패:", error);
        }
    };

    return (
        <>
            <div css={S.SLayout} onClick={onClick}>
                {!isShared ? (
                    <TogglePanel
                        triggerIcon={<IoMdMore />}
                        menuItems={[
                            {
                                icon: <FaTrash />,
                                label: "삭제",
                                action: handleDeleteTrip,
                                confirm: {
                                    title: "여행 삭제",
                                    message:
                                        "정말로 이 여행을 삭제하시겠습니까?",
                                    confirmText: "삭제하기",
                                },
                            },
                            {
                                icon: <IoMdShare />,
                                label: "공유",
                                action: () => setshareModalOpen(true),
                            },
                        ]}
                    />
                ) : (
                    <TogglePanel
                        triggerIcon={<IoMdMore />}
                        menuItems={[
                            {
                                icon: <FaTrash />,
                                label: "삭제",
                                action: () => deleteSharedTrip({
                                    shareId,
                                    onSuccess: onDeleteSuccess, // 삭제 후 처리
                                    message:
                                        "선택된 공유받은 여행을 삭제했습니다.",
                                }),
                                confirm: {
                                    title: "공유 여행에서 나가기",
                                    message: "정말로 이 여행을 나가시겠습니까?",
                                    confirmText: "나가기",
                                },
                            },
                        ]}
                    />
                )}
                <div css={S.SHeader}>
                    {status === "pending" ? (
                        <div css={S.SHostBox}>
                            <div className="host">공유자</div>
                            <span>{sharedByUserEmail.split("@")[0]}</span>
                        </div>
                    ) : (
                        <div css={S.SDday}>{dDay}</div>
                    )}
                </div>
                <div css={S.SBody}>
                    <h2
                        css={S.STitle}
                        className={status === "pending" ? "active" : "none"}
                    >
                        {title}
                    </h2>
                    <div>
                        <div css={S.SLocation}>{location}</div>
                        <div css={S.SDateRange}>{dateRange}</div>
                    </div>
                    {status === "pending" && (
                        <div css={S.SButtonGroup}>
                            <button
                                className="declineBtn"
                                onClick={() => setDeclineModal(true)}
                            >
                                거절
                            </button>
                            <button
                                className="acceptBtn"
                                onClick={handleAcceptInvitation}
                            >
                                수락
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {shareModalOpen && (
                <SharedModal
                    onClose={() => setshareModalOpen(false)}
                    tripId={tripId}
                />
            )}
            {declineModal && (
                <ConfirmModal
                    title={"공유받은 여행에서 나가기"}
                    message={
                        "공유받은 여행을 거절하시겠습니까?\n거절 후 취소 불가합니다."
                    }
                    confirmText={"거절하기"}
                    onClose={() => setDeclineModal(false)}
                    onConfirm={() => deleteSharedTrip({
                        shareId,
                        onSuccess: onRespondToInvitation, // refetch
                        message: "선택된 공유받은 여행을 거절했습니다.",
                    })}
                />
            )}
        </>
    );
}

export default TripCard;
