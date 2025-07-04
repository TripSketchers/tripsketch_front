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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
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

    .albumContainer {
        position: relative;
        width: 100%;
        aspect-ratio: 4 / 2.5;
        height: auto;
    }

    @media (max-width: 1000px) {
        .albumContainer {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 3;
            height: auto;
        }

        .albumContainer-1 {
            margin-bottom: -60px;
        }

        .albumContainer-2 {
            margin-bottom: -30px;
        }

        .albumBox {
            position: relative !important;
            width: 100% !important;
            aspect-ratio: 4 / 2.5;
            height: auto !important;
            transition: transform 0.3s ease;
            margin-bottom: -20%; /* 겹치게 */
        }

        // albumBox가 1개일 때
        .albumBox-count-1.albumBox-idx-1 {
            transform: translate(0%, 5%) !important;
            z-index: 0;
            transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;

            &:hover {
                transform: translate(0%, 5%) scale(1.03) !important;
                z-index: 3;
            }
        }

        // albumBox가 2개일 때
        .albumBox-count-2.albumBox-idx-1 {  // 1번 앨범
            transform: translate(0, 0px) !important;
            z-index: 0;
            transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;

            &:hover {
                transform: translate(0, 0px) scale(1.03) !important;
                z-index: 3;
            }
        }
        .albumBox-count-2.albumBox-idx-2 {  // 2번 앨범
            position: absolute !important;
            transform: translate(0, 0) !important;
            z-index: 0;
            transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;

            &:hover {
                transform: translate(0, 0px) scale(1.03) !important;
                z-index: 3;
            }
        }

        // albumBox가 3개일 때
        .albumBox-count-3.albumBox-idx-1 {  // 1번 앨범
            transform: translate(0, 80px) !important;
            z-index: 0;
            transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;

            &:hover {
                transform: translate(0%, 25%) scale(1.03) !important;
                z-index: 3;
            }
        }
        .albumBox-count-3.albumBox-idx-2 {  // 2번 앨범
            position: absolute !important;
            transform: translate(0%, -200px) !important;
            z-index: 1;
            transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;

            &:hover {
                transform: translate(0%, -55%) scale(1.03) !important;
                z-index: 3;
            }
        }
        .albumBox-count-3.albumBox-idx-3 {  // 3번 앨범
            position: absolute !important;
            transform: translate(0%, -240px) !important;
            z-index: 2;
            transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;

            &:hover {
                transform: translate(0%, -65%) scale(1.03) !important;
                z-index: 3;
            }
        }
    }

    /* 기본 albumBox 스타일 */
    .albumBox {
        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block; // img 아래에 **줄바꿈 공백(default inline space)**이 방지
        }
    }

    /* albumBox가 1개일 때 */
    .albumBox-count-1 {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        transform: translate(0%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 0%) scale(1.03);
            z-index: 3;
        }
    }

    /* albumBox가 2개일 때 */
    .albumBox-count-2.albumBox-idx-1 {
        position: absolute;
        width: 80%;
        height: 90%;
        top: 10%;
        z-index: 1;
        transform: translate(0%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 0%) scale(1.03);
            z-index: 3;
        }
    }
    .albumBox-count-2.albumBox-idx-2 {
        position: absolute;
        width: 80%;
        height: 90%;
        top: 0;
        z-index: 0;
        transform: translate(20%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(20%, 0%) scale(1.03);
            z-index: 3;
        }
    }

    /* albumBox가 3개일 때*/
    .albumBox-count-3.albumBox-idx-1 {
        position: absolute;
        width: 70%;
        height: 85%;
        z-index: 2;
        transform: translate(0%, 18%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 18%) scale(1.03);
            z-index: 3;
        }
    }
    .albumBox-count-3.albumBox-idx-2 {
        position: absolute;
        width: 70%;
        height: 85%;
        z-index: 1;
        transform: translate(20%, 9%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(20%, 9%) scale(1.03);
            z-index: 3;
        }
    }
    .albumBox-count-3.albumBox-idx-3 {
        position: absolute;
        width: 70%;
        height: 85%;
        z-index: 0;
        transform: translate(40%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(40%, 0%) scale(1.03);
            z-index: 3;
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
