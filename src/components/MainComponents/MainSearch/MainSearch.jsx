import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import MainImg from "../../../assets/MainImg.jpg";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../SearchInput/SearchInput";

function MainSearch(props) {
	const queryClient = useQueryClient();
	const principalState = queryClient.getQueryState(["getPrincipal"]);
	const navigate = useNavigate();

	const handleStartBtn = () => {
		navigate("/auth/signin");
	};

	return (
		<div css={S.SLayout}>
			<div css={S.SLeftContainer}>
				<img src={MainImg} />
			</div>
			<div css={S.SRightContainer}>
				<div>
					<h1>
						나만의 여행을
						<br />
						스케치 해보세요
					</h1>
					{principalState?.data?.data ? (
						<SearchInput placeholder={"여행지 검색"}/>
					) : (
						<button onClick={handleStartBtn}>시작하기</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default MainSearch;
