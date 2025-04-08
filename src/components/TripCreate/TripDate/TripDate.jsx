import React from "react";
import TripDateBox from "./TripDateBox/TripDateBox";

function TripDate(props) {
	return (
		<div>
			<TripDateBox date={"03/24(월)"} startTime={"10:00"} />
			<TripDateBox date={"03/25(화)"} startTime={"09:00"} />
			<TripDateBox date={"03/26(수)"} startTime={"11:00"} />
		</div>
	);
}

export default TripDate;
