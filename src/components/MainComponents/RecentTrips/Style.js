import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const SLayout = css`
    position: relative;
    margin: 5% 0;
    width: 100%;
    height: 100%;
    padding: 0 20%;

    h2 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
    }
`;

export const SContainer = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    height: 100%;

    @media (max-width: 1000px) {
        // SRightContainer 위치 조정
        flex-direction: column;
        align-items: stretch;
    }
`;

export const SLeftContainer = css`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const STripBox = css`
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 2.5;
    height: auto;
    border-radius: 20px;
    overflow: hidden;
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 16px #00000029;
    }

    * {
        color: white;
        font-weight: 600;
        transition: transform 0.3s ease;
    }

    span,
    h3 {
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
    }

    .info {
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        padding: 5%;
        z-index: 1;
    }

    .dDay {
        margin-right: 5px;
        border-radius: 1rem;
        padding: 5px 10px;
        background-color: ${colors.mainDarkBlue};
        color: white;
    }

    .tripTitle {
        font-size: 1.5rem;
    }

    .summary {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 5%;
        z-index: 1;
        line-height: 1.5rem;
    }

    h3 {
        font-size: 1.3rem;
    }

    .containIcon {
        display: flex;
        align-items: center;
    }

    svg {
        width: 1rem;
        margin-right: 5px;
    }

    img {
        position: relative;
        width: 100%;
        height: 100%;
        max-height: 100%;
        object-fit: cover;
    }
`;

export const SRightContainer = css`
    position: relative;
    flex: 1;
    width: 100%;

    /* 공통 앨범 박스 기본 스타일 */
    .albumBox {
        overflow: hidden;
        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        background-color: white;
        transition:
            transform 0.3s ease,
            z-index 0.3s ease,
            box-shadow 0.3s ease;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    }

    /* [기본: 1000px 초과] 가로로 겹치는 부채꼴 형태 */
    .albumContainer {
        position: relative;
        width: 100%;
        aspect-ratio: 4 / 2.5;
    }

    /* 갯수별 데스크탑 배치 */
    .albumBox-count-1 {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .albumBox-count-2 {
        position: absolute;
        width: 80%;
        height: 90%;
        &.albumBox-idx-1 {
            top: 10%;
            left: 0;
            z-index: 1;
        }
        &.albumBox-idx-2 {
            top: 0;
            left: 20%;
            z-index: 0;
        }
    }
    .albumBox-count-3 {
        position: absolute;
        width: 70%;
        height: 85%;
        &.albumBox-idx-1 {
            bottom: 0;
            left: 0;
            z-index: 2;
        }
        &.albumBox-idx-2 {
            top: 9%;
            left: 20%;
            z-index: 1;
        }
        &.albumBox-idx-3 {
            top: 0;
            left: 40%;
            z-index: 0;
        }
    }

    /* 데스크탑 호버 효과 */
    @media (min-width: 1001px) {
        .albumBox:hover {
            transform: scale(1.05);
            z-index: 10;
        }
    }

    /* [반응형: 1000px 이하] 세로로 겹치는 형태 */
    @media (max-width: 1000px) {
        .albumContainer {
            display: flex;
            flex-direction: column;
            aspect-ratio: auto; /* 고정 비율 해제하여 내용만큼 늘어나게 함 */
            padding-bottom: 20px;
        }

        .albumBox {
            position: relative !important; /* absolute 해제 */
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 4 / 2.5;
            left: 0 !important;
            top: 0 !important;
            transform: none !important;

            /* 아래쪽 박스가 위쪽 박스 위로 올라오게 z-index 설정 */
            &.albumBox-idx-1 {
                z-index: 1;
            }
            &.albumBox-idx-2 {
                z-index: 2;
            }
            &.albumBox-idx-3 {
                z-index: 3;
            }
        }

        /* 두 번째 박스부터 위로 겹치기 */
        .albumBox + .albumBox {
            margin-top: -45%;
        }

        .albumBox:hover {
            transform: translateY(-10px) !important;
            z-index: 10 !important;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
    }
`;

export const SNoAlbum = css`
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 2.5;
    font-size: 1.1rem;
    border-radius: 20px;
    border: 3px dashed lightgray;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    /* 앨범 없음 안내 텍스트 영역 */
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        * {
            color: gray;
        }

        span {
            display: flex;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        svg {
            font-size: 24px;
            margin-right: 5px;
        }
    }

    button {
        position: relative;
        left: 0;
        bottom: 0;
        transform: none;
        width: 160px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        font-family: sans-serif;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        background: #ccc;
    }
    button:before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: ${colors.mainBlueHover};
        color: #fff;
        transition: 0.5s;
        transform-origin: bottom;
        transform: translatey(-100%) rotatex(90deg);
    }
    button:hover:before {
        transform: translatey(0) rotatex(0deg);
    }

    button:after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: ${colors.mainBlue};
        color: #fff;
        transition: 0.5s;
        transform-origin: top;
        transform: translatey(0) rotatex(0deg);
    }
    button:hover:after {
        transform: translatey(100%) rotatex(90deg);
    }
`;
