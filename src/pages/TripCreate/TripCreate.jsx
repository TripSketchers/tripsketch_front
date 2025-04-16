import React, { useState } from "react";
import Sidebar from "../../components/TripCreate/Sidebar/Sidebar";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripSelectContainer from "../../components/TripCreate/TripSelectContainer/TripSelectContainer";
import Map from "../../components/TripCreate/Map/Map";
import Split from "react-split";
import { FaGripLinesVertical } from "react-icons/fa6";

function TripCreate(props) {
    const [selectedStep, setSelectedStep] = useState(1);

    return (
        <div css={S.SLayout}>
            <Sidebar
                selectedStep={selectedStep}
                setSelectedStep={setSelectedStep}
            />
            <div css={S.SContainer}>
                <Split
                    className="split-horizontal"
                    direction="horizontal"
                    sizes={[25, 75]} // 좌우 기본 비율
                    minSize={300} // 최소 너비 제한
                    gutterSize={10} // 가운데 막대 두께
                >
                    <TripSelectContainer selectedStep={selectedStep} />
                    <Map />
                </Split>
            </div>
        </div>
    );
}

export default TripCreate;
