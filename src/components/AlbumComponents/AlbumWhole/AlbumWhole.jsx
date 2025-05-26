import React from 'react';
import AlbumPhotos from '../AlbumPhotos/AlbumPhotos';

function AlbumWhole({ albums }) {
    return (
        <>
            {albums && (
                <AlbumPhotos
                    albums={albums}
                />
            )}
        </>
    );
}

export default AlbumWhole;