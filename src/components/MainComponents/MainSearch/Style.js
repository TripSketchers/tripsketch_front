import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin: 5% 0;
    width: 100%;
    padding: 0 20%;

    @media (max-width: 1000px) { // SRightContainer 위치 조정
        flex-direction: column;
    }
`;

export const SLeftContainer = css`
    flex: 1;
    width: 100%;

    img {
        width: 100%;
        border-radius: 2rem;
    }
`;

export const SRightContainer = css`
    flex: 1;
    display: flex;
    align-items: center;
    
    @media (max-width: 1100px) { // SRightContainer 위치 조정
        margin: 20px 0;
    }
    
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        width: 100%;
    }

    h1 {    //문구
        margin-bottom: 20px;
        font-size: 34px;
        line-height: 38px;
        font-weight: 700;
    }
`;