import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import MainImg from '../../../assets/MainImg.jpg'
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";

function RecentTrips(props) {
    return (
        <div css={S.SLayout}>
            <h1>최근 여행 둘러보기</h1>
            <div css={S.SContainer}>
                <div css={S.SLeftContainer}>
                    <div css={S.STripBox}>
                        <div className='info'>
                            <span className='dDay'>D-숫자</span>
                            <span className='tripTitle'>{"여행 이름"}</span>
                        </div>
                        <div className='summary'>
                            <h3 className='containIcon'><FaLocationDot />{"여행지"}</h3>
                            <span className='containIcon'><BiSolidCalendarCheck />{"출발일"} ~ {"도착일"}{"(3박 4일)"}</span>
                            <span className='containIcon'><AiFillCar />{"대중교통 이용"}</span>
                        </div>
                        <img src={MainImg} alt="" />
                    </div>
                </div>
                <div css={S.SRightContainer}>
                    <div>
                        <div className='albumBox'><img src={MainImg} alt="" /></div>
                        <div className='albumBox'><img src={MainImg} alt="" /></div>
                        <div className='albumBox'><img src={MainImg} alt="" /></div>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentTrips;