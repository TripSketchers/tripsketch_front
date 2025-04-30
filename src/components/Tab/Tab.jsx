import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function Tab({ children, selectedTab, setSelectedTab, text }) {
	return (
		<div css={S.STabWrapper}>
			<div css={S.STabSelector}>
				<div
					css={S.STab(selectedTab === 1)}
					onClick={() => setSelectedTab(1)}
				>
					{text} 선택
				</div>
				<div
					css={S.STab(selectedTab === 2)}
					onClick={() => setSelectedTab(2)}
				>
					신규 {text} 등록
				</div>
			</div>
			<div css={S.STabContent}>{children}</div>
		</div>
	);
}

export default Tab;
