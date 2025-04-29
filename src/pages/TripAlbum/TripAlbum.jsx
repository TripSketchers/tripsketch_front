import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import NavLayout from '../../components/NavComponents/NavLayout/NavLayout';
import AlbumFolder from '../../components/AlbumComponents/AlbumFolder/AlbumFolder';
import NavContainer from '../../components/NavComponents/NavContainer/NavContainer';
import { Link, useParams } from 'react-router-dom';
import AlbumWhole from '../../components/AlbumComponents/AlbumWhole/AlbumWhole';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../api/config/instance';

function TripAlbum( props ) {
    const { tripId } = useParams();

    const [ viewType, setViewType ] = useState(0);     
    
    const handleRadioChange = (event) => {
        // event.target.value에 따라 viewType을 업데이트
        setViewType(event.target.value === 'Whole' ? 0 : 1);
    };

    const getAlbum = useQuery({
        queryKey: ["getAlbum", tripId],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
                const response = await instance.get(`/trips/${tripId}/albums`, options);
                return response.data;  // 앨범 그룹 정보 + 첫 번째 사진 URL 포함
            }catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false
    });

    console.log(getAlbum.data);

    return (
        <NavLayout>
            <NavContainer>
                <h1>여행 이름</h1>
                <div css={S.SViewTypeBox}>
                    <div class="switches-container">
                        <input type="radio" id="switchWhole" name="switchPlan" value="Whole" 
                            checked={viewType === 0}
                            onChange={handleRadioChange}/>
                        <input type="radio" id="switchFolder" name="switchPlan" value="Folder" 
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
                    <Link to={`/trip/album/${tripId}/upload`}>사진 업로드</Link>
                </div>
                <div>
                {/* {viewType === 0 ? <AlbumWhole getAlbum={getAlbum} /> : ""} */}
                {viewType === 0 ? <AlbumWhole albums={getAlbum?.data?.albums} startDate={getAlbum?.data?.startDate}  /> 
                : <AlbumFolder albums={getAlbum?.data?.albums} startDate={getAlbum?.data?.startDate} />}
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default TripAlbum;