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

    button {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
        border-radius: 2rem;
        font-size: 1.1rem;
        width: 30%;
        padding: 6px;
        font-weight: 500;
        background-color: #dff2f6;
        transition: all 0.2s ease;
    }

    button:hover {
        transform: scale(0.95);
    }
`;

export const SSearchBox = css`
    display: flex;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 2rem;
    padding: 0 5px 0 10px;
    width: 100%;
    height: 2.5rem;
    box-shadow: 2px 2px 6px #666;
    
    input {
        margin: 0 6px;
        border: none;
        flex: 1;
        width: 70%;
        height: 90%;
        font-size: 16px;
    }

    input:focus {
        outline: none;
    }

    button {
        border-radius: 2rem;
        width: 20%;
        height: 80%;
        font-size: 16px;
        background-color: #dff2f6;
        transition: all 0.2s ease;
    }

    /* button:hover {
        transform: scale(0.95);
    } */
`;