import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
	const [tripName, setTripName] = useState("여행 이름을 입력하세요");
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const [storedPlaces, setStoredPlaces] = useState([]);
	const [storedAccommodations, setStoredAccommodations] = useState({});
	const [placeModalInfo, setPlaceModalInfo] = useState(null);
    const [focusedPlace, setFocusedPlace] = useState(null);

	return (
		<TripContext.Provider
			value={{
				tripName,
				setTripName,
				dateRange,
				setDateRange,
				storedPlaces,
				setStoredPlaces,
				storedAccommodations,
				setStoredAccommodations,
				placeModalInfo,
				setPlaceModalInfo,
				focusedPlace,
				setFocusedPlace,
			}}
		>
			{children}
		</TripContext.Provider>
	);
}

export function useTrip() {
	return useContext(TripContext);
}
