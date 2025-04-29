import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { addDays, eachDayOfInterval, format } from "date-fns";
import { FaPlus } from "react-icons/fa6";
import ReactDOM from "react-dom";
import { useTrip } from "../TripCreate/TripContext";
import fallbackImg from "../../assets/fallbackImg.png";
import { instance } from "../../api/config/instance";

function AccommodationModal({ onClose, onConfirm, dateRange, selectedPlace }) {
	const { storedAccommodation } = useTrip();
	const [imgSrc, setImgSrc] = useState(fallbackImg);

	const stayDays = eachDayOfInterval({
		start: dateRange.startDate,
		end: addDays(dateRange.endDate, -1),
	});

	const [selectedDateMap, setSelectedDateMap] = useState(() => {
		const initMap = {};
		stayDays.forEach((day) => {
			const dateStr = format(day, "yyyy-MM-dd");
			if (storedAccommodation[dateStr]) {
				initMap[dateStr] = storedAccommodation[dateStr];
			}
		});
		return initMap;
	});

	// 대표 숙소 이미지 가져오기
	useEffect(() => {
		const fetchImage = async () => {
			if (selectedPlace?.photos?.[0]?.name) {
				try {
					const res = await instance.get(`/photo?ref=${selectedPlace.photos[0].name}`, {
						headers: {
							Authorization: localStorage.getItem("accessToken"),
						},
						responseType: "blob",
					});
					const blobUrl = URL.createObjectURL(res.data);
					setImgSrc(blobUrl);
				} catch (error) {
					console.error("숙소 대표 이미지 로딩 실패", error);
				}
			}
		};
		fetchImage();
	}, [selectedPlace]);

	const handleBackdropClick = () => onClose();
	const handleModalClick = (e) => e.stopPropagation();

	const handleSetDate = (date) => {
		const dateStr = format(date, "yyyy-MM-dd");
		setSelectedDateMap((prev) => ({
			...prev,
			[dateStr]: selectedPlace,
		}));
	};

	const handleSelectAll = () => {
		const allMapped = {};
		stayDays.forEach((day) => {
			const dateStr = format(day, "yyyy-MM-dd");
			allMapped[dateStr] = selectedPlace;
		});
		setSelectedDateMap(allMapped);
	};

	return ReactDOM.createPortal(
		<div css={S.backdrop} onClick={handleBackdropClick}>
			<div css={S.modal} onClick={handleModalClick}>
				<h1 css={S.STitle}>
					숙소 <span>{selectedPlace.displayName?.text}</span>에서
					<br />
					숙박하실 날짜를 선택해주세요.
				</h1>

				<div css={S.SContainer}>
					{stayDays.map((day) => {
						const dateStr = format(day, "yyyy-MM-dd");
						const isSelected = !!selectedDateMap[dateStr];
						const targetPlace = selectedDateMap[dateStr];
						const placeName = targetPlace?.displayName?.text || "";
						const photoUrl = imgSrc || fallbackImg; // 모든 날짜는 동일 숙소이므로 대표 이미지를 사용

						return (
							<div
								key={dateStr}
								css={S.SBox(isSelected, photoUrl)}
								onClick={() => handleSetDate(day)}
							>
								<p css={S.SDateTag}>{format(day, "MM.dd")}</p>
								<div css={S.SImageBox(isSelected, photoUrl)}>
									{!isSelected && <FaPlus />}
								</div>
								<span css={S.SPlaceName}>{placeName}</span>
							</div>
						);
					})}
				</div>

				<div css={S.SBtnContainer}>
					<button css={S.selectAllBtn} onClick={handleSelectAll}>
						전체 선택
					</button>
					<div css={S.buttonGroup}>
						<button css={S.cancelBtn} onClick={onClose}>
							취소
						</button>
						<button
							css={S.selectBtn}
							onClick={() => onConfirm(selectedDateMap)}
						>
							완료
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
}

export default AccommodationModal;
