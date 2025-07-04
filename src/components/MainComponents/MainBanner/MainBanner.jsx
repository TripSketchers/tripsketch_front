import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const images = [
    {
        src: banner1,
        title: "일정표에 나만의 여행 이야기를 그려보세요!",
        desc: "여행 계획표 위에 손끝으로 여행의 순간을 채워보세요.<br />시간에 맞춰 일정을 드래그하며 나만의 여정을 완성하세요!",
    },
    {
        src: banner2,
        title: "설레는 여행지를 장소보관함에 담아보세요!",
        desc: "카테고리별 추천 여행지를 만날 수 있어요.<br />간직하고 싶은 여행지를 장소보관함에 담아보세요.",
    },
    {
        src: banner3,
        title: "여행의 추억을 앨범 속에 소중히 담아보세요.",
        desc: "여행지에서의 빛나는 순간을 앨범에 차곡차곡 저장하세요.<br />장소별 사진을 모아두면, 언제든 여행의 기억이 펼쳐집니다.",
    },
];

function MainBanner(props) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef();

    const handlePrev = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        setProgress(0);
    };

    const handleNext = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setProgress(0);
    };

    // 5초마다 자동으로 다음 페이지로 이동 + 프로그레스바
    useEffect(() => {
        setProgress(0);
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
                    return 0;
                }
                return prev + 2; // 2씩 증가(5초 동안 100)
            });
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, [current, images.length]);

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                {images.map((image, index) => {
                    let className = "";
                    if (index === current) className = "center";
                    else if (
                        index ===
                        (current - 1 + images.length) % images.length
                    )
                        className = "prev";
                    else if (index === (current + 1) % images.length)
                        className = "next";
                    else className = "hidden";
                    return (
                        <div
                            key={index}
                            css={S.SBannerBox}
                            className={className}
                        >
                            <img src={image.src} alt={image.title} />
                            <div>
                                {image.title}
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: image.desc,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
                {/* 좌우 버튼 */}
                <button
                    css={S.SSlideBtn}
                    onClick={handlePrev}
                    className="leftBtn"
                >
                    <FaArrowLeft />
                </button>
                <button
                    css={S.SSlideBtn}
                    onClick={handleNext}
                    className="rightBtn"
                >
                    <FaArrowRight />
                </button>
            </div>
            {/* 페이지 표시 및 프로그레스바 */}
            <div css={S.SPageCount(progress)}>
                <div>
                    {current + 1} / {images.length}
                </div>
                <div className="progress-bar">
                    <div />
                </div>
            </div>
        </div>
    );
}

export default MainBanner;
