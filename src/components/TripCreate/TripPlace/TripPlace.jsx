import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import PlaceLeftPanel from './PlaceLeftPanel/PlaceLeftPanel';
import PlaceRightPanel from './PlaceRightPanel/PlaceRightPanel';

function TripPlace(props) {
    return (
        <div css={S.SLayout}>
            <PlaceLeftPanel/>
            <PlaceRightPanel/>
        </div>
    );
}

export default TripPlace;