import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SearchInput from "../SearchInput/SearchInput";
import PlaceBox from "./PlaceBox/PlaceBox";
import { instance } from "../../api/config/instance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import AccommodationModal from "../AccommodationModal/AccommodationModal";
import { useTrip } from "../TripCreate/TripContext";

function PlaceSelectPanel({ text, categories }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [query] = useState("부산 해운대");
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {
        dateRange,
        storedPlaces,
        setStoredPlaces,
        setStoredAccommodation,
    } = useTrip();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["places", query, selectedCategory],
        queryFn: async ({ pageParam = "" }) => {
            if (pageParam === false) return { results: [] };
            const res = await instance.get("/places", {
                params: {
                    destination: query,
                    type: selectedCategory,
                    pagetoken: pageParam,
                },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            return res.data;
        },
        getNextPageParam: (lastPage) =>
            lastPage?.next_page_token ? lastPage.next_page_token : undefined,
        staleTime: 1000 * 60 * 5,
    });

    const getImageBlobUrl = async (photoReference) => {
        if (!photoReference) return "";
        try {
            const res = await instance.get(`/photo?ref=${photoReference}`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
                responseType: "blob",
            });
            return URL.createObjectURL(res.data);
        } catch (err) {
            console.error("이미지 로딩 실패", err);
            return "";
        }
    };

    const handleAccommodationConfirm = (selectedMap) => {
        setStoredAccommodation((prev) => ({ ...prev, ...selectedMap }));
        setShowModal(false);
    };

    const handleTogglePlace = async (place) => {
        const photoRef = place.photos?.[0]?.photo_reference;
        const imageUrl = await getImageBlobUrl(photoRef);
        const placeWithImage = { ...place, imageUrl };

        if (text === "숙소") {
            setSelectedPlace(placeWithImage); // 모달 띄울 때도 imageUrl 포함
            setShowModal(true);
        } else {
            setStoredPlaces((prev) => {
                const exists = prev.some((p) => p.place_id === place.place_id);
                if (exists) {
                    return prev.filter((p) => p.place_id !== place.place_id);
                } else {
                    return [
                        ...prev,
                        { ...placeWithImage, category: selectedCategory },
                    ];
                }
            });
        }
    };

    const isPlaceAdded = (place) => {
        if (text === "숙소") return false; // 숙소는 날짜별이라 체크 없음
        return storedPlaces.some((p) => p.place_id === place.place_id);
    };

    return (
        <div css={S.SLayout}>
            <div css={S.SSearchBox}>
                <SearchInput placeholder={`${text}명을 입력하세요`} />
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
                    page.results
                        .filter(
                            (place) =>
                                !categories.includes(place.name) &&
                                place.rating !== null
                        )
                        .map((place, i) => (
                            <PlaceBox
                                key={place.place_id ?? `${pageIndex}-${i}`}
                                place={place}
                                category={selectedCategory}
                                onToggle={() => handleTogglePlace(place)}
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
                    dateRange={dateRange}
                    selectedPlace={selectedPlace}
                />
            )}
        </div>
    );
}

export default PlaceSelectPanel;
