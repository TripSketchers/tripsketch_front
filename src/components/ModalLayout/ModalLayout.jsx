import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function ModalLayout({ children, onClose }) {
    const handleBackdropClick = (e) => {
		onClose(); // 모달 바깥 클릭 시 닫기
	};

	const handleModalClick = (e) => {
		e.stopPropagation(); // 모달 내부 클릭 시 전파 차단
	};

	return (
		<div css={S.backdrop} onClick={handleBackdropClick}>
			<div css={S.modal} onClick={handleModalClick}>
				{children}
			</div>
		</div>
	);
}

export default ModalLayout;
