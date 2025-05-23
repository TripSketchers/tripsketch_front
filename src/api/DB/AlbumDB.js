import Dexie from "dexie";

export const AlbumDB = new Dexie("TripSketchDB");

AlbumDB.version(1).stores({
    photos: "++id",
});

// 데이터 추가 함수
export const addPhoto = async (file) => {
    await AlbumDB.photos.add({ file });     //blob저장
};

// 데이터 전체 조회
export const getAllPhotos = async () => {
    return await AlbumDB.photos.toArray();
};

// 특정 사진 삭제 (혹은 전체 삭제도 가능)
export const deletePhoto = async (id) => {
    await AlbumDB.photos.delete(id);
};

// 전체 비우기
export const clearPhotos = async () => {
    await AlbumDB.photos.clear();
};