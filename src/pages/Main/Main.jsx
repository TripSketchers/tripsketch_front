import React from 'react';
import MainSearch from '../../components/MainComponents/MainSearch/MainSearch';
import MainBanner from '../../components/MainComponents/MainBanner/MainBanner';
import MainRecommend from '../../components/MainComponents/MainRecommend/MainRecommend';
import RecentTrips from '../../components/MainComponents/RecentTrips/RecentTrips';
import { useQueryClient } from '@tanstack/react-query';

function Main(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);

    return (
        <div>
            <MainSearch />
            {principalState?.data?.data && 
                <RecentTrips/>
            }
            <MainBanner />
            <MainRecommend />
        </div>
    );
}

export default Main;