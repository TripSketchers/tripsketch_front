import { instance } from "../api/config/instance";

// ✅ 백엔드를 통해서 blob 이미지를 가져오는 함수
export const getImageBlobUrl = async (photoReference) => {
    if (!photoReference) return "";
    try {
        const res = await instance.get(`/photo?ref=${encodeURIComponent(photoReference)}`, {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
            responseType: "blob",
        });
        return URL.createObjectURL(res.data);
    } catch (err) {
        console.error("이미지 로딩 실패", err);
        return "";
    }
};
