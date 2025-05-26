import React, { useEffect, useMemo, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { instance } from "../../../api/config/instance";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import PhotoBox from "./PhotoBox/PhotoBox";

function AlbumPhotos({ albums }) {
    const { tripId } = useParams();
    const queryClient = useQueryClient();
    const observerRef = useRef({});
    const [visibleAlbums, setVisibleAlbums] = useState(new Set());

    // 선택 삭제에 사용
    const [selectMode, setSelectMode] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedPhoto, setCheckedPhoto] = useState(new Set());

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
                return response.data;
            },
            enabled: visibleAlbums.has(String(album.albumId)), // lazy load: viewport에 들어왔을 때만 실행
            staleTime: Infinity,
        })),
    });
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
                }),
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

    const handlePhotoSelectAll = () => {
        const newSet = new Set();

        if (!isAllChecked) {
            // 모든 사진 선택 (보이는 앨범만)
            albumPhotoQueries.forEach((query, index) => {
                const photos = query.data || [];
                const albumId = albums[index].albumId;
                photos.forEach((photo) => {
                    newSet.add(`${albumId}-${photo.photoId}`);
                });
            });
        }
        setCheckedPhoto(newSet);
        setIsAllChecked(!isAllChecked);
    };

    useEffect(() => {
        const totalPhotoCount = albumPhotoQueries.reduce((total, query) => {
            const photos = query.data || [];
            return total + photos.length;
        }, 0);

        setIsAllChecked(
            checkedPhoto.size > 0 && checkedPhoto.size === totalPhotoCount
        );
    }, [checkedPhoto, albumPhotoQueries]);


    return (
        <div css={S.SLayout}>
            <div css={S.SSelectMode}>
                {albums.length > 0 &&
                    (selectMode ? (
                        <>
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onClick={handlePhotoSelectAll}
                            />
                            <button onClick={handleDeleteSelected}>
                                <FaTrash /> 삭제
                            </button>
                            <button className="cancel" onClick={() => setSelectMode(false)}>
                                취소
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setSelectMode(true)}>
                            <FaTrash /> 선택 삭제
                        </button>
                    ))}
            </div>
            {albums.map((album, index) => {
                const photos = albumPhotoQueries[index]?.data || [];

                return (
                    <div
                        key={album.albumId}
                        ref={(el) => (observerRef.current[album.albumId] = el)}
                        data-album-id={album.albumId}
                        css={S.SAlbumContainer}
                    >
                        <div css={S.SScheduleBox}>
                            <span>{album.dayDiff}</span> &nbsp;|&nbsp;&nbsp;
                            {album.date} {album.placeName}
                        </div>
                        <div css={S.SAlbumBox}>
                            <PhotoBox
                                photos={photos}
                                album={album}
                                checkedPhoto={checkedPhoto}
                                setCheckedPhoto={setCheckedPhoto}
                                selectMode={selectMode}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AlbumPhotos;
