import React from 'react';
import MainSearch from '../../components/MainComponents/MainSearch/MainSearch';
import MainBanner from '../../components/MainComponents/MainBanner/MainBanner';
import MainRecommend from '../../components/MainComponents/MainRecommend/MainRecommend';
import RecentTrips from '../../components/MainComponents/RecentTrips/RecentTrips';
import { useQueryClient } from '@tanstack/react-query';

function Main(props) {

    return (
        <div>
            <MainSearch />
            <RecentTrips />
            <MainBanner />
            <MainRecommend />
        </div>
    );
}

export default Main;