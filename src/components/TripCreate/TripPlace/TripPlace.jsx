import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../StoredPlacePanel/StoredPlacePanel";
import Tab from "../Tab/Tab";
import PlaceSelectPanel from "../../PlaceSelectPanel/PlaceSelectPanel";
import NewPlacePanel from "../../NewPlacePanel/NewPlacePanel";

function TripPlace() {
	const [selectedTab, setSelectedTab] = useState(1);

	return (
		<div css={S.SLayout}>
			<Tab
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				text={"장소"}
			>
				{selectedTab === 1 ? (
					<PlaceSelectPanel
						text="장소"
						categories={["명소", "맛집", "카페"]}
					/>
				) : (
					<NewPlacePanel />
				)}
				<StoredPlacePanel type="place" />
			</Tab>
		</div>
	);
}

export default TripPlace;
