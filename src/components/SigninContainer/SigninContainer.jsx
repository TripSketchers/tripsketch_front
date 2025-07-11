import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import SigninButton from "../SigninButton/SigninButton";
import { instance } from "../../api/config/instance";
import PasswordInput from "../PasswordInput/PasswordInput";
import { auth } from "../../api/Firebase/Firebase";
import { signInWithCustomToken } from "firebase/auth";
import { FaArrowRight } from "react-icons/fa6";
import SwalAlert from "../SwalAlert/SwalAlert";

function SigninContainer({
	isSignin,
	isRightPanelActive,
	setIsRightPanelActive,
	isMobile,
}) {
	const text = isSignin ? "로그인" : "회원가입";
	const buttonText = isSignin ? "회원가입" : "로그인";
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{4,20}$/;

	const [user, setUser] = useState({
		email: "",
		password: "",
		checkPassword: "",
	});

	const [messages, setMessages] = useState({
		password: "",
		checkPassword: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const updatedUser = { ...user, [name]: value };
		setUser(updatedUser);

		// 유효성 메시지 관리
		if (name === "password") {
			if (!passwordRegex.test(value)) {
				setMessages((prev) => ({
					...prev,
					password:
						"비밀번호는 4~20자, 소문자/대문자/숫자를 모두 포함해야 합니다.",
				}));
			} else {
				setMessages((prev) => ({ ...prev, password: "" }));
			}
		}

		if (name === "checkPassword") {
			if (value !== updatedUser.password) {
				setMessages((prev) => ({
					...prev,
					checkPassword: "*비밀번호가 일치하지 않습니다.",
				}));
			} else {
				setMessages((prev) => ({ ...prev, checkPassword: "" }));
			}
		}
	};

	const handleAuthSubmit = async (e) => {
		e.preventDefault();

		if (
			!isSignin &&
			(!user.email || !user.password || !user.checkPassword)
		) {
			SwalAlert({
				title: "모든 항목을 입력해주세요.",
			});
			return;
		}

		if (!isSignin && (messages.password || messages.checkPassword)) {
			SwalAlert({
				title: "입력된 정보를 확인해주세요.",
			});
			return;
		}

		const data = {
			email: user.email,
			password: user.password,
		};

		const endpoint = isSignin ? "/auth/signin" : "/auth/signup";

		try {
			const response = await instance.post(endpoint, data);

			if (!isSignin) {
				SwalAlert({
				title: "회원가입이 완료되었습니다!",
				icon: "success",
				onConfirm: () => { // 회원가입 후 로그인 페이지로 이동	
					window.location.replace("/auth/signin");
				}
			});
			} else {
				localStorage.setItem(
					"accessToken",
					"Bearer " + response.data.accessToken
				);
				const firebaseToken = response.data.firebaseToken;
				try {
					await signInWithCustomToken(auth, firebaseToken);
					window.location.replace("/");
				} catch (e) {
					SwalAlert({
						title: "로그인 실패",
						text: "로그인에 실패했습니다. 다시 시도해주세요.",
						icon: "error",
					});
					console.error("로그인 실패", e);
				}
			}
		} catch (error) {
			const errors = error.response?.data;
			if (errors?.email) console.error(errors.email);
			else if (errors?.password) console.error(errors.password);
			else if (errors?.signin) console.error(errors.signin);
		}
	};

	return (
        <div css={S.SLayout(isSignin, isRightPanelActive, isMobile)}>
            <form css={S.SContainer}>
                <h1>{text}</h1>
                <div css={S.SBox}>
                    <a href="https://tripsketchback-production-a057.up.railway.app/oauth2/authorization/kakao">
                        <RiKakaoTalkFill size={28} />
                    </a>
                    <a href="https://tripsketchback-production-a057.up.railway.app/oauth2/authorization/google">
                        <FaGoogle size={21} />
                    </a>
                    <a href="https://tripsketchback-production-a057.up.railway.app/oauth2/authorization/naver">
                        <SiNaver size={18} />
                    </a>
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
                {!isSignin && <div css={S.ErrorMsg}>{messages.password}</div>}

                {!isSignin && (
                    <>
                        <PasswordInput
                            name="checkPassword"
                            placeholder="Re-enter Password"
                            onChange={handleInputChange}
                        />
                        <div css={S.ErrorMsg}>{messages.checkPassword}</div>
                    </>
                )}

                <SigninButton type="submit" onClick={handleAuthSubmit}>
                    {text}
                </SigninButton>
                {isMobile && (
                    <button
                        type="button"
                        onClick={() =>
                            setIsRightPanelActive(!isRightPanelActive)
                        }
                        css={S.SMobileButton}
                    >
                        {buttonText}
                        <FaArrowRight />
                    </button>
                )}
            </form>
        </div>
    );
}

export default SigninContainer;
