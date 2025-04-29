import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import AlbumPhotos from "../AlbumPhotos/AlbumPhotos";
import AlbumFolderItem from "./AlbumFolderItem/AlbumFolderItem";
import { RiArrowGoBackFill } from "react-icons/ri";
import { groupBy } from "lodash";

function AlbumFolder({ albums, startDate }) {
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);  //폴더(앨범) 클릭시 albumId 저장

    // 선택한 albumId에 맞는 앨범 하나 찾기
    const selectedAlbum = albums.find(item => item.albumId === selectedAlbumId);

    // 날짜별로 albums 그룹화
    const albumsByDate = groupBy(albums, item => item.date);

    return (
        <div>
            {selectedAlbum ? (
                <div>
                    <button css={S.SBackButton} onClick={() => setSelectedAlbumId(0)}>
                        <RiArrowGoBackFill /> 돌아가기
                    </button>
                    <AlbumPhotos
                        albums={[{
                            albumId: selectedAlbum.albumId,
                            date: selectedAlbum.date,
                            place: selectedAlbum.placeName,
                        }]}
                        startDate={startDate}
                    />
                </div>
            ) : (
                <>
                    <div css={S.SSortingBox}>
                        <span>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span>오래된 순</span>
                    </div>
                    {Object.entries(albumsByDate).map(([date, items], index) => (
                        <div key={date}>
                            <div css={S.SDateBox}><span>{index + 1}일차</span> | {date}</div>
                            <div css={S.SFolderContainer}>
                                {items.map((item) => (
                                    <AlbumFolderItem
                                        key={item.albumId}
                                        album={item}
                                        photo={item.photoUrl}
                                        onClickFolder={(id) => setSelectedAlbumId(id)}
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
