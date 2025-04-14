import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import AlbumPhoto from "../../../assets/AlbumPhoto.jpg";
import AlbumDetailModal from '../AlbumDetailModal/AlbumDetailModal';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../../api/config/instance';

function AlbumWhole({tripId}) {
    const [ sorting, setSorting ] = useState(0); //최신순 : 0, 과거순: 1
    const [ openDetailModal, setOpenDetailModal ] = useState(0);
    
    const handleSortingClick =(num) => {
        setSorting(num);
    }

    const handle = () => {
        setOpenDetailModal(1);
    }

    const getAlbum = useQuery({
        queryKey: ["getAlbum"],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
                return await instance.get(`/trips/${1}/album/photos`, options);
            }catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false
    });

    console.log(getAlbum?.data?.data.map(item => item.photos.map(photo => photo.memo)));

    return (
        <div>
            <div css={S.SSortingBox}>
                <span onClick={() => handleSortingClick(0) } >최신순</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span onClick={() => handleSortingClick(1)} >오래된 순</span>
            </div>
            {getAlbum?.data?.data?.map(item => {
                return (
                <div css={S.SAlbumContainer}>
                    <span>{item.album.date}&nbsp;{item.album.place}</span>
                    <div css={S.SAlbumBox}>
                        {item.photos.map(photo => {
                            return (
                                <div css={S.SAlbumImg}>
                                    <img src={photo.photoUrl}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )})}
            <button onClick={handle}>임시버튼</button>
            {openDetailModal && <AlbumDetailModal /> }
        </div>
    );
}

export default AlbumWhole;