import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signin from '../../pages/Signin/Signin';
import SigninOauth2 from '../../pages/Signin/SigninOauth2';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {

    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"]);

    if (!!principal?.data?.data) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path='signin' element={<Signin/>}/>
            <Route path='oauth2/signin' element={<SigninOauth2/>}/>
        </Routes>            
    );
}

export default AuthRoute;