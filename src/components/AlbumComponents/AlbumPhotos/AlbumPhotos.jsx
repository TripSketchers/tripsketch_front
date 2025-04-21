import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumDetailModal from "../AlbumDetailModal/AlbumDetailModal";
import { differenceInDays } from 'date-fns';

function AlbumPhotos({ albums, startDate }) {
    const [ sorting, setSorting ] = useState(0); //최신순 : 0, 과거순: 1
    const [ selectedPhoto, setSelectedPhoto ] = useState(null);

    const handleSortingClick = (num) => {
        setSorting(num);
    };

    const handlePhotoClick = (photo, album) => {
        setSelectedPhoto({
            ...photo,
            date: album.date,
            place: album.place
        });
    }

    // 여기서 날짜 차이 + 정렬까지 가공
    const sortedAlbums = [...albums].map(item => {
        const daysDiff = differenceInDays(
            new Date(item.album.date),
            new Date(startDate)
        );
        return {
            ...item,
            dayDiff: `${daysDiff + 1}일차`
        };
    })

    return (
        <>
            <div css={S.SSortingBox}>
                <span onClick={() => handleSortingClick(0)}>최신순</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span onClick={() => handleSortingClick(1)}>오래된 순</span>
            </div>
            {sortedAlbums.map((item) => (
                <div css={S.SAlbumContainer} key={item.album.albumId}>
                    <div css={S.SScheduleBox}>
                        <span>{item.dayDiff}</span> &nbsp;| &nbsp;
                        {item.album.date} {item.album.place}
                    </div>
                    <div css={S.SAlbumBox}>
                        {item.photos.map((photo) => (
                            <div
                                css={S.SAlbumImg}
                                key={photo.photoId}
                                onClick={() => handlePhotoClick(photo, item.album)}
                            >
                                <img src={photo.photoUrl} draggable="false" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {selectedPhoto && (
                <AlbumDetailModal 
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                />
            )}
        </>
    );
}

export default AlbumPhotos;
