import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { FaRegPaperPlane } from "react-icons/fa";
import MainImg from '../../../assets/MainImg.jpg'

function MainRecommend(props) {
    return (
        <div css={S.SLayout}>
            <div>
                <div css={S.STitle}>
                    <FaRegPaperPlane />
                    <h3>최근 가장 인기 있는 국내 여행지, BEST 3</h3>
                </div>
                <div css={S.SContainer}>
                    <div>
                        <img src={MainImg} alt="" />
                        <div>{"여행지 이름"}</div>
                    </div>
                    <div><img src={MainImg} alt="" /></div>
                    <div><img src={MainImg} alt="" /></div>
                </div>
                <div css={S.STitle}>
                    <FaRegPaperPlane />
                    <h3>최근 가장 인기 있는 해외 여행지, BEST 3</h3>
                </div>
                <div css={S.SContainer}>
                    <div><img src={MainImg} alt="" /></div>
                    <div><img src={MainImg} alt="" /></div>
                    <div><img src={MainImg} alt="" /></div>
                </div>
            </div>
        </div>
    );
}

export default MainRecommend;