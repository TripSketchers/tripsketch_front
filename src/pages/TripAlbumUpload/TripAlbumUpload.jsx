import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import NavLayout from '../../components/NavComponents/NavLayout/NavLayout';
import NavContainer from '../../components/NavComponents/NavContainer/NavContainer';
import ImgUpload from '../../components/AlbumComponents/ImgUpload/ImgUpload';

function TripAlbumUpload(props) {
    const items = [
        { trip_schedule_id: 1, date: "1일차", place: "광안리 해수욕장" },
        { trip_schedule_id: 2, date: "1일차", place: "짜장 카페" },
        { trip_schedule_id: 3, date: "2일차", place: "수영 돼지국밥" },
        { trip_schedule_id: 4, date: "3일차", place: "짜장이네" },
        { trip_schedule_id: 5, date: "4일차", place: "부산역" },
        { trip_schedule_id: 6, date: "4일차", place: "부산역2" },
        { trip_schedule_id: 7, date: "4일차", place: "부산역3" },
        { trip_schedule_id: 8, date: "5일차", place: "부산역4" },
        { trip_schedule_id: 9, date: "6일차", place: "부산역5" },
        { trip_schedule_id: 10, date: "7일차", place: "부산역6" },
        { trip_schedule_id: 11, date: "8일차", place: "부산역7" }
    ];

    // 날짜 클릭 시 해당하는 place 목록을 1열부터 순서대로 배치
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    // 날짜 클릭 시 해당하는 장소 목록 업데이트
    const handleDateClick = (date) => {
        const places = items.filter((item) => item.date === date);
        setSelectedDate(date);
        setSelectedPlaces(places);
    };

    // 장소 클릭 시 trip_schedule_id 출력
    const handlePlaceClick = (id) => {
        setSelectedPlaceId(id);
        console.log("선택한 trip_schedule_id:", id);
    };

    return (
        <NavLayout>
            <NavContainer>
                <div css={S.SLayout}>
                    <div css={S.SLeftContainer}>
                        
                        <ImgUpload />
                    </div>
                    <div css={S.SRightContainer}>
                        <div className='titleBox'>
                            <h3>장소 선택</h3>
                            <span>※ 장소는 사진 전체에 적용됩니다.</span>
                        </div>
                        <div css={S.STripBox}>
                            <div css={S.STripTable}>
                                {/* 날짜 목록 (가로 스크롤 가능) */}
                                <div>
                                    <div className='title'>날짜</div>
                                    <ul css={S.SScroll}>
                                        {Array.from(new Set(items.map((item) => item.date))).map((date) => (
                                            <li key={date} 
                                                css={S.SSelectSchedule(selectedDate === date)}
                                                onClick={() => handleDateClick(date)} >
                                                {date}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    {/* 장소 목록 (세로 스크롤 가능) */}
                                    <div className='title' >장소</div>
                                    <ul css={S.SScroll} > 
                                        {selectedPlaces.map((place) => (
                                            <li key={place.trip_schedule_id}
                                            css={S.SSelectSchedule(place.trip_schedule_id === selectedPlaceId)}
                                            onClick={() => handlePlaceClick(place.trip_schedule_id)} >
                                                {place.place}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button css={S.SUploadButton}>업로드</button>
                    </div>
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default TripAlbumUpload;