import React from "react";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../components/StoredPlacePanel/StoredPlacePanel";
import Map from "../../components/TripCreate/Map/Map";
import PlanTable from "../../components/TripPlan/PlanTable/PlanTable";
import PlanHeader from "../../components/TripPlan/PlanHeader/PlanHeader";
import Split from "react-split";

function TripPlan() {
	return (
		<NavLayout>
			<div css={S.SLayout}>
				<Split
					sizes={[40, 60]} // 초기 비율
					minSize={0} // 최소 픽셀 크기
					gutterSize={15}
					direction="horizontal"
					className="split"
				>
					<div css={S.SContainer}>
						<PlanHeader />
						<div css={S.SBox}>
							<StoredPlacePanel text={"계획"} />
							<PlanTable />
						</div>
					</div>
					<div css={S.SMapContainer}>
						<Map />
					</div>
				</Split>
			</div>
		</NavLayout>
	);
}

export default TripPlan;
