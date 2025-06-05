import { useEffect } from "react";

function useAutoScroll(isDragging, containerRef, { scrollThreshold = 50, scrollSpeed = 10 } = {}) {
  useEffect(() => {
    if (!isDragging) return;

    const handleAutoScroll = (e) => {
      if (!containerRef?.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // 커서가 상단 임계값 내에 있을 경우 위쪽으로 스크롤
      if (e.clientY < rect.top + scrollThreshold) {
        containerRef.current.scrollBy({
          top: -scrollSpeed,
          behavior: "auto",
        });
      }
      // 커서가 하단 임계값 내에 있을 경우 아래쪽으로 스크롤
      else if (e.clientY > rect.bottom - scrollThreshold) {
        containerRef.current.scrollBy({
          top: scrollSpeed,
          behavior: "auto",
        });
      }
    };

    document.addEventListener("dragover", handleAutoScroll);
    return () => {
      document.removeEventListener("dragover", handleAutoScroll);
    };
  }, [isDragging, containerRef, scrollSpeed, scrollThreshold]);
}

export default useAutoScroll;
