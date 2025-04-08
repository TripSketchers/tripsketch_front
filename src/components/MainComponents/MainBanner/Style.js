import { css } from '@emotion/react';

export const SLayout = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin: 20px 0;
    padding: 20px 20%;
    width: 100%;
    height: 10%;
    background-color: #e6e6e6;

    @media (max-width: 880px) { // SRightContainer 위치 조정
        flex-direction: column;
        gap: 0;
    }
`;

export const SLeftContainer = css`
    display: flex;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        max-width: 20rem;
        height: 100%;
        border-radius: 2rem;
    }
    
`;

export const SRightContainer = css`
    display: flex;
    align-items: center;
    width: 100%;
    flex: 1;

    @media (max-width: 1100px) { // SRightContainer 위치 조정
        margin: 20px 0;
    }

    div {
        width: 100%;
    }

    h3 {    //문구
        margin-bottom: 20px;
        font-size: clamp(16px, 3vw, 24px);
        font-weight: 700;
    }

    span {
        font-size: clamp(12px, 2vw, 16px);
        line-height: clamp(16px, 2vw, 20px);
    }
    
`;