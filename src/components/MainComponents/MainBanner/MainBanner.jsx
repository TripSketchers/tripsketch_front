import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import MainImg from '../../../assets/MainImg.jpg'

function MainBanner(props) {
    return (
        <div css={S.SLayout} >
            <div css={S.SLeftContainer}>
                <img src={MainImg}/>
            </div>
            <div css={S.SRightContainer} >
                <div>
                    <h3>예약시간에 맞춰 일정을 짜고 싶으신가요?</h3>
                    <span>트립스케치에서는 예약시간에 맞춰 일정을 변경할 수 있어요.<br />
                    운영시간도 알려주니 알찬 여행 계획을 편하게 세워보세요!</span>
                </div>
            </div>
        </div>
    );
}

export default MainBanner;