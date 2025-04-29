export const getCategoryFromTypes = (types = []) => {
	const typeToCategoryMap = {
		tourist_attraction: "명소",
		restaurant: "맛집",
		cafe: "카페",
		lodging: "숙소",
	};

	for (const type of types) {
		if (typeToCategoryMap[type]) {
			return typeToCategoryMap[type];
		}
	}
	return "기타";
};

export const getColorByCategory = (category) => {
	switch (category) {
		case "명소":
			return "#4CAF50";
		case "맛집":
			return "#FF5722";
		case "카페":
			return "#9C27B0";
		case "숙소":
			return "#2196F3";
		default:
			return "#757575";
	}
};
