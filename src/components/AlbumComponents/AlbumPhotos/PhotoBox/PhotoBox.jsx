import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumDetailModal from "../../AlbumDetailModal/AlbumDetailModal";

function PhotoBox({
    photos,
    album,
    checkedPhoto,
    setCheckedPhoto,
    selectMode
}) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
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
            return newSet;
        });
    };
    return (
        <>
            {photos ? (
                photos.map((photo) => (
                    <div key={photo.photoId} css={S.SAlbumImg}>
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
                        <img
                            onClick={() => handlePhotoClick(photo, album)}
                            src={photo?.photoUrl}
                            draggable="false"
                        />
                    </div>
                ))
            ) : (
                <div
                    style={{
                        height: "200px",
                        textAlign: "center",
                        paddingTop: "50px",
                    }}
                >
                    사진 불러오는 중...
                </div>
            )}
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
