import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import fallbackImg from "../../../assets/fallbackImg.png";
import { FaStar } from "react-icons/fa";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { instance } from "../../../api/config/instance";

function PlaceBox({ place, category, onToggle, isAdded }) {
    const imgRef = useRef();
    const [imgSrc, setImgSrc] = useState(place.imageUrl || null); // 캐시된 이미지가 있으면 사용
    const [hasRequested, setHasRequested] = useState(false); // 요청 여부 플래그

    // 백엔드를 통해 이미지 blob 데이터를 받아와 URL 생성
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

    useEffect(() => {
        if (imgSrc || hasRequested) return; // 중복 요청 방지

        // IntersectionObserver로 실제로 보일 때만 이미지 로딩
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const load = async () => {
                        if (place.photos?.[0]?.photo_reference) {
                            const blobUrl = await getImageBlobUrl(
                                place.photos[0].photo_reference
                            );
                            setImgSrc(blobUrl);
                            place.imageUrl = blobUrl; // 최초 로딩된 이미지 캐싱
                        } else {
                            setImgSrc(fallbackImg); // 이미지가 없을 경우 기본 이미지 설정
                        }
                        setHasRequested(true);
                    };
                    load();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, [place, imgSrc, hasRequested]);

    return (
        <div css={S.SLayout}>
            <img
                ref={imgRef}
                src={imgSrc || fallbackImg}
                alt={place.name}
                loading="lazy"
                onError={(e) => (e.target.src = fallbackImg)}
            />
            <div css={S.SContainer}>
                <h2 css={S.STitle}>{place.name}</h2>
                <div>
                    <span css={S.SCategory(category)}>{category}</span>
                    <span css={S.SAddress}>
                        {place.formatted_address?.split(" ").slice(2).join(" ")}
                    </span>
                </div>
                <div css={S.SLikeBox}>
                    <span css={S.SStar}>
                        <FaStar /> {place.rating}
                    </span>
                </div>
            </div>
            <button css={S.SButton(isAdded)} onClick={onToggle}>
                {isAdded ? <FaCheck /> : <FaPlus />}
            </button>
        </div>
    );
}

export default PlaceBox;
