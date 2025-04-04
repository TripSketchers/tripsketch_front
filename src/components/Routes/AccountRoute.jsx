import React from 'react';
import MyPage from '../../pages/MyPage/MyPage';
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfileEdit from '../../pages/ProfileEdit/ProfileEdit';

function AccountRoute(props) {

    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"]);

    if (!principal?.data?.data) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path='mypage' element={<MyPage/>}/>
            <Route path='edit' element={<ProfileEdit/>}/>
        </Routes>            
    );
}

export default AccountRoute;