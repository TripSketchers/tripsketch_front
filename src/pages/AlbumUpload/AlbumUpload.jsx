import React, { useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import NavLayout from '../../components/NavLayout/NavLayout';
import NavContainer from '../../components/NavContainer/NavContainer';
import ImgUpload from '../../components/ImgUpload/ImgUpload';

function AlbumUpload(props) {
    // const handleSaveClick = () => { //저장버튼 클릭시 localStorage에 저장
    //     localStorage.setItem("profileImg", JSON.stringify(Img));
    // }

    return (
        <NavLayout>
            <NavContainer>
                <div css={S.SLayout}>
                    <div css={S.SLeftContainer}>
                        <h3>사진 업로드</h3>
                        <ImgUpload />
                    </div>
                    <div  css={S.SRightContainer}>
                        <div>
                            <h3>장소 선택</h3>
                            <div>
                                <div>
                                    {/* 날짜 가져오기 */}
                                    <div>{"날짜"}</div>
                                </div>
                                <div>
                                    <div>{"장소"}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>추억 기록</h3>
                            <input type="text" />
                            <button></button>
                        </div>
                        <button >업로드</button>
                    </div>
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default AlbumUpload;