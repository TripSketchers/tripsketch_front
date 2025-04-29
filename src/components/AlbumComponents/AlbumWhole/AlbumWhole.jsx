import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../../api/config/instance';
import AlbumPhotos from '../AlbumPhotos/AlbumPhotos';

function AlbumWhole({ albums, startDate }) {
    const [ sorting, setSorting ] = useState(0); //최신순 : 0, 과거순: 1

    const handleSortingClick = (num) => {
        setSorting(num);
    };

    return (
        <div>
            <div css={S.SSortingBox}>
                <span onClick={() => handleSortingClick(0)}>최신순</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span onClick={() => handleSortingClick(1)}>오래된 순</span>
            </div>
            {albums && (
                <AlbumPhotos
                    albums={albums}
                    startDate={startDate}
                />
            )}
        </div>
    );
}

export default AlbumWhole;