import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import MainImg1 from "../../../assets/MainImg1.jpg";
import MainImg2 from "../../../assets/MainImg2.jpg";
import MainImg3 from "../../../assets/MainImg3.jpg";

const images = [
    {
        src: MainImg1,
        title: "예약시간에 맞춰 일정을 짜고 싶으신가요?",
        desc: "트립스케치에서는 예약시간에 맞춰 일정을 변경할 수 있어요.<br />운영시간도 알려주니 알찬 여행 계획을 편하게 세워보세요!",
    },
    {
        src: MainImg2,
        title: "여행지 추천이 필요하신가요?",
        desc: "트립스케치가 인기 여행지를 추천해드려요.<br />다양한 여행지를 한눈에 확인해보세요!",
    },
    {
        src: MainImg3,
        title: "여행 일정을 쉽게 관리하세요!",
        desc: "일정표를 쉽고 편하게 관리할 수 있습니다.<br />여행 준비가 한결 쉬워집니다.",
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
                    ←
                </button>
                <button
                    css={S.SSlideBtn}
                    onClick={handleNext}
                    className="rightBtn"
                >
                    →
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
