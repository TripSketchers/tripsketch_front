import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import ModalLayout from "../../../ModalLayout/ModalLayout";

function TripDateModal({ savedDateRange, onClose, onSelect }) {
	const [tempDateRange, setTempDateRange] = useState(() => ({
		startDate: savedDateRange?.startDate ?? null,
		endDate: savedDateRange?.endDate ?? null,
	}));

	const handleBackdropClick = () => {
		if (!savedDateRange.startDate || !savedDateRange.endDate) {
			alert("여행 기간을 선택한 후 선택 완료 버튼을 눌러주세요!");
			return;
		}
		onClose(); // 저장된 게 있으면 닫기 허용
	};

	return (
		<ModalLayout onClose={handleBackdropClick}>
			<h2 css={S.STitle}>여행 기간이 어떻게 되시나요?</h2>
			<p css={S.SSubText}>
				여행 시작일과 종료일을 선택해주세요.
				<br />
				여행 기간은 <b>최대 10일</b>까지 지정 가능합니다.
			</p>

			<CustomDatePicker
				dateRange={tempDateRange}
				setDateRange={setTempDateRange}
			/>

			<button
				css={S.SConfirmButton}
				disabled={!tempDateRange.startDate || !tempDateRange.endDate}
				onClick={() => {
					onSelect(tempDateRange);
					onClose();
				}}
			>
				선택 완료
			</button>
		</ModalLayout>
	);
}

export default TripDateModal;
