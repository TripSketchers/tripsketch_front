import { useQueryClient } from "@tanstack/react-query";
import { signInWithCustomToken } from "firebase/auth";
import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { auth } from "../../api/Firebase/Firebase";

function SigninOauth2(props) {
    // 서버로부터 redirection해서 들어온 token을 localStorage에 저장하는 과정
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const accessToken = searchParams.get("token");
    const firebaseToken = searchParams.get("firebaseToken");

    useEffect(() => {
        const handleAuth = async () => {
            if (accessToken) {
                localStorage.setItem("accessToken", "Bearer " + accessToken);
                queryClient.refetchQueries(["getPrincipal"]);
            }

            if (firebaseToken) {
                try {
                    await signInWithCustomToken(auth, firebaseToken);
                } catch (error) {
                    console.error("Firebase 로그인 실패", error);
                }
            }
        };

        handleAuth();
    }, [accessToken, firebaseToken, queryClient]);

    return <Navigate to={"/"} />;
}

export default SigninOauth2;
