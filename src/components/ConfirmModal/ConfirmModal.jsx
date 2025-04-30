import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ModalLayout from "../ModalLayout/ModalLayout";

function ConfirmModal({ onClose, onConfirm, title, message, confirmText }) {
	return (
		<ModalLayout onClose={onClose}>
			<h2 css={S.STitle}>{title}</h2>
			<p css={S.SMessage}>{message}</p>
			<div css={S.buttonGroup}>
				<button css={S.cancelBtn} onClick={onClose}>
					취소
				</button>
				<button css={S.deleteBtn} onClick={onConfirm}>
					{confirmText}
				</button>
			</div>
		</ModalLayout>
	);
}

export default ConfirmModal;
