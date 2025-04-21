import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../StoredPlacePanel/StoredPlacePanel";
import Tab from "../Tab/Tab";
import PlaceSelectPanel from "../../PlaceSelectPanel/PlaceSelectPanel";
import NewPlacePanel from "../../NewPlacePanel/NewPlacePanel";

function TripAccommodation() {
	const [selectedTab, setSelectedTab] = useState(1);

	return (
		<div css={S.SLayout}>
			<Tab
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				text={"숙소"}
			>
				{selectedTab === 1 ? (
					<PlaceSelectPanel
						text="숙소"
						categories={["숙소"]}
					/>
				) : (
					<NewPlacePanel />
				)}
				<StoredPlacePanel type="accommodation" />
			</Tab>
		</div>
	);
}

export default TripAccommodation;
