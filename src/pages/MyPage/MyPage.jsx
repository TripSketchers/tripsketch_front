import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import profile_icon from '../../assets/profile icon.png'
import { IoMdMore } from "react-icons/io";
import { useQueryClient } from '@tanstack/react-query';
import TripCard from '../../components/TripCard/TripCard';
import { Link } from 'react-router-dom';

function MyPage(props) {

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div css={S.SProfileContainer}>
                    <div css={S.SProfile}>
                        <img src={profile_icon} />
                    </div>
                    <h2 css={S.SUser}>{principalState.data.data.email.split("@")[0]}</h2>
                    <Link css={S.SEditBtn} to={"/account/edit"}>프로필 편집</Link>
                </div>
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