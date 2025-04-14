import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { IoMdMore, IoMdShare } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { instance } from "../../api/config/instance";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function TripCard({
	onClick,
	tripId,
	dDay,
	title,
	location,
	dateRange,
	onDeleteSuccess,
}) {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const panelRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			// 외부 클릭 시 닫기
			if (panelRef.current && !panelRef.current.contains(e.target)) {
				setIsPanelOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleDeleteTrip = async () => {
		try {
			const option = {
				headers: {
					Authorization: localStorage.getItem("accessToken"),
				},
			};
			await instance.delete(`account/trip/${tripId}`, option);
			setIsModalOpen(false);
			onDeleteSuccess();
		} catch (error) {
			console.log(error);
		}
	};

	const handleShareBtnOnClick = () => {};

	return (
		<>
			<div css={S.SLayout} onClick={onClick}>
				<div css={S.SHeader}>
					<div css={S.SDday}>{dDay}</div>
					<div ref={panelRef}>
						<button
							css={S.SMenu}
							onClick={(e) => {
								e.stopPropagation();
								setIsPanelOpen(!isPanelOpen);
							}}
						>
							<IoMdMore />
						</button>
						{isPanelOpen && (
							<div css={S.STogglePanel}>
								<div
									css={S.SToggleMenu}
									onClick={(e) => {
										e.stopPropagation();
										setIsModalOpen(true);
									}}
								>
									<FaTrash />
									<span>삭제</span>
								</div>
								<div
									css={S.SToggleMenu}
									onClick={handleShareBtnOnClick}
								>
									<IoMdShare />
									<span>공유</span>
								</div>
							</div>
						)}
					</div>
				</div>
				<h2 css={S.STitle}>{title}</h2>
				<div css={S.SLocation}>{location}</div>
				<div css={S.SDateRange}>{dateRange}</div>
			</div>
			{isModalOpen && (
				<ConfirmModal
					title="여행 삭제"
					message={`정말로 이 여행을 삭제하시겠습니까?`}
					confirmText="삭제하기"
					onClose={() => setIsModalOpen(false)}
					onConfirm={handleDeleteTrip}
				/>
			)}
		</>
	);
}

export default TripCard;
