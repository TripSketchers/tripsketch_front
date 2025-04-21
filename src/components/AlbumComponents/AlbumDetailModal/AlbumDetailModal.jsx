import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { instance } from '../../../api/config/instance';

function AlbumDetailModal({photo, onClose}) {
    const [ editPhotoMemo, setEditPhotoMemo ] = useState(null); //수정 상태 저장
    const [ memo, setMemo ] = useState(photo.memo);     //메모 저장

    const handleBackdropClick = (e) => {
        onClose(); // 모달 바깥 클릭 시 닫기
    };
    
    const handleModalClick = (e) => {
        e.stopPropagation(); // 모달 내부 클릭 시 전파 차단
    };

    const handleEditBtn = () => {
        setEditPhotoMemo(photo.photoId);
    }

    const handleMemoChange = (e) => {
        setMemo(e.target.value)
    }

    const handleEditClick = async () => {
        try {
        const option = {
            headers: {
                "Content-Type": "text/plain",
                Authorization: localStorage.getItem("accessToken")
            }
        }
            await instance.put(`/trips/${1}/album/${editPhotoMemo}`, memo, option);
            alert("사진 메모 수정 완료!");
            setEditPhotoMemo(null);
        }catch (error) {
            alert(error.response.data.sendFail);
        }
    }
    
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
                        {editPhotoMemo === null ? 
                            <div>
                                {photo.memo}
                            </div>
                            : <textarea
                                value={memo}
                                onChange={handleMemoChange}
                                placeholder="사진에 대한 추억을 적어보세요!"
                            />
                        }
                    </div>
                    <div css={S.SEditBox}>
                        <span>{photo.date} {photo.place}</span>
                        {editPhotoMemo === null ? 
                            <div>
                                <button css={S.deleteBtn} ><FaTrash /></button>
                                <button css={S.editBtn} onClick={handleEditBtn}><MdEdit /></button>
                            </div>
                            :<div css={S.SEditClickBtn}>
                                <button className='cancel' onClick={() => {setEditPhotoMemo(null)}}>취소</button>
                                <button className='edit' onClick={handleEditClick}>수정 완료</button>
                            </div> 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumDetailModal;