import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import MainSearch from '../../components/MainComponents/MainSearch/MainSearch';
import MainBanner from '../../components/MainComponents/MainBanner/MainBanner';
import MainRecommend from '../../components/MainComponents/MainRecommend/MainRecommend';
import RecentTrips from '../../components/MainComponents/RecentTrips/RecentTrips';
import { useQueryClient } from '@tanstack/react-query';

function Main(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);

    return (
        <div css={S.SLayout}>
            <MainSearch />
            <RecentTrips />
            <MainBanner />
            <MainRecommend />
        </div>
    );
}

export default Main;