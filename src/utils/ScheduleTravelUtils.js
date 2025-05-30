import { instance } from "../api/config/instance";

export const getTravelTimePromise = (origin, dest, transportType) => {
	console.log(
		"🚗 경로 계산 시작 from",
		origin.place?.name || origin.name,
		"to",
		dest.place?.name || dest.name
	);
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

			// ✅ 결과를 반환하도록 수정
			return {
				from: origin.tripScheduleId,
				travelTime: minutes,
			};
		})
		.catch((err) => {
			console.error("🚨 경로 계산 실패", err);
			return {
				from: origin.tripScheduleId,
				travelTime: 0,
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
		.filter(([from, to]) => from && to && from.tripScheduleId && to.tripScheduleId)
		.map(([from, to]) => getTravelTimePromise(from, to, transportType));

	const travelResults = await Promise.all(travelPromises);

	return travelResults;
};
