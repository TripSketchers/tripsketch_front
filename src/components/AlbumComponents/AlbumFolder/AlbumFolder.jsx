import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumPhotos from "../AlbumPhotos/AlbumPhotos";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/config/instance";
import AlbumFolderItem from "./AlbumFolderItem/AlbumFolderItem";

function AlbumFolder({ tripId }) {
    const [selectedAlbumId, setSelectedAlbumId] = useState(0);  //폴더(앨범) 클릭시 albumId 저장

    // 폴더 리스트 불러오기
    const getAlbumFolder = useQuery({
        queryKey: ["getAlbumFolder", tripId],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                return await instance.get(`/trips/${1}/album/folders`, options);
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    // 클릭한 폴더의 사진만 가져오기
    const getAlbumPhotos = useQuery({
        queryKey: ["getAlbumPhotos", selectedAlbumId],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                return await instance.get(
                    `/trips/${1}/albums/${selectedAlbumId}`,
                    options
                );
            } catch (error) {
                console.error(error);
            }
        },
        enabled: !!selectedAlbumId, // 선택했을 때만 실행
        retry: 0,
        refetchOnWindowFocus: false,
    });

    if (getAlbumPhotos.isLoading) return <div>로딩 중...</div>;

    console.log(getAlbumPhotos?.data?.data);
    
    return (
        <div>
            {getAlbumPhotos.data ? (
                <div>
                    <button onClick={() => setSelectedAlbumId(null)}>
                        뒤로가기
                    </button>
                    <AlbumPhotos
                        albums={getAlbumPhotos.data?.data.albums}
                        startDate={getAlbumPhotos.data?.data.startDate}
                    />
                </div>
            ) : (
                <>
                    <div css={S.SSortingBox}>
                        <span>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span>오래된 순</span>
                    </div>
                    <div css={S.SFolderContainer}>
                        {getAlbumFolder?.data?.data.albums.map((item) => (
                            <AlbumFolderItem
                                key={item.album.albumId}
                                album={item.album}
                                photos={item.photos}
                                onClickFolder={(id) => setSelectedAlbumId(id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default AlbumFolder;
