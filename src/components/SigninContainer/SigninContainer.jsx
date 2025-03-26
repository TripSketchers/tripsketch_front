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
    const [ user, setUser ] = useState({
        email: null,
        password: null,
        checkPassword: null
    })

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        if(user.checkPassword != null && user.password != user.checkPassword) {
            setErrorMessage("*비밀번호가 일치하지 않습니다.");
        } else {
            setErrorMessage("");
        }
    }, [user.password, user.checkPassword])

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            email: user.email,
            password: user.password
        };
    
        const endpoint = isSignin ? "/auth/signin" : "/auth/signup";
    
        try {
            const response = await instance.post(endpoint, data);
    
            if (!isSignin) {
                alert("회원가입이 완료되었습니다!");
                window.location.replace("/signin");
            } else {
                localStorage.setItem("accessToken", "Bearer " + response.data.accessToken);
                window.location.replace("/");
            }
    
        } catch (error) {
            const errors = error.response?.data;
            if (errors?.email) alert(errors.email);
            else if (errors?.password) alert(errors.password);
            else if (errors?.signin) alert(errors.signin);
        }
    };

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
                <SigninButton type="submit" onClick={handleAuthSubmit}>{text}</SigninButton>
            </form>
        </div>
    );
}

export default SigninContainer;