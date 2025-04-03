import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function ConfirmModal({ onClose, onConfirm }) {
    const handleBackdropClick = (e) => {
        onClose(); // 모달 바깥 클릭 시 닫기
    };
    
    const handleModalClick = (e) => {
        e.stopPropagation(); // 모달 내부 클릭 시 전파 차단
    };
    
    return (
        <div css={S.backdrop} onClick={handleBackdropClick}>
            <div css={S.modal} onClick={handleModalClick}>
                <h2>정말 탈퇴하시겠어요?</h2>
                <p>탈퇴 시 모든 정보가 삭제됩니다.</p>
                <div css={S.buttonGroup}>
                    <button css={S.cancelBtn} onClick={onClose}>취소</button>
                    <button css={S.deleteBtn} onClick={onConfirm}>탈퇴하기</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;