import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
    const [tripInfo, setTripInfo] = useState(null); // 여행 전체 정보 (TripDto)
    const [tripDestination, setTripDestination] = useState(null); // 여행 목적지 정보 (TripDestinationDto)

    const [storedPlaces, setStoredPlaces] = useState([]); // 장소 보관함
    const [storedAccommodations, setStoredAccommodations] = useState({});
    const [schedules, setSchedules] = useState([]); // 여행 일정

    const [placeModalInfo, setPlaceModalInfo] = useState(null);
    const [focusedPlace, setFocusedPlace] = useState(null);

    const [selectedDayIdx, setSelectedDayIdx] = useState(null); // 선택된 일차 인덱스

    return (
        <TripContext.Provider
            value={{
                tripInfo,
                setTripInfo,
                tripDestination,
                setTripDestination,
                storedPlaces,
                setStoredPlaces,
                storedAccommodations,
                setStoredAccommodations,
                schedules,
                setSchedules,
                placeModalInfo,
                setPlaceModalInfo,
                focusedPlace,
                setFocusedPlace,
                selectedDayIdx,
                setSelectedDayIdx
            }}
        >
            {children}
        </TripContext.Provider>
    );
}

export function useTrip() {
    return useContext(TripContext);
}
