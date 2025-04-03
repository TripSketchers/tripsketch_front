import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import SigninButton from '../SigninButton/SigninButton';
import { instance } from '../../api/config/instance';
import PasswordInput from '../PasswordInput/PasswordInput';

function SigninContainer({ isSignin, isRightPanelActive }) {
    const text = isSignin ? "로그인" : "회원가입";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{4,20}$/;

    const [user, setUser] = useState({
        email: '',
        password: '',
        checkPassword: ''
    });

    const [messages, setMessages] = useState({
        password: '',
        checkPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedUser = { ...user, [name]: value };
        setUser(updatedUser);

        // 유효성 메시지 관리
        if (name === 'password') {
            if (!passwordRegex.test(value)) {
                setMessages(prev => ({
                    ...prev,
                    password: "비밀번호는 4~20자, 소문자/대문자/숫자를 모두 포함해야 합니다."
                }));
            } else {
                setMessages(prev => ({ ...prev, password: '' }));
            }
        }

        if (name === 'checkPassword') {
            if (value !== updatedUser.password) {
                setMessages(prev => ({ ...prev, checkPassword: "*비밀번호가 일치하지 않습니다." }));
            } else {
                setMessages(prev => ({ ...prev, checkPassword: '' }));
            }
        }
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();

        if (!isSignin && (!user.email || !user.password || !user.checkPassword)) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        if (!isSignin && (messages.password || messages.checkPassword)) {
            alert("입력된 정보를 확인해주세요.");
            return;
        }

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
                    <a href="http://localhost:8080/oauth2/authorization/kakao"><RiKakaoTalkFill size={28} /></a>
                    <a href="http://localhost:8080/oauth2/authorization/google"><FaGoogle size={21} /></a>
                    <a href="http://localhost:8080/oauth2/authorization/naver"><SiNaver size={18} /></a>
                </div>
                <span>이메일로 {text}</span>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                />

                <PasswordInput
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                {!isSignin && <div css={S.ErrorMsg}>{messages.password}</div> }

                {!isSignin &&
                    <>
                        <PasswordInput
                            name="checkPassword"
                            placeholder="Re-enter Password"
                            onChange={handleInputChange}
                        />
                        <div css={S.ErrorMsg}>{messages.checkPassword}</div>
                    </>
                }

                <SigninButton type="submit" onClick={handleAuthSubmit}>
                    {text}
                </SigninButton>
            </form>
        </div>
    );
}

export default SigninContainer;
