import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderContainer({ children, onAfterChange }) {
    const settings = {
        infinite: true, // 무한 루프
        autoplay: true, // 자동 슬라이드
        autoplaySpeed: 3000, // 다음 슬라이드까지 3초 대기
        speed: 500, // 애니메이션 전환 시간 0.5초
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false, // 마우스 오버에도 자동 슬라이드 유지
        afterChange: onAfterChange, // 외부 상태 업데이트
    };
    return <Slider {...settings}>{children}</Slider>;
}

export default SliderContainer;
