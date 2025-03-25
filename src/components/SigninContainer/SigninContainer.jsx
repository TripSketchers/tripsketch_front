import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import SigninButton from '../SigninButton/SigninButton';
import { instance } from '../../api/config/instance';

function SigninContainer({ isSignin, isRightPanelActive }) {
    const text = isSignin?"로그인":"회원가입";
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ signupUser, setSignupUser ] = useState({
        email: "",
        password: "",
        checkPassword: ""
    })

    const handleInputChange = (e) => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        if(signupUser.checkPassword != "" && signupUser.password != signupUser.checkPassword) {
            setErrorMessage("*비밀번호가 일치하지 않습니다.");
        } else {
            setErrorMessage("");
        }
    }, [signupUser.password, signupUser.checkPassword])

    const handleSignupSubmit = async (e) => {
        e.preventDefault(); // 기본 동작 막기
        const signupData = {
            email: signupUser.email,
            password: signupUser.password
        }
        try {
            const response = await instance.post("/auth/signup", signupData);
        } catch (error) {
            console.error(error);
            alert(error.response.data.email);
        }
    }

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
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
                {isSignin ? <></> : <>
                                        <input type="password" name="checkPassword" placeholder="Re-enter Password" onChange={handleInputChange}/>
                                        <div css={S.ErrorMsg}>{errorMessage}</div>
                                    </>}
                <SigninButton type="submit" onClick={handleSignupSubmit}>{text}</SigninButton>
            </form>
        </div>
    );
}

export default SigninContainer;