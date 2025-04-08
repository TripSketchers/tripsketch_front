import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { ko } from 'date-fns/locale';

function TripDateModal({ onClose, onSelect }) {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
    const [monthsToShow, setMonthsToShow] = useState(2);

	// 📱 반응형 처리: 화면 크기에 따라 monthsShown 조절
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 880) {
				setMonthsToShow(1);
			} else {
				setMonthsToShow(2);
			}
		};

		handleResize(); // 초기 실행
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

    const handleBackdropClick = (e) => {
        onClose(); // 모달 바깥 클릭 시 닫기
    };
    
    const handleModalClick = (e) => {
        e.stopPropagation(); // 모달 내부 클릭 시 전파 차단
    };

	return (
		<div css={S.SModalOverlay} onClick={handleBackdropClick}>
			<div css={S.SModalBox} onClick={handleModalClick}>
				<h2 css={S.STitle}>여행 기간이 어떻게 되시나요?</h2>
				<p css={S.SSubText}>
					여행 시작일과 종료일을 선택해주세요.
					<br />
					선택이 완료되면 확인 버튼을 눌러주세요.
				</p>

				<div css={S.SDatePickerWrapper}>
					<ReactDatePicker
						selected={startDate}
						onChange={(dates) => {
							const [start, end] = dates;
							setStartDate(start);
							setEndDate(end);
						}}
						startDate={startDate}
						endDate={endDate}
						selectsRange
						inline
						monthsShown={monthsToShow}
						locale={ko}
					/>
				</div>

				<button
					css={S.SConfirmButton}
					disabled={!startDate || !endDate}
					onClick={() => {
						onSelect({ startDate, endDate });
						onClose();
					}}
				>
					선택 완료
				</button>
			</div>
		</div>
	);
}

export default TripDateModal;
