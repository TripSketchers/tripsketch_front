import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import PlaceLeftPanel from "./PlaceLeftPanel/PlaceLeftPanel";
import PlaceRightPanel from "./PlaceRightPanel/PlaceRightPanel";

function TripPlace(props) {
	const [selectedTab, setSelectedTab] = useState(1);
	return (
		<div css={S.SLayout}>
			<div css={S.STabWrapper}>
				<div css={S.STabSelector}>
					<div
						css={S.STab(selectedTab === 1)}
						onClick={() => setSelectedTab(1)}
					>
						장소 선택
					</div>
					<div
						css={S.STab(selectedTab === 2)}
						onClick={() => setSelectedTab(2)}
					>
						지도 검색
					</div>
				</div>
				<div css={S.STabContent}>
					<PlaceLeftPanel selectedTab={selectedTab} />
					<PlaceRightPanel />
				</div>
			</div>
		</div>
	);
}

export default TripPlace;
