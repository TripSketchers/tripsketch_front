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
