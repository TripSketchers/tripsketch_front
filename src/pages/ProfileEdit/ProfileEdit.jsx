import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { Link } from 'react-router-dom';
import { instance } from '../../api/config/instance';
import ProfileContainer from '../../components/ProfileContainer/ProfileContainer';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

function ProfileEdit() {
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"]);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{4,20}$/;

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        checkNewPassword: ''
    });

    const [isMatch, setIsMatch] = useState(false);

    const [messages, setMessages] = useState({
        match: '',
        regex: '',
        error: ''
    });

    const handleSendMail = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            };
            await instance.post("/account/auth/email", {}, option);
            alert("인증 메일 전송 완료. 인증 요청 메일을 확인해주세요.");
        } catch (error) {
            alert("인증 메일 전송 실패. 다시 시도해주세요.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...password, [name]: value };
        setPassword(updated);

        // 정규식 검사
        if (name === "newPassword" && isMatch) {
            if (!passwordRegex.test(value)) {
                setMessages(prev => ({
                    ...prev,
                    regex: "비밀번호는 4~20자, 소문자/대문자/숫자를 모두 포함해야 합니다."
                }));
            } else {
                setMessages(prev => ({ ...prev, regex: '' }));
            }
        }

        // 비밀번호 확인 검사
        if (name === "checkNewPassword" || name === "newPassword") {
            if (updated.checkNewPassword && updated.newPassword && updated.checkNewPassword !== updated.newPassword) {
                setMessages(prev => ({
                    ...prev,
                    error: "*비밀번호가 일치하지 않습니다."
                }));
            } else {
                setMessages(prev => ({ ...prev, error: '' }));
            }
        }
    };

    const handlePasswordMatchCheck = async () => {
        try {
            if (!password.currentPassword) {
                setMessages(prev => ({ ...prev, match: "비밀번호를 입력해주세요." }));
                return;
            }

            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            };

            const response = await instance.post("/account/password/check", { password: password.currentPassword }, option);

            setIsMatch(response.data);
            setMessages(prev => ({
                ...prev,
                match: response.data
                    ? "비밀번호가 확인되었습니다. 새 비밀번호를 입력해주세요."
                    : "*비밀번호가 일치하지 않습니다."
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitOnClick = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            };

            await instance.put("/account/password", { newPassword: password.newPassword }, option);
            alert("비밀번호가 변경되었습니다!");
            window.location.replace("/account/mypage");
        } catch (error) {
            console.log(error);
        }
    }

    const canSubmit =
        !!principal.data?.data?.password &&
        isMatch &&
        password.newPassword &&
        password.checkNewPassword &&
        passwordRegex.test(password.newPassword) &&
        password.newPassword === password.checkNewPassword;

    return (
        <div css={S.SLayout}>
            <ProfileContainer isMyPage={false} />
            <div css={S.SEditContainer}>
                <div css={S.STitleBox}>
                    <h1>프로필 편집</h1>
                </div>
                <div css={S.SFormBox}>
                    <div css={S.SRow}>
                        <label>이메일</label>
                        <label>{principal.data.data.email}</label>
                        {principal.data.data.enabled > 0 ? (
                            <button disabled>인증 완료</button>
                        ) : (
                            <button onClick={handleSendMail}>인증 하기</button>
                        )}
                    </div>
                    {!!principal.data.data.password ? (
                        <>
                            <div css={S.SRow}>
                                <label>현재 비밀번호</label>
                                <div>
                                    <PasswordInput
                                        onChange={handleInputChange}
                                        name="currentPassword"
                                        placeholder="Password"
                                    />
                                    <div css={isMatch ? S.SMatchMsg : S.SErrorMsg}>{messages.match}</div>
                                </div>
                                <button onClick={handlePasswordMatchCheck}>일치 확인</button>
                            </div>
                            <div css={S.SRow}>
                                <label>새 비밀번호</label>
                                <div>
                                    <PasswordInput
                                        disabled={!isMatch}
                                        onChange={handleInputChange}
                                        name="newPassword"
                                        placeholder="New Password"
                                    />
                                    <div css={S.SErrorMsg}>{messages.regex}</div>
                                </div>
                                <div></div>
                            </div>
                            <div css={S.SRow}>
                                <label>비밀번호 확인</label>
                                <div>
                                    <PasswordInput
                                        disabled={!isMatch}
                                        onChange={handleInputChange}
                                        name="checkNewPassword"
                                        placeholder="Re-Enter Password"
                                    />
                                    <div css={S.SErrorMsg}>{messages.error}</div>
                                </div>
                                <div></div>
                            </div>
                        </>
                    ) : (
                        <div css={S.SRow}>
                            <label>소셜 플랫폼</label>
                            <label>{principal.data.data.provider}</label>
                            <div></div>
                        </div>
                    )}
                </div>
                <div css={S.SSubmitBox}>
                    <Link to={"/account/mypage"}>돌아가기</Link>
                    <button disabled={!canSubmit} onClick={handleSubmitOnClick}>저장하기</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
