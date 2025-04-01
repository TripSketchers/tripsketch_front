import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

function SigninOauth2(props) {
    // 서버로부터 redirection해서 들어온 token을 localStorage에 저장하는 과정
    const [ searchParams, setSearchParams ] = useSearchParams();
    const queryClient = useQueryClient();

    localStorage.setItem("accessToken", "Bearer " + searchParams.get("token"));
    queryClient.refetchQueries(["getPrincipal"]);

    return <Navigate to={"/"} />
}

export default SigninOauth2;