import { useEffect, useRef } from "react";

export default function useAutoScrollDuringDrag(scrollRef, isDragging) {
	const scrollInterval = useRef(null);

	useEffect(() => {
		if (!isDragging || !scrollRef?.current) return;

		const container = scrollRef.current;
		const threshold = 150;
		const scrollSpeed = 20;

		const handleMouseMove = (e) => {
			const mouseY = e.clientY;
			const windowHeight = window.innerHeight;

			clearInterval(scrollInterval.current);

			// 브라우저 최상단 기준
			if (mouseY <= threshold) {
				scrollInterval.current = setInterval(() => {
					container.scrollTop = Math.max(0, container.scrollTop - scrollSpeed);
				}, 16);
			}
			// 브라우저 하단 기준
			else if (mouseY >= windowHeight - threshold) {
				scrollInterval.current = setInterval(() => {
					container.scrollTop = container.scrollTop + scrollSpeed;
				}, 16);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", () => clearInterval(scrollInterval.current));

		return () => {
			clearInterval(scrollInterval.current);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", () => clearInterval(scrollInterval.current));
		};
	}, [isDragging, scrollRef]);
}
