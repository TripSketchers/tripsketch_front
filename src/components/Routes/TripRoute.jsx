import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TripAlbum from '../../pages/TripAlbum/TripAlbum';
import TripPlan from '../../pages/TripPlan/TripPlan';
import TripAlbumUpload from '../../pages/TripAlbumUpload/TripAlbumUpload';
import TripCreate from '../../pages/TripCreate/TripCreate';

function TripRoute(props) {
    return (
        <Routes>
            <Route path='create' element={<TripCreate/>}/>
            <Route path='plan/:trip_id' element={<TripPlan/>}/>
            <Route path='album/:trip_id' element={<TripAlbum/>}/>
            <Route path='album/:trip_id/upload' element={<TripAlbumUpload/>}/>
        </Routes>
    );
}

export default TripRoute;