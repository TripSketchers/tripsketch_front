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
		dateRange,
		storedPlaces,
		setStoredPlaces,
		setStoredAccommodation,
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
					pagetoken: pageParam, // ✅ pagetoken 보내기
				},
				headers: {
					Authorization: localStorage.getItem("accessToken"),
				},
			});
			return res.data;
		},
		getNextPageParam: (lastPage) => {
			return lastPage?.nextPageToken || undefined; // ✅ nextPageToken으로 다음 요청
		},
		staleTime: 1000 * 60 * 5,
	});

	const handleAccommodationConfirm = (selectedMap) => {
		setStoredAccommodation((prev) => ({ ...prev, ...selectedMap }));
		setShowModal(false);
	};

	const handleTogglePlace = (place) => {
		setFocusedPlace(null);
		if (text === "숙소") {
			setSelectedPlace(place);
			setShowModal(true);
		} else {
			setStoredPlaces((prev) => {
				const exists = prev.some((p) => p.id === place.id);
				if (exists) {
					return prev.filter((p) => p.id !== place.id);
				} else {
					return [...prev, place];
				}
			});
		}
	};

	const isPlaceAdded = (place) => {
		if (text === "숙소") return false;
		return storedPlaces.some((p) => p.id === place.id);
	};

	return (
		<div css={S.SLayout}>
			<div css={S.SSearchBox}>
				<SearchInput
					placeholder={`${text}명을 입력하세요`}
					onSearch={(value) => {
						setSearchKeyword(value);
						value
							? setSelectedCategory(null)
							: setSelectedCategory(categories[0]);
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
						.filter((place) => {
							return (
								!selectedCategory || // ✅ 카테고리 선택 안 됐으면 무조건 통과
								selectedCategory ===
									place.category
							);
						})
						.map((place, i) => (
							<PlaceBox
								key={place.id ?? `${pageIndex}-${i}`}
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
					dateRange={dateRange}
					selectedPlace={selectedPlace}
				/>
			)}
		</div>
	);
}

export default PlaceSelectPanel;
