import { useEffect } from "react";

function usePrompt(shouldBlock, message) {
    useEffect(() => {
        if (!shouldBlock) return;

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        const handlePopState = (e) => {
            const confirmLeave = window.confirm(message);
            if (confirmLeave) {
                // 사용자가 '확인'을 눌렀으므로 다시 popstate 되도록 한 번 더 뒤로 가기
                window.removeEventListener("popstate", handlePopState); // 무한 루프 방지
                window.history.back();
            } else {
                // 사용자가 '취소'를 누르면 다시 pushState로 현재 상태를 유지
                window.history.pushState(null, "", window.location.pathname);
            }
        };

        // popstate가 먹히려면 최초에 pushState가 필요함
        window.history.pushState(null, "", window.location.pathname);

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [shouldBlock, message]);
}

export default usePrompt;
