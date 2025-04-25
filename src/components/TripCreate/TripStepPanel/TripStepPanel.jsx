import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../StoredPlacePanel/StoredPlacePanel";
import Tab from "../Tab/Tab";
import PlaceSelectPanel from "../../PlaceSelectPanel/PlaceSelectPanel";
import NewPlacePanel from "../../NewPlacePanel/NewPlacePanel";

function TripStepPanel({ label, categories }) {
    const [selectedTab, setSelectedTab] = useState(1);
    return (
        <div css={S.SLayout}>
            <Tab
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                text={label}
            >
                {selectedTab === 1 ? (
                    <PlaceSelectPanel text={label} categories={categories} />
                ) : (
                    <NewPlacePanel />
                )}
                <StoredPlacePanel text={label} />
            </Tab>
        </div>
    );
}

export default TripStepPanel;
