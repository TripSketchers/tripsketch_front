import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const SLayout = css`
    margin: 5% 0;
    width: 100%;
    padding: 0 20%;
`;

export const STitle = css`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 18px;

    &::before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 24px;
        
        background: linear-gradient(180deg, ${colors.mainBlue} 60%, ${colors.mainGreen} 100%);
        border-radius: 3px;
        margin-right: 10px;
    }

    h3 {
        font-size: 1.4rem;
        font-weight: 800;
        letter-spacing: -1px;
        margin: 0;
    }
`;

export const SContainer = css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(
        3,
        minmax(200px, 1fr)
    ); /* 최소 150px, 최대 비율 분배 */
    gap: 25px;
    height: clamp(120px, 30vw, 200px);
    padding: 0 27px;
    margin: 10px 0 30px 0;

    @media (max-width: 900px) {
        // SRightContainer 위치 조정
        grid-template-columns: repeat(1, 1fr); /* 최소 150px, 최대 비율 분배 */
        height: 600px;
    }
`;

export const SPopularTripBox = (img) => css`
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background-image: url(${img});
    background-size: cover;
    background-position: center;
    cursor: pointer;

    :hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 16px #00000029;
    }

    span {
        position: absolute;
        left: 5%;
        bottom: 5%;
        color: white;
        font-weight: 600;
        font-size: 22px;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
    }

    .banner_bg {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .banner_bg::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 4;
        pointer-events: none;
    }

    .banner_bg:hover::after {
        opacity: 1;
    }

    .hover_text {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -10%);
        color: #fff;
        text-align: center;
        line-height: 26px;
        z-index: 5;
        font-weight: 600;
        font-size: clamp(16px, 2vw, 20px);;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s, transform 0.7s;
    }

    .banner_bg:hover > .hover_text {
        opacity: 1;
        transform: translate(-50%, -10%);
    }
`;
