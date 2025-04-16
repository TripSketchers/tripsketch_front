import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../../api/config/instance';
import AlbumPhotos from '../AlbumPhotos/AlbumPhotos';

function AlbumWhole({tripId}) {
    const getAlbum = useQuery({
        queryKey: ["getAlbum", tripId],
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

    return (
        <div>
            {getAlbum?.data?.data?.albums && (
                <AlbumPhotos
                    albums={getAlbum.data.data.albums}
                    startDate={getAlbum.data.data.startDate}
                />
            )}
        </div>
    );
}

export default AlbumWhole;