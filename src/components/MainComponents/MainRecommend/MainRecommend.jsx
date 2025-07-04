import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaRegPaperPlane } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../../api/config/instance";
import { useNavigate } from "react-router-dom";

// 한글 받침 여부 판별 함수
function hasBatchim(word) {
    if (!word || typeof word !== "string") return false;
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);
    // 한글 음절 범위: 0xAC00 ~ 0xD7A3
    if (code < 0xac00 || code > 0xd7a3) return false;
    return (code - 0xac00) % 28 !== 0;
}

function MainRecommend(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);
    const navigate = useNavigate();

    const { data: getPopularTrips } = useQuery({
        queryKey: ["getPopularTrips"],
        queryFn: async () => {
            try {
                const response = await instance.get(`/main/popular-trips`);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const handleDestinationClick = (item) => {
        if (!principalState || !principalState.data) {
            navigate(`/auth/signin`);
            return;
        }
        navigate(`/trip/create`, { state: item });
    };

    return (
        <div css={S.SLayout}>
            <div>
                <div css={S.STitle}>
                    <h3>최근 가장 인기 있는 국내 여행지, BEST 3</h3>
                </div>
                <div css={S.SContainer}>
                    {getPopularTrips &&
                        getPopularTrips?.domestic?.tripDestinations?.map(
                            (item) => (
                                <div
                                    key={item.tripDestinationId}
                                    css={S.SPopularTripBox(item.img)}
                                    onClick={() => handleDestinationClick(item)}
                                >
                                    <div className="banner_bg">
                                        <span>{item.koName}</span>
                                        <p class="hover_text">
                                            {item.koName}
                                            {hasBatchim(item.koName)
                                                ? "으로 "
                                                : "로 "}
                                            <br />떠나기
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                </div>
                <div css={S.STitle}>
                    <h3>최근 가장 인기 있는 해외 여행지, BEST 3</h3>
                </div>
                <div css={S.SContainer}>
                    {getPopularTrips &&
                        getPopularTrips?.overseas?.tripDestinations?.map(
                            (item) => (
                                <div
                                    key={item.tripDestinationId}
                                    css={S.SPopularTripBox(item.img)}
                                    onClick={() => handleDestinationClick(item)}
                                >
                                    <div className="banner_bg">
                                        <span>{item.koName}</span>
                                        <p class="hover_text">
                                            {item.koName}
                                            {hasBatchim(item.koName)
                                                ? "으로 "
                                                : "로 "}
                                            <br />떠나기
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                </div>
            </div>
        </div>
    );
}

export default MainRecommend;
