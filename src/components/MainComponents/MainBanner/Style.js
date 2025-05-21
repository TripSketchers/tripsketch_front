import { css } from "@emotion/react";

export const SLayout = css`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #e6e6e6;
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
        width: 500px;
        height: 240px;
        object-fit: cover;
        border-radius: 40px;

        @media (max-width: 900px) {
            width: 400px;
            height: 200px;
        }
        @media (max-width: 700px) {
            width: 300px;
            height: 160px;
        }
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
    background: #432d13;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 2rem;
    z-index: 2;
    cursor: pointer;
    opacity: 0.8;
    transition: background 0.2s;
    
    &:hover {
        background: #6e4b1b;
    }

    &.rightBtn {
        right: clamp(0px, 20%, 180px);
    }

    &.leftBtn {
        left: clamp(0px, 20%, 180px);
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
            background: #432d13;
            width: ${progress}%;
            transition: width 0.1s linear;
        }
    }
`;
