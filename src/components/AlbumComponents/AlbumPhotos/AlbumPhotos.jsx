import React, { useEffect, useMemo, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumDetailModal from "../AlbumDetailModal/AlbumDetailModal";
import { differenceInDays } from "date-fns";
import { instance } from "../../../api/config/instance";
import { useQueries } from "@tanstack/react-query";

function AlbumPhotos({ albums, startDate }) {
    const observerRef = useRef({});
    const [visibleAlbums, setVisibleAlbums] = useState(new Set());

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (photo, album) => {
        setSelectedPhoto({
            ...photo,
            date: album.date,
            placeName: album.placeName,
        });
    };

    // 여기서 n일차 가공
    const sortedAlbums = [...albums].map((item) => {
        const daysDiff = differenceInDays(
            new Date(item.date),
            new Date(startDate)
        );
        return {
            ...item,
            dayDiff: `${daysDiff + 1}일차`,
        };
    });

    useEffect(() => {
        if (albums.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const albumId =
                            entry.target.getAttribute("data-album-id");

                        setVisibleAlbums((prev) => {
                            if (!prev.has(albumId)) {
                                const newSet = new Set(prev);
                                newSet.add(albumId);
                                return newSet;
                            }
                            return prev;
                        });
                    }
                }
            },
            {
                rootMargin: "300px",
                threshold: 0.1,
            }
        );

        albums.forEach((album) => {
            const ref = observerRef.current[album.albumId];
            if (ref) observer.observe(ref);
        });

        return () => {
            albums.forEach((album) => {
                const ref = observerRef.current[album.albumId];
                if (ref) observer.unobserve(ref);
            });
        };
    }, [albums]);

    // 개별 앨범 사진 로딩 useQuery
    const albumPhotoQueries = useQueries({
        queries: albums.map((album) => ({
            queryKey: ["getAlbumPhotos", album.albumId],
            queryFn: async () => {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                const response = await instance.get(
                    `/trips/album/${album.albumId}/photos`,
                    options
                );
                return response.data.photos;
            },
            enabled: visibleAlbums.has(String(album.albumId)), // lazy load
            staleTime: Infinity,
        })),
    });

    return (
        <>
            {sortedAlbums.map((album, index) => {
                const photos = albumPhotoQueries[index]?.data || [];

                return (
                    <div
                        key={album.albumId}
                        ref={(el) => (observerRef.current[album.albumId] = el)}
                        data-album-id={album.albumId}
                        css={S.SAlbumContainer}
                    >
                        <div css={S.SScheduleBox}>
                            <span>{album.dayDiff}</span> &nbsp;|&nbsp;{" "}
                            {album.date} {album.placeName}
                        </div>
                        <div css={S.SAlbumBox}>
                            {photos.map((photo) => (
                                <div
                                    key={photo.photoId}
                                    css={S.SAlbumImg}
                                    onClick={() =>
                                        handlePhotoClick(photo, album)
                                    }
                                >
                                    <img
                                        src={photo?.photoUrl}
                                        draggable="false"
                                    />
                                </div>
                            ))}
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

export default AlbumPhotos;
