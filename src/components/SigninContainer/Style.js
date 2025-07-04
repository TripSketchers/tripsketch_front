import { css, keyframes } from '@emotion/react';
import colors from '../../constants/color';

const show = keyframes` // Keyframes 애니메이션 정의
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

export const SLayout = (isSignin, isRightPanelActive, isMobile) => css`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: ${isMobile ? "100%" : "50%"};
    ${isMobile
        ? `
        z-index: 5;
        opacity: 1;
        transform: none;
        animation: none;
    `
        : `
        z-index: ${isSignin 
            ? (isRightPanelActive ? '2' : '5')
            : (isRightPanelActive ? '5' : '1')};
        opacity: ${isSignin ? '1' : (isRightPanelActive ? '1' : '0')};
        transform: ${isRightPanelActive ? 'translateX(100%)' : 'translateX(0)'};
        animation: ${!isSignin && isRightPanelActive ? css`${show} 0.6s` : 'none'};
    `}
`;

export const SContainer = css`
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;

    input {
        background-color: #eee;
        border: none;
        border-radius: 5px;
        padding: 13px 15px;
        margin: 5px 0;
        width: 100%;
        font-size: 14px;
    }
    
    & button {
        margin-top: 15px;
    }
`;

export const SBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    & a {
        border: 1px solid #DDDDDD;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        height: 40px;
        width: 40px;
    }
`;

export const ErrorMsg = css`
    width: 100%;
    text-align: left;
    font-size: 12px;
    color: red;
`;

export const SMobileButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    color: ${colors.primaryBlue};
    
    path {
        color: ${colors.primaryBlue};
    }

    svg {
        margin-left: 4px;
        font-size: 1em;
    }
`;