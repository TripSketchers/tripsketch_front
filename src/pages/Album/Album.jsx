import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import NavLayout from '../../components/NavLayout/NavLayout';
import AlbumFolder from '../../components/AlbumFolder/AlbumFolder';
import NavContainer from '../../components/NavContainer/NavContainer';
import { Link } from 'react-router-dom';
import AlbumWhole from '../../components/AlbumWhole/AlbumWhole';

function Album(props) {
    const [ viewType, setViewType ] = useState(0);        

    return (
        <NavLayout>
            <NavContainer>
                <h1>여행 이름</h1>
                <div css={S.ViewTypeBox}>
                    <div>
                        <span css={S.ViewType(viewType == 0 ? 1 : 0)} onClick={() => setViewType(0)}>전체보기</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span css={S.ViewType(viewType == 1 ? 1 : 0)} onClick={() => setViewType(1)}>폴더별 보기</span>
                    </div>
                    <Link to={"/album/upload"}>사진 업로드</Link>
                </div>
                <div>
                <div css={S.SortingBox}>
                    <span>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span>오래된 순</span>
                </div>
                {viewType === 0 ? <AlbumWhole /> : <AlbumFolder />}
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default Album;