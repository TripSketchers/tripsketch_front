import React, { useState } from "react";
import Header from "../Header/Header";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripDate from "../TripDate/TripDate";
import TripPlace from "../TripPlace/TripPlace";
import TripAccommodation from "../TripAccommodation/TripAccommodation";

function TripSelectContainer({ selectedStep }) {
	const [showModal, setShowModal] = useState(true);

	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});

	const [storedPlaces, setStoredPlaces] = useState([]);
	const [storedAccommodation, setStoredAccommodation] = useState([]);

	return (
		<div css={S.SLayout(selectedStep)}>
			<Header
				selectedStep={selectedStep}
				dateRange={dateRange}
				onOpenModal={() => setShowModal(true)}
			/>
			<div css={S.SContainer}>
				{selectedStep === 1 && (
					<TripDate
						showModal={showModal}
						setShowModal={setShowModal}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				)}
				{selectedStep === 2 && (
					<TripPlace
						storedPlaces={storedPlaces}
						setStoredPlaces={setStoredPlaces}
					/>
				)}
				{selectedStep === 3 && (
					<TripAccommodation
						dateRange={dateRange}
						storedAccommodation={storedAccommodation}
						setStoredAccommodation={setStoredAccommodation}
					/>
				)}
			</div>
		</div>
	);
}

export default TripSelectContainer;
