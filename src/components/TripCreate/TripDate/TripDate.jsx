import React, { useState } from "react";
import TripDateBox from "./TripDateBox/TripDateBox";
import TripDateModal from "./TripDateModal/TripDateModal";

function TripDate({ showModal, setShowModal }) {
	const [date, setDate] = useState({
		startDate: "",
		endDate: "",
	});

	return (
		<div>
			<TripDateBox date={"03/24(월)"} startTime={"10:00"} />
			<TripDateBox date={"03/25(화)"} startTime={"09:00"} />
			<TripDateBox date={"03/26(수)"} startTime={"11:00"} />
			{/* 날짜 선택 모달 조건부 렌더링 */}
			{showModal && (
				<TripDateModal
					onClose={() => setShowModal(false)}
					onSelect={({ startDate, endDate }) => {
						setDate({ startDate, endDate });
						setShowModal(false);
						console.log("선택한 기간:", startDate, endDate);
					}}
				/>
			)}
		</div>
	);
}

export default TripDate;
