import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumDetailModal from "../../AlbumDetailModal/AlbumDetailModal";

function PhotoBox({
    photos,
    album,
    checkedPhoto,
    setCheckedPhoto,
    selectMode,
}) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [loadedMap, setLoadedMap] = useState({}); // 각 이미지별 로딩 상태 저장

    const handlePhotoClick = (photo, album) => {
        setSelectedPhoto({
            ...photo,
            date: album.date,
            placeName: album.placeName,
        });
    };

    const handleCheckboxChange = (photoId, albumId) => {
        setCheckedPhoto((prev) => {
            const newSet = new Set(prev);
            const photoKey = `${albumId}-${photoId}`; // albumId와 photoId를 조합한 고유 키
            if (newSet.has(photoKey)) {
                newSet.delete(photoKey);
            } else {
                newSet.add(photoKey);
            }
            console.log(newSet);
            return newSet;
        });
    };

    const handleImageLoad = (photoId) => {
        setLoadedMap((prev) => ({
            ...prev,
            [photoId]: true,
        }));
    };

    return (
        <>
            {photos.map((photo) => {
                const isLoaded = loadedMap[photo.photoId];
                return (
                    <div key={photo.photoId} css={S.SAlbumImgBox}>
                        {selectMode && (
                            <input
                                css={S.SImgCheckBox}
                                type="checkbox"
                                checked={checkedPhoto.has(
                                    `${album.albumId}-${photo.photoId}`
                                )}
                                onChange={() =>
                                    handleCheckboxChange(
                                        photo.photoId,
                                        album.albumId
                                    )
                                }
                            />
                        )}
                        <div
                            css={S.wrapper}
                            onClick={() => handlePhotoClick(photo, album)}
                        >
                            {!isLoaded && <div css={S.placeholder} />}
                            <img
                                src={photo.photoUrl}
                                alt=""
                                css={S.image(isLoaded)}
                                onLoad={() => handleImageLoad(photo.photoId)}
                                draggable="false"
                            />
                        </div>
                    </div>
                );
            })}
            {selectedPhoto && (
                <AlbumDetailModal
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                />
            )}
        </>
    );
}

export default PhotoBox;
