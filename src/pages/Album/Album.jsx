import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import NavLayout from '../../components/NavLayout/NavLayout';
import Folder from '../../components/Folder/Folder';
import NavContainer from '../../components/NavContainer/NavContainer';
import { Link } from 'react-router-dom';

function Album(props) {
    return (
        <NavLayout>
            <NavContainer>
                <h1>여행 이름</h1>
                <div css={S.ViewType}>
                    <div>
                        <span>전체보기</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span>폴더별 보기</span>
                    </div>
                    <Link to={"/album/upload"}>사진 업로드</Link>
                </div>
                <div css={S.SortingBox}>
                    <span>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span>오래된 순</span>
                </div>
                <div>
                    {/* 전체보기 */}
                    <span>{"날짜"}&nbsp;{"장소"}</span>
                    <div css={S.AlbumContainer}>
                        {/* div 삽입 */}
                    </div>

                    {/* 폴더별 보기기 */}
                    <div css={S.SFolderContainer}>
                        {/* <Folder img={"img"} date={"date"} place={"place"} /> */}
                    </div>
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default Album;