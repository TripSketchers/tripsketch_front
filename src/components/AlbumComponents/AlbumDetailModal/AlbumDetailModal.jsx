import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { instance } from "../../../api/config/instance";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import SwalAlert from "../../SwalAlert/SwalAlert";

function AlbumDetailModal({ photo, onClose }) {
    const { tripId } = useParams();
    const queryClient = useQueryClient();
    const [memo, setMemo] = useState(photo.memo); // 메모 상태
    const [isEditing, setIsEditing] = useState(false); // 편집 모드

    const handleDelete = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.delete(
                `/trips/${tripId}/album/photos/${photo.photoId}`,
                option
            );
            onClose();
            queryClient.invalidateQueries(["getAlbum", tripId]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = async () => {
        try {
            const option = {
                headers: {
                    "Content-Type": "text/plain",
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.put(
                `/trips/${tripId}/album/${photo.photoId}`,
                memo,
                option
            );
            SwalAlert({
                title: "사진 메모 수정 완료!",
                icon: "success",
            });
            setIsEditing(false); // 편집 모드 종료
            queryClient.invalidateQueries(["getAlbum", tripId]);
        } catch (error) {
            alert(error.response.data.sendFail);
        }
    };

    const handleDeleteConfirm = () => {
        SwalAlert({
            title: "사진을 삭제하시겠어요?",
            text: "삭제 시 복구할 수 없습니다.",
            icon: "warning",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            showCancelButton: true,
            onConfirm: () => {
                handleDelete();
                Swal.fire({
                    icon: "success",
                    title: "삭제 완료",
                    text: "사진이 성공적으로 삭제되었습니다.",
                });
            },
        });
    };

    return (
        <div css={S.backdrop} onClick={() => onClose()}>
            <div css={S.modal} onClick={(e) => e.stopPropagation()}>
                <div css={S.closeBtn} onClick={() => onClose()}>
                    <button>
                        <IoClose />
                    </button>
                </div>
                <div css={S.SPhotoContainer}>
                    <img src={photo.photoUrl} draggable="false" />
                </div>
                <div css={S.SMemoContainer}>
                    <div css={S.SPhotoMemo}>
                        {!isEditing ? (
                            <div>{memo}</div>
                        ) : (
                            <textarea
                                autoFocus
                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                                placeholder="사진에 대한 추억을 적어보세요!"
                            />
                        )}
                    </div>
                    <div css={S.SEditBox}>
                        <span>
                            {photo.date} {photo.placeName}
                        </span>
                        {!isEditing ? (
                            <div>
                                <button
                                    css={S.deleteBtn}
                                    onClick={handleDeleteConfirm}
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    css={S.editBtn}
                                    onClick={() => setIsEditing(true)}
                                >
                                    <MdEdit />
                                </button>
                            </div>
                        ) : (
                            <div css={S.SEditClickBtn}>
                                <button
                                    className="cancel"
                                    onClick={() => {
                                        setIsEditing(false);
                                    }}
                                >
                                    취소
                                </button>
                                <button
                                    className="edit"
                                    onClick={handleEditClick}
                                >
                                    수정 완료
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumDetailModal;
