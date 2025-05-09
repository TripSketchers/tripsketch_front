import React, { useState } from "react";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import StoredPlacePanel from "../../components/StoredPlacePanel/StoredPlacePanel";
import Map from "../../components/TripCreate/Map/Map";
import PlanTable from "../../components/TripPlan/PlanTable/PlanTable";
import PlanHeader from "../../components/TripPlan/PlanHeader/PlanHeader";
import Split from "react-split";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function TripPlan() {
	const [isStoredPanelOpen, setIsStoredPanelOpen] = useState(true);
	const toggleStoredPanel = () => setIsStoredPanelOpen(!isStoredPanelOpen);

	return (
		<NavLayout>
			<div css={S.SLayout}>
				<Split
					sizes={[30, 70]}
					minSize={[100, 0]}
					gutterSize={8}
					direction="horizontal"
					className="split"
				>
					<div css={S.SContainer(isStoredPanelOpen)}>
						<PlanHeader />
						<div css={S.SBox}>
							<div css={S.SStoredPanel(isStoredPanelOpen)}>
                                {/* 좌우로 토글 가능 */}
								{isStoredPanelOpen && (
									<StoredPlacePanel text={"계획"} />
								)}
								<button
									onClick={toggleStoredPanel}
									css={S.SToggleButton(isStoredPanelOpen)}
								>
									{isStoredPanelOpen ? (
										<FaAngleLeft />
									) : (
										<FaAngleRight />
									)}
								</button>
							</div>
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
