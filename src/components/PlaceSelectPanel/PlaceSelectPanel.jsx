import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SearchInput from "../SearchInput/SearchInput";
import PlaceBox from "./PlaceBox/PlaceBox";
import { instance } from "../../api/config/instance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import AccommodationModal from "../AccommodationModal/AccommodationModal";
import { useTrip } from "../Routes/TripContext";

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
        tripInfo,
        storedPlaces,
        setStoredPlaces,
        setStoredAccommodations,
        setFocusedPlace,
    } = useTrip();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["places", selectedCategory, searchKeyword],
        queryFn: async ({ pageParam = "" }) => {
            const res = await instance.get("/places", {
                params: {
                    type: categoryTypeMap[selectedCategory] || "",
                    keyword: searchKeyword || categoryTypeMap[selectedCategory],
                    pagetoken: pageParam,
                },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            return res.data;
        },
        getNextPageParam: (lastPage) => lastPage?.nextPageToken || undefined,
        staleTime: 1000 * 60 * 5,
    });

    const handleAccommodationConfirm = (selectedMap) => {
        setStoredAccommodations((prev) => ({ ...prev, ...selectedMap }));
        setShowModal(false);
    };

    const handleTogglePlace = (place) => {
        setFocusedPlace(null);

        if (text === "숙소") {
            setSelectedPlace(place);
            setShowModal(true);
        } else if (text === "계획") {
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
                {isLoading && <div>로딩 중...</div>}
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
