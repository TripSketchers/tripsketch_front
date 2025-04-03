import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import profile_icon from '../../assets/profile icon.png'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { Link } from 'react-router-dom';
import { instance } from '../../api/config/instance';

function ProfileContainer({ isMyPage }) {

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

    return (
        <div css={S.SProfileContainer}>
            <div css={S.SProfile}>
                <img src={profile_icon} />
            </div>
            <h2 css={S.SUser}>{principal.data.data.email.split("@")[0]}</h2>
            {isMyPage ? 
                <>
                    <Link css={S.SEditBtn} to={"/account/edit"}>프로필 편집</Link>
                </> 
                : 
                <>
                    {showModal && (
                        <ConfirmModal
                            onClose={() => setShowModal(false)}
                            onConfirm={handleWithdrawalBtnOnClick}
                        />
                    )}
                    <button css={S.SLeaveBtn} onClick={() => setShowModal(true)}>회원 탈퇴</button>
                </>}
        </div>
    );
}

export default ProfileContainer;