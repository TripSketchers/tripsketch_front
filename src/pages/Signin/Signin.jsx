import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import SigninContainer from '../../components/SigninContainer/SigninContainer';
import SigninButton from '../../components/SigninButton/SigninButton';
import { useSearchParams } from 'react-router-dom';

function Signin(props) {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [searchParams] = useSearchParams(); // 쿼리 파라미터 받기

    const handleSignUpClick = () => setIsRightPanelActive(true);
    const handleSignInClick = () => setIsRightPanelActive(false);

    useEffect(() => {   // 쿼리에 email, provider 있으면 회원가입 창으로 전환
        const email = searchParams.get("email");
        const provider = searchParams.get("provider");

        if (email && provider) {
            setIsRightPanelActive(true);
        }
    }, [searchParams]);

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <SigninContainer isSignin={ true } isRightPanelActive={isRightPanelActive}/>
                <SigninContainer isSignin={ false } isRightPanelActive={isRightPanelActive}/>
                <div css={S.SOverlayBox(isRightPanelActive)}>
                    <div css={S.SOverlay(isRightPanelActive)}>
                        <div css={S.SOverlayPanelLeft(isRightPanelActive)}>
                            <h1>돌아오셨군요!</h1>
                            <p>로그인 후 새로운 여행을 떠나볼까요?</p>
                            <SigninButton onClick={handleSignInClick}>로그인</SigninButton>
                        </div>
                        <div css={S.SOverlayPanelRight(isRightPanelActive)}>
                            <h1>어서오세요!</h1>
                            <p>회원가입 후 나만의 여행 플랜을 만들어보세요!</p>
                            <SigninButton onClick={handleSignUpClick}>회원가입</SigninButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;