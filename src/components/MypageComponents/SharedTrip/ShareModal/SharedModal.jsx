import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { instance } from "../../../../api/config/instance";
import ModalLayout from "../../../ModalLayout/ModalLayout";
import { useQuery } from "@tanstack/react-query";
import { showToast } from "../../../Toast/Toast";
import { toast } from "react-toastify";

function SharedModal({ tripId, onClose }) {
    const [input, setInput] = useState("");
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState("");

    const { data: sharedUsers = [], refetch } = useQuery({
        queryKey: ["getTripShare", tripId],
        queryFn: async () => {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            return await instance.get(`/account/trips/${tripId}/share`, option);
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const invitedEmails = (sharedUsers?.data || []).map((user) => user.email); // 이미 초대된 이메일

    const isValidEmail = (email) => {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter" && input.trim()) {
            e.preventDefault();

            // setTimeout으로 브라우저 자동완성 반영 이후에 실행
            setTimeout(() => {
                const email = input.trim();

                if (invitedEmails.includes(email) || emails.includes(email)) {
                    showToast.error("이미 초대한 사용자입니다.");
                    return;
                }

                if (isValidEmail(email) && !emails.includes(email)) {
                    setEmails((prev) => [...prev, email]);
                    setInput(""); // 이 타이밍에 초기화
                }
            }, 0);
        } else if (e.key === "Backspace" && input === "" && emails.length) {
            setEmails(emails.slice(0, -1));
        }
    };

    const removeEmail = (emailToRemove) => {
        setEmails(emails.filter((e) => e !== emailToRemove));
    };

    const handleSend = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            const shareList = {
                emails: emails,
                message: message,
            };
            const response = await instance.post(
                `/account/trips/${tripId}/share`,
                shareList,
                option
            );
            showToast.success("초대 전송 완료!");
        } catch (error) {
            const failedEmails = error.response?.data?.failedEmails || [];

            setEmails((prev) =>
                prev.map((e) => (failedEmails.includes(e) ? { ...e } : e))
            );
            showToast.error("일부 이메일 초대에 실패했습니다.");
        } finally {
            setEmails([]);
            setMessage("");
            refetch();
        }
    };

    const handleCancelShare = async (tripId, shareId) => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            const response = await instance.delete(
                `/account/trips/${tripId}/shares/${shareId}`,
                option
            );
            showToast.success("초대 삭제 완료");
        } catch (error) {
            showToast.error("초대삭제 실패\n재시도 해주세요.");
        } finally {
            refetch();
        }
    };

    return (
        <ModalLayout onClose={onClose}>
            <h2 css={S.STitle}>{"여행"} 공유</h2>
            <div css={S.SInputContainer}>
                {emails.map((email) => (
                    <div key={email} className="email-tag">
                        <span>{email}</span>
                        <button onClick={() => removeEmail(email)}>
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyUp}
                    placeholder="이메일 입력 후 Enter"
                    autoFocus
                    autoComplete="email"
                />
            </div>
            {emails?.length > 0 && (
                <div>
                    <textarea
                        css={S.STextArea}
                        placeholder="이메일 메시지를 작성해주세요"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <div css={S.SButtonGroup}>
                        <button onClick={() => setEmails([])}>취소</button>
                        <button className="sendBtn" onClick={handleSend}>
                            전송
                        </button>
                    </div>
                </div>
            )}
            <div css={S.SSharedUsersContainer}>
                <h3>공유된 사용자</h3>
                <div>
                    {sharedUsers?.data?.length === 0 ? (
                        <p>공유된 사용자가 없습니다.</p>
                    ) : (
                        <ul>
                            {sharedUsers?.data?.map((user) => (
                                <li
                                    key={user.shareId}
                                    className="shared-user-item"
                                >
                                    <span>{user.email}</span>
                                    <button
                                        onClick={() =>
                                            handleCancelShare(
                                                user.tripId,
                                                user.shareId
                                            )
                                        }
                                    >
                                        공유 취소
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </ModalLayout>
    );
}

export default SharedModal;
