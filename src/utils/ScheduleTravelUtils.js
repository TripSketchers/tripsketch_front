import { instance } from "../api/config/instance";

export const getTravelTimePromise = (origin, dest, transportType) => {
    if (!origin || !dest) return null;

    const originLat = origin.place?.latitude ?? origin?.latitude;
    const originLng = origin.place?.longitude ?? origin?.longitude;
    const destLat = dest.place?.latitude ?? dest?.latitude;
    const destLng = dest.place?.longitude ?? dest?.longitude;

    if (
        originLat == null ||
        originLng == null ||
        destLat == null ||
        destLng == null
    )
        return null;

    return instance
        .get("/trips/traveltime", {
            params: {
                originLat,
                originLng,
                destLat,
                destLng,
                mode: transportType === 0 ? "TRANSIT" : "DRIVE",
            },
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
        })
        .then((res) => {
            const seconds = res.data ?? 0;
            const minutes = Math.round(seconds / 60);

            // ✅ origin, destination 포함해서 반환
            return {
                from: origin.tripScheduleId,
                travelTime: minutes,
                origin: {
                    lat: originLat,
                    lng: originLng,
                },
                destination: {
                    lat: destLat,
                    lng: destLng,
                },
            };
        })
        .catch((err) => {
            console.error("🚨 경로 계산 실패", err);
            return {
                from: origin.tripScheduleId,
                travelTime: 0,
                origin: {
                    lat: originLat,
                    lng: originLng,
                },
                destination: {
                    lat: destLat,
                    lng: destLng,
                },
                error: true,
            };
        });
};

export const calculateTravelTimes = async (
    prevSchedules,
    tempSchedules,
    prevIndex,
    currIndex,
    transportType
) => {
    const travelPairs = [];

    if (prevIndex > 0 && prevIndex < prevSchedules.length - 1) {
        travelPairs.push([
            prevSchedules[prevIndex - 1],
            prevSchedules[prevIndex + 1],
        ]);
    }

    if (currIndex > 0) {
        travelPairs.push([
            tempSchedules[currIndex - 1],
            tempSchedules[currIndex],
        ]);
    }
    if (currIndex < tempSchedules.length - 1) {
        travelPairs.push([
            tempSchedules[currIndex],
            tempSchedules[currIndex + 1],
        ]);
    }

    const travelPromises = travelPairs
        .filter(
            ([from, to]) =>
                from && to && from.tripScheduleId && to.tripScheduleId
        )
        .map(([from, to]) => getTravelTimePromise(from, to, transportType));

    const travelResults = await Promise.all(travelPromises);

    return travelResults;
};

export const calculateAllTravelTimes = async (schedules, transportType = 1) => {
    if (!Array.isArray(schedules) || schedules.length < 2) return schedules;

    const updatedSchedules = [...schedules];

    const travelPromises = [];

    for (let i = 0; i < schedules.length - 1; i++) {
        const from = schedules[i];
        const to = schedules[i + 1];

        if (
            from.date !== to.date ||
            !from.place ||
            !to.place ||
            (!from.place.latitude && !from.latitude) ||
            (!to.place.latitude && !to.latitude)
        )
            continue;

        travelPromises.push(
            getTravelTimePromise(from, to, transportType).then((res) => ({
                index: i, // ✅ from에 저장
                travelTime: res.travelTime,
            }))
        );
    }

    const travelResults = await Promise.all(travelPromises);

    travelResults.forEach(({ index, travelTime }) => {
        updatedSchedules[index].travelTime = travelTime; // ✅ 출발지에 저장
    });

    return updatedSchedules;
};
