import React, { useEffect, useMemo, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumDetailModal from "../AlbumDetailModal/AlbumDetailModal";
import { differenceInDays } from "date-fns";
import { instance } from "../../../api/config/instance";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import { useParams } from "react-router-dom";

function AlbumPhotos({ albums, startDate }) {
    const { tripId } = useParams();
    const queryClient = useQueryClient();
    const observerRef = useRef({});
    const [visibleAlbums, setVisibleAlbums] = useState(new Set());

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const [selectMode, setSelectMode] = useState(false);
    const [checkedPhoto, setCheckedPhoto] = useState(new Set());

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
                rootMargin: "500px 0px",
                threshold: 0.1, // 화면의 10% 이상 보일 때 로딩 시작
            }
        );

        // 관찰할 섹션 등록
        albums.forEach((album) => {
            const ref = observerRef.current[album.albumId];
            if (ref) observer.observe(ref);
        });

        return () => {
            // 클린업: unobserve
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
            enabled: visibleAlbums.has(String(album.albumId)), // lazy load: viewport에 들어왔을 때만 실행
            staleTime: Infinity,
        })),
    });

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
        console.log(checkedPhoto);
    };

    const handleDeleteSelected = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
                data: Array.from(checkedPhoto).map((key) => {
                    const [albumId, photoId] = key.split("-");
                    return {
                        photoId: parseInt(photoId),
                        albumId: parseInt(albumId),
                    };
                })
            };
            await instance.delete(`/trips/${tripId}/album/photos`, option);
            alert(`사진  삭제 완료`);
            queryClient.invalidateQueries(["getAlbum", tripId]);
        } catch (error) {
            console.log(error);
        }
        // 선택 초기화
        setCheckedPhoto(new Set());
        setSelectMode(false);
    };

    return (
        <>
            <div css={S.SSelectMode}>
                {!!selectMode && sortedAlbums ? (
                    <>
                        <button onClick={handleDeleteSelected}>선택삭제</button>
                        <button onClick={() => setSelectMode(false)}>
                            취소
                        </button>
                    </>
                ) : (
                    <button onClick={() => setSelectMode(true)}>
                        <FaTrash />
                    </button>
                )}
            </div>
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
                                            onClick={() =>
                                                handlePhotoClick(photo, album)
                                            }
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
