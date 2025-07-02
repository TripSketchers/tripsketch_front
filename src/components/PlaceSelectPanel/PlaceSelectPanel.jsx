import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SearchInput from "../SearchInput/SearchInput";
import PlaceBox from "./PlaceBox/PlaceBox";
import { instance } from "../../api/config/instance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import AccommodationModal from "../AccommodationModal/AccommodationModal";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { useTrip } from "../Routes/TripContext";
import Loading from "../Loading/Loading";

function PlaceSelectPanel({ text, categories }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const categoryTypeMap = {
        명소: "tourist_attraction",
        맛집: "restaurant",
        카페: "cafe",
        숙소: "lodging",
    };

    const {
        tripDestination,
        storedPlaces,
        setStoredPlaces,
        setStoredAccommodations,
        setFocusedPlace,
    } = useTrip();

    const location = useLocation();
    // 구조분해 할당으로 변수에 담기
    const { lowLat, lowLng, highLat, highLng } = tripDestination || location?.state || {};

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["places", selectedCategory, searchKeyword, lowLat, lowLng, highLat, highLng],
        queryFn: async ({ pageParam = "" }) => {
            const res = await instance.get("/places", {
                params: {
                    type: categoryTypeMap[selectedCategory] || "",
                    keyword: searchKeyword || categoryTypeMap[selectedCategory],
                    pagetoken: pageParam, // ✅ pagetoken 보내기
                    location: [lowLat, lowLng, highLat, highLng],
                },
                paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }),
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            return res.data;
        },
        getNextPageParam: (lastPage) => lastPage?.nextPageToken || undefined,
        staleTime: 1000 * 60 * 5,
        enabled: !!lowLat && !!lowLng && !!highLat && !!highLng,
    });

            
    if (!lowLat || !lowLng || !highLat || !highLng) {
        return <Loading content={"위치 정보를 로딩 중입니다."}/>;
    }

    const handleAccommodationConfirm = (selectedMap) => {
        setStoredAccommodations((prev) => ({ ...prev, ...selectedMap }));
        setShowModal(false);
    };

    const handleTogglePlace = (place) => {
        setFocusedPlace(null);

        if (text === "숙소") {
            setSelectedPlace(place);
            setShowModal(true);
        } else {
            setStoredPlaces((prev) => {
                const exists = prev.some((p) => p.googlePlaceId === place.id);
                if (exists) {
                    return prev.filter((p) => p.googlePlaceId !== place.id);
                } else {
                    const normalizedPlace = {
                        ...place,
                        googlePlaceId: place.id, // ✅ ID 통일
                    };
                    return [...prev, normalizedPlace];
                }
            });
        }
    };

    const isPlaceAdded = (place) => {
        if (text === "숙소") return false;
        return storedPlaces.some((p) => p.googlePlaceId === place.id);
    };    

    return (
        <div css={S.SLayout}>
            <div css={S.SSearchBox}>
                <SearchInput
                    placeholder={`${text === "숙소" ? "숙소" : "장소"}명을 입력하세요`}
                    onSearch={(value) => {
                        setSearchKeyword(value);
                        setSelectedCategory(value ? null : categories[0]);
                    }}
                />
            </div>

            <div css={S.SCategoryTabContainer}>
                {categories.map((category) => (
                    <div
                        key={category}
                        css={S.SCategoryTab(selectedCategory === category)}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>

            <div css={S.SPlaceContainer}>
                {isLoading && <Loading />}
                {error && <div>에러 발생!</div>}

                {data?.pages.map((page, pageIndex) =>
                    page.places
                        .filter(
                            (place) =>
                                !selectedCategory ||
                                selectedCategory === place.category
                        )
                        .map((place, i) => (
                            <PlaceBox
                                key={
                                    place.googlePlaceId || place.id
                                }
                                place={place}
                                onToggle={(e) => {
                                    e.stopPropagation();
                                    handleTogglePlace(place);
                                }}
                                isAdded={isPlaceAdded(place)}
                            />
                        ))
                )}

                {hasNextPage && (
                    <div css={S.SMoreButtonWrapper}>
                        <button
                            css={S.SMoreButton}
                            onClick={fetchNextPage}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? (
                                "불러오는 중..."
                            ) : (
                                <>
                                    <FaPlus /> 더보기
                                </>
                            )}
                        </button>
                    </div>
                )}

                {!hasNextPage && data?.pages.length > 0 && (
                    <div css={S.SEndMessage}>모든 장소를 불러왔습니다.</div>
                )}
            </div>

            {text === "숙소" && showModal && selectedPlace && (
                <AccommodationModal
                    onClose={() => setShowModal(false)}
                    onConfirm={handleAccommodationConfirm}
                    selectedPlace={selectedPlace}
                />
            )}
        </div>
    );
}

export default PlaceSelectPanel;
