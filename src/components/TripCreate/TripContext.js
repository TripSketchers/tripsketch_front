import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const [storedPlaces, setStoredPlaces] = useState([]);
	const [storedAccommodation, setStoredAccommodation] = useState({});
	const [placeModalInfo, setPlaceModalInfo] = useState(null);
    const [focusedPlace, setFocusedPlace] = useState(null);

	return (
		<TripContext.Provider
			value={{
				dateRange,
				setDateRange,
				storedPlaces,
				setStoredPlaces,
				storedAccommodation,
				setStoredAccommodation,
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
