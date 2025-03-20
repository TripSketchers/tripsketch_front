import { css, keyframes } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    height: calc(100vh - 110px);

    h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 0;
    }

    p {
        font-size: 16px;
        font-weight: 100;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
    }

    span {
        font-size: 14px;
    }
`;

export const SContainer = css`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0px 28px rgba(0,0,0,0.25), 0 0px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 1000px;
    max-width: 100%;
    min-height: 650px;
`;

export const SOverlayBox = (isRightPanelActive) => css`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    transform: ${isRightPanelActive ? 'translateX(-100%)' : 'translateX(0)'};
`;

export const SOverlay = (isRightPanelActive) => css`
    background: rgb(44,195,185);
    background: linear-gradient(90deg, rgba(44,195,185,1) 0%, rgba(44,109,195,1) 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: ${isRightPanelActive ? 'translateX(50%)' : 'translateX(0)'};
    transition: transform 0.6s ease-in-out;
    
    & * {
        color: #FFFFFF;
        button {
            background-color: transparent;
            border-color: #FFFFFF;
        }
    }
`;

// Panel 공통 스타일
const panelBase = css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const SOverlayPanelLeft = (isRightPanelActive) => css`
    ${panelBase};
    transform: ${isRightPanelActive ? 'translateX(0)' : 'translateX(-20%)'};
`;

export const SOverlayPanelRight = (isRightPanelActive) => css`
    ${panelBase};
    right: 0;
    transform: ${isRightPanelActive ? 'translateX(20%)' : 'translateX(0)'};
`;