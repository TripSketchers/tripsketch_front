import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { useQueryClient } from '@tanstack/react-query';
import TripCard from '../../components/TripCard/TripCard';
import ProfileContainer from '../../components/ProfileContainer/ProfileContainer';

function MyPage(props) {

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <ProfileContainer isMyPage={true}/>
                <div css={S.STripContainer}>
                    <div css={S.STitleBox}>
                        <h1>나의 여행</h1>
                    </div>
                    <div css={S.STripBox}>
                        <TripCard dDay={"D - Day"} title={"여행 제목"} location={"여행지"} dateRange={"시작일 ~ 종료일"}/>
                        <TripCard dDay={"D - Day"} title={"여행 제목"} location={"여행지"} dateRange={"시작일 ~ 종료일"}/>
                        <TripCard dDay={"D - Day"} title={"여행 제목"} location={"여행지"} dateRange={"시작일 ~ 종료일"}/>
                        <TripCard dDay={"D - Day"} title={"여행 제목"} location={"여행지"} dateRange={"시작일 ~ 종료일"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;