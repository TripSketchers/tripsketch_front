import React, { useState } from "react";
import TripStepSidebar from "../../components/TripCreate/TripStepSidebar/TripStepSidebar";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import TripSelectContainer from "../../components/TripCreate/TripSelectContainer/TripSelectContainer";
import TripMap from "../../components/TripCreate/TripMap/TripMap";
import Split from "react-split";

function TripCreate(props) {
	const [selectedStep, setSelectedStep] = useState(1);

	return (
		<div css={S.SLayout}>
			<TripStepSidebar
				selectedStep={selectedStep}
				setSelectedStep={setSelectedStep}
			/>
			<Split
				className="split-horizontal"
				direction="horizontal"
				sizes={[25, 75]} // 좌우 기본 비율
				minSize={300} // 최소 너비 제한
				gutterSize={10} // 가운데 막대 두께
			>
				<TripSelectContainer selectedStep={selectedStep} />
				<TripMap />
			</Split>
		</div>
	);
}

export default TripCreate;
