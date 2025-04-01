import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import profile_icon from '../../assets/profile icon.png'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { Link } from 'react-router-dom';
import { instance } from '../../api/config/instance';

function ProfileEdit(props) {

    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"]);

    const [showModal, setShowModal] = useState(false);

    const handleWithdrawalBtnOnClick = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await instance.delete(`/account/${principal.data.data.userId}`, option);
            localStorage.removeItem("accessToken");
            await queryClient.refetchQueries(["getPrincipal"]);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const handleSendMail = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await instance.post("/account/auth/email", {}, option);  // 주소, 데이터, 옵션
            alert("인증 메일 전송 완료. 인증 요청 메일을 확인해주세요.");
        } catch (error) {
            alert("인증 메일 전송 실패. 다시 시도해주세요.");
        }
    }

    console.log(principal.data.data);
    

    return (
        <div css={S.SLayout}>
            <div css={S.SProfileContainer}>
                <div css={S.SProfile}>
                    <img src={profile_icon} />
                </div>
                <h2 css={S.SUser}>{principal.data.data.email.split("@")[0]}</h2>
                {showModal && (
                    <ConfirmModal
                        onClose={() => setShowModal(false)}
                        onConfirm={handleWithdrawalBtnOnClick}
                    />
                )}
                <button css={S.SLeaveBtn} onClick={() => setShowModal(true)}>회원 탈퇴</button>
            </div>
            <div css={S.SEditContainer}>
                <div css={S.STitleBox}>
                    <h1>프로필 편집</h1>
                </div>
                <div css={S.SFormBox}>
                    <div css={S.SRow}>
                        <label>이메일</label>
                        <label htmlFor="">{principal.data.data.email}</label>
                        {principal.data.data.enabled > 0 ?
                            <button disabled>
                                인증 완료
                            </button> :   
                            <button onClick={handleSendMail}>
                                인증 하기
                            </button>}
                    </div>
                    {!!principal.data.data.password ? 
                    <>
                        <div css={S.SRow}>
                            <label>현재 비밀번호</label>
                            <input type="password" />
                            <button>일치 확인</button>
                        </div>
                        <div css={S.SRow}>
                            <label>새 비밀번호</label>
                            <input type="password" />
                            <div></div>
                        </div>
                        <div css={S.SRow}>
                            <label>비밀번호 확인</label>
                            <input type="password" />
                            <div></div>
                        </div>
                    </> : 
                    <div css={S.SRow}>
                        <label>소셜 플랫폼</label>
                        <label htmlFor="">{principal.data.data.provider}</label>
                        <div></div>
                    </div>
                    }
                </div>
                <div css={S.SSubmitBox}>
                    <Link to={"/account/mypage"}>돌아가기</Link>
                    <button disabled={!!!principal.data.data.password}>
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;