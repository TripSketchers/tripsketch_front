import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import MainImg from "../../../assets/MainImg.jpg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../SearchInput/SearchInput";
import { instance } from "../../../api/config/instance";
import { FaLocationDot } from "react-icons/fa6";

function MainSearch(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);
    const navigate = useNavigate();

    const [isShow, setIsShow] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleStartBtn = () => {
        navigate("/auth/signin");
    };

    const getTripDestinations = useQuery({
        queryKey: ["getTripDestinations", searchKeyword],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                    params: {
                        searchKeyword: searchKeyword || ""
                    }
                };
                const response = await instance.get(`/main/trip-destinations`, options );
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const handleDestinationClick = (item) => {
        navigate(`/trip/create`, { state: item })
    }

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
                    <div css={S.SRightBottomBox}>
                        {principalState?.data?.data ? (
                            <SearchInput
                                placeholder={"여행지 검색"}
                                setIsShow={setIsShow}
                                onSearch={(value) => setSearchKeyword(value)}
                            />
                        ) : (
                            <button css={S.SStartBtn} onClick={handleStartBtn}>
                                시작하기
                            </button>
                        )}
                        {isShow && (
                            <div css={S.STripDestinations}>
                                {getTripDestinations?.data?.tripDestinations.map(
                                    (item) => (
                                        <div
                                            key={item.tripDestinationId}
                                            css={S.STripDestinationBox}
                                            onClick={()=>handleDestinationClick(item)}
                                        >
                                            <FaLocationDot />
                                            <div css={S.STripDestinationName}>
                                                <span>
                                                    {item.koName.split(" ").pop()}
                                                </span>
                                                {item.koName.split(" ")[0]}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSearch;
