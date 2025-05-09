import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumPhotos from "../AlbumPhotos/AlbumPhotos";
import AlbumFolderItem from "./AlbumFolderItem/AlbumFolderItem";
import { RiArrowGoBackFill } from "react-icons/ri";
import { groupBy } from "lodash";

function AlbumFolder({ albums, setShowSorting }) {
    const [selectedAlbumId, setSelectedAlbumId] = useState(null); //폴더(앨범) 클릭시 albumId 저장

    // 선택한 albumId에 맞는 앨범 하나 찾기
    const selectedAlbum = albums.find(
        (item) => item.albumId === selectedAlbumId
    );

    // 날짜별로 albums 그룹화
    const albumsByDate = groupBy(albums, (item) => item.date);

    useEffect(() => {
        // selectedAlbum이 없을 때만 정렬 보이게
        if (!selectedAlbum) {
            setShowSorting(true);
        }
    }, [selectedAlbum]);

    return (
        <div>
            {selectedAlbum ? (
                <div>
                    <button
                        css={S.SBackButton}
                        onClick={() => setSelectedAlbumId(null)}
                    >
                        <RiArrowGoBackFill /> 돌아가기
                    </button>
                    <AlbumPhotos albums={[selectedAlbum]} />
                </div>
            ) : (
                <>
                    {Object.entries(albumsByDate).map(([date, items]) => (
                        <div key={date}>
                            <div css={S.SDateBox}>
                                <span>{items[0].dayDiff}</span> | {date}
                            </div>
                            <div css={S.SFolderContainer}>
                                {items.map((item) => (
                                    <AlbumFolderItem
                                        key={item.albumId}
                                        album={item}
                                        photo={item.photoUrl}
                                        onClickFolder={(id) => {
                                            setShowSorting(false);
                                            setSelectedAlbumId(id);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default AlbumFolder;
