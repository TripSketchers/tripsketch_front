import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import PlaceSelectPanel from "../../PlaceSelectPanel/PlaceSelectPanel";
import StoredPlacePanel from "../../StoredPlacePanel/StoredPlacePanel";
import Tab from "../Tab/Tab";

function TripPlace(props) {
    const [selectedTab, setSelectedTab] = useState(1);
    return (
        <div css={S.SLayout}>
            <Tab
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                text={"장소"}
            >
                <PlaceSelectPanel selectedTab={selectedTab} />
                <StoredPlacePanel />
            </Tab>
        </div>
    );
}

export default TripPlace;
