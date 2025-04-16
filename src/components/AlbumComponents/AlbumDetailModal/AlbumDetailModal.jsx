import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AlbumPhoto from "../../../assets/AlbumPhoto.jpg";

function AlbumDetailModal({photo, onClose}) {
    const handleBackdropClick = (e) => {
        onClose(); // 모달 바깥 클릭 시 닫기
    };
    
    const handleModalClick = (e) => {
        e.stopPropagation(); // 모달 내부 클릭 시 전파 차단
    };
    
    return (
        <div css={S.backdrop} onClick={handleBackdropClick}>
            <div css={S.modal} onClick={handleModalClick}>
                <div css={S.closeBtn} onClick={handleBackdropClick}>
                    <button><IoClose /></button>
                </div>
                <div css={S.SPhotoContainer}>
                    <img src={photo.photoUrl} draggable="false" />
                </div>
                <div>
                    <div css={S.SPhotoMemo} >
                        {photo.memo}
                    </div>
                    <div css={S.SEditBox}>
                        <span>{photo.date} {photo.place}</span>
                        <div>
                            <button css={S.deleteBtn}><FaTrash /></button>
                            <button css={S.editBtn}><MdEdit /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumDetailModal;