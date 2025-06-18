import React from "react";
import TripDateBox from "./TripDateBox/TripDateBox";
import TripDateModal from "./TripDateModal/TripDateModal";
import { eachDayOfInterval, format, addDays } from "date-fns";
import { ko } from "date-fns/locale";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useTrip } from "../../Routes/TripContext";

function TripDate({ showModal, setShowModal }) {
    const { tripInfo, setTripInfo, storedAccommodations, setStoredAccommodations } = useTrip();

    const tripDays =
        tripInfo?.startDate && tripInfo?.endDate
            ? eachDayOfInterval({
                  start: new Date(tripInfo.startDate),
                  end: new Date(tripInfo.endDate),
              })
            : [];

    const handleSelectDateRange = ({ startDate, endDate }) => {
        const validDates = eachDayOfInterval({
            start: startDate,
            end: addDays(endDate, -1),
        }).map((day) => format(day, "yyyy-MM-dd"));

        const filteredAccommodation = Object.fromEntries(
            Object.entries(storedAccommodations).filter(([key]) =>
                validDates.includes(key)
            )
        );

        setStoredAccommodations(filteredAccommodation);
        setTripInfo((prev) => ({
            ...prev,
            startDate,
            endDate,
        }));
        setShowModal(false);
    };

    return (
        <div>
            <div css={S.SContainer}>
                {tripDays.map((day, idx) => (
                    <TripDateBox
                        key={idx}
                        index={idx}
                        date={format(day, "MM/dd(eee)", { locale: ko })}
                    />
                ))}
            </div>

            {showModal && (
                <TripDateModal
                    savedDateRange={{
                        startDate: tripInfo?.startDate,
                        endDate: tripInfo?.endDate,
                    }}
                    onClose={() => setShowModal(false)}
                    onSelect={handleSelectDateRange}
                />
            )}
        </div>
    );
}

export default TripDate;
