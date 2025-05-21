import React from 'react';
import MainSearch from '../../components/MainComponents/MainSearch/MainSearch';
import MainBanner from '../../components/MainComponents/MainBanner/MainBanner';
import MainRecommend from '../../components/MainComponents/MainRecommend/MainRecommend';
import RecentTrips from '../../components/MainComponents/RecentTrips/RecentTrips';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../api/config/instance';

function Main(props) {
    const getUpcomingTrip = useQuery({
        queryKey: ["getTripDestinations"],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    }
                };
                const response = await instance.get(`/main/upcoming-trip`, options );
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    return (
        <div>
            <MainSearch />
            {getUpcomingTrip?.data && 
                <RecentTrips getUpcomingTrip={getUpcomingTrip?.data}/>
            }
            <MainBanner />
            <MainRecommend />
        </div>
    );
}

export default Main;