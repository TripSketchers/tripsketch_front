import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import SigninButton from '../SigninButton/SigninButton';

function SigninContainer({ isSignin, isRightPanelActive }) {
    const text = isSignin?"로그인":"회원가입";

    return (
        <div css={S.SLayout(isSignin, isRightPanelActive)}>
            <form css={S.SContainer}>
                <h1>{text}</h1>
                <div css={S.SBox}>
                    <a href="#"><RiKakaoTalkFill size={28}/></a>
                    <a href="#"><FaGoogle size={21}/></a>
                    <a href="#"><SiNaver size={18}/></a>
                </div>
                <span>이메일로 {text}</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                {isSignin ? <></> : <input type="password" placeholder="Re-enter Password" />}
                <SigninButton>{text}</SigninButton>
            </form>
        </div>
    );
}

export default SigninContainer;