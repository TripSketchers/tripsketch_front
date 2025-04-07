import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import NavLayout from '../../components/NavLayout/NavLayout';
import AlbumFolder from '../../components/AlbumFolder/AlbumFolder';
import NavContainer from '../../components/NavContainer/NavContainer';
import { Link } from 'react-router-dom';
import AlbumWhole from '../../components/AlbumWhole/AlbumWhole';

function TripAlbum(props) {
    const [ viewType, setViewType ] = useState(0);     
    
    const handleRadioChange = (event) => {
        // event.target.value에 따라 viewType을 업데이트
        setViewType(event.target.value === 'Monthly' ? 0 : 1);
    };

    return (
        <NavLayout>
            <NavContainer>
                <h1>여행 이름</h1>
                <div css={S.SViewTypeBox}>
                    <div class="switches-container">
                        <input type="radio" id="switchWhole" name="switchPlan" value="Monthly" 
                            checked={viewType === 0}
                            onChange={handleRadioChange}/>
                        <input type="radio" id="switchFolder" name="switchPlan" value="Yearly" 
                            checked={viewType === 1}
                            onChange={handleRadioChange} />
                        <label for="switchWhole">전체보기</label>
                        <label for="switchFolder">폴더별 보기</label>
                        <div class="switch-wrapper">
                        <div class="switch">
                            <div>전체보기</div>
                            <div>폴더별 보기</div>
                        </div>
                        </div>
                    </div>
                    
                    <Link to={"/album/upload"}>사진 업로드</Link>
                </div>
                <div>
                {viewType === 0 ? <AlbumWhole /> : <AlbumFolder />}
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default TripAlbum;