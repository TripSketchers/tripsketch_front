export const getColorByCategory = (category, isBackground = false) => {
	if (isBackground) {
		switch (category) {
			case "명소":
				return "#e9f5e9"; // 연한 초록
			case "맛집":
				return "#ffeae3"; // 연한 주황
			case "카페":
				return "#f3e4f5"; // 연한 보라
			case "숙소":
				return "#e3f2fd"; // 연한 파랑
			default:
				return "#E0E0E0"; // 연한 회색
		}
	} else {
		switch (category) {
			case "명소":
				return "#4CAF50"; // 진한 초록
			case "맛집":
				return "#FF5722"; // 진한 주황
			case "카페":
				return "#9C27B0"; // 진한 보라
			case "숙소":
				return "#2196F3"; // 진한 파랑
			default:
				return "#757575"; // 진한 회색
		}
	}
};
