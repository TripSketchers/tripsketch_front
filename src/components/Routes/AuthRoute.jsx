import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../../pages/Signin/Signin';
import SigninOauth2 from '../../pages/Signin/SigninOauth2';

function AuthRoute(props) {
    return (
        <Routes>
            <Route path='signin' element={<Signin/>}/>
            <Route path='oauth2/signin' element={<SigninOauth2/>}/>
        </Routes>            
    );
}

export default AuthRoute;