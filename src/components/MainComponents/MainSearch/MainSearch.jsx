import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../SearchInput/SearchInput";
import { instance } from "../../../api/config/instance";
import { FaLocationDot } from "react-icons/fa6";
import SliderContainer from "../../SliderContainer/SliderContainer";
import { mainImages } from "./MainImages";

function MainSearch(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);
    const navigate = useNavigate();

    const [isShow, setIsShow] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const [currentImg, setCurrentImg] = useState(0);

    const getTripDestinations = useQuery({
        queryKey: ["getTripDestinations", searchKeyword],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                    params: {
                        searchKeyword: searchKeyword || "",
                    },
                };
                const response = await instance.get(
                    `/main/trip-destinations`,
                    options
                );
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const handleDestinationClick = (item) => {
        navigate(`/trip/create`, { state: item });
    };

    return (
        <div css={S.SLayout}>
            <SliderContainer onAfterChange={(index) => setCurrentImg(index)}>
                {mainImages.map((img, idx) => (
                    <div key={img.id}>
                        <img
                            src={img.src}
                            css={S.SImg}
                            draggable={false}
                            alt={img.description}
                        />
                    </div>
                ))}
            </SliderContainer>
            <div css={S.SIndicator}>
                {mainImages.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot${idx === currentImg ? " active" : ""}`}
                    >
                        *
                    </span>
                ))}
            </div>
            <div css={S.SSearchContainer}>
                <div>
                    <h1>
                        {mainImages[currentImg].location}에서 나만의 여행을
                        <br />
                        스케치 해보세요
                    </h1>
                    <div css={S.SSearchBox}>
                        {principalState?.data?.data ? (
                            <SearchInput
                                placeholder={"여행지 검색"}
                                setIsShow={setIsShow}
                                onSearch={(value) => setSearchKeyword(value)}
                            />
                        ) : (
                            <button
                                css={S.SStartBtn}
                                onClick={() => navigate("/auth/signin")}
                            >
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
                                            onClick={() =>
                                                handleDestinationClick(item)
                                            }
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            <FaLocationDot />
                                            <div css={S.STripDestinationName}>
                                                <span>
                                                    {item.koName
                                                        .split(" ")
                                                        .pop()}
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
            <div css={S.SImgDescription}>
                위치 : {mainImages[currentImg].description}
            </div>
        </div>
    );
}

export default MainSearch;
