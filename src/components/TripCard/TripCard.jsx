import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { IoMdMore, IoMdShare } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";

function TripCard({ onClick, dDay, title, location, dateRange }) {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
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

	return (
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
							<div css={S.SToggleMenu}>
								<FaTrash />
								<span>삭제</span>
							</div>
							<div css={S.SToggleMenu}>
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
	);
}

export default TripCard;
