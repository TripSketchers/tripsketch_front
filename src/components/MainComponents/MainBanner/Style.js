import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const SLayout = css`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding: 20px 20%;
`;

export const SContainer = css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 340px;
    max-height: 440px;
    overflow: hidden;
`;

export const SBannerBox = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.5s;
    opacity: 0;
    pointer-events: none;

    img {
        aspect-ratio: 4 / 2.5;
        object-fit: cover;
        border-radius: 20px;
        max-width: 400px;
    }

    &.center {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        z-index: 2;
        img {
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }
    }
    &.prev {
        transform: translate(-110%, -60%) scale(0.7);
        opacity: 1;
        z-index: 1;
        img {
            filter: brightness(0.8);
        }
        div {
            display: none;
        }
    }
    &.next {
        transform: translate(10%, -60%) scale(0.7);
        opacity: 1;
        z-index: 1;
        img {
            filter: brightness(0.8);
        }
        div {
            display: none;
        }
    }
    &.hidden {
        opacity: 0;
        pointer-events: none;
    }

    div {
        //문구
        display: flex;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        margin-top: 10px;
        font-size: clamp(16px, 2vw, 22px);
        font-weight: 700;

        span {
            margin-top: 10px;
            font-size: clamp(12px, 2vw, 16px);
            line-height: clamp(16px, 2vw, 20px);
            font-weight: 500;
        }
    }
`;

export const SSlideBtn = css`
    position: absolute;
    bottom: 0%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.mainBlue};
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 2rem;
    z-index: 2;
    opacity: 0.8;
    transition: background 0.2s;
    cursor: pointer;
    * {
        color: #fff;
    }
    
    &:hover {
        background: ${colors.mainBlueHover};
    }

    &.rightBtn {
        right: 0px;
    }

    &.leftBtn {
        left: 0px;
    }
`;

export const SPageCount = (progress) => css`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 600;
    height: 100%;

    .progress-bar {
        margin-left: 15px;
        width: 200px;
        height: 6px;
        background: #eee;
        border-radius: 3px;
        overflow: hidden;
        position: relative;

        div {
            height: 100%;
            background: ${colors.mainBlueHover};
            width: ${progress}%;
            transition: width 0.1s linear;
        }
    }
`;
