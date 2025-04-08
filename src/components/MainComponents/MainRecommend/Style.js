import { css } from '@emotion/react';

export const SLayout = css`
    margin: 5% 0;
    width: 100%;
    padding: 0 20%; 
`;

export const STitle = css`
    display: flex;
    align-items: center;

    h3 {
        margin-left: 10px;
        font-size: 1.3rem;
        font-weight: 500;
    }
`;

export const SContainer = css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 1fr)); /* 최소 150px, 최대 비율 분배 */
    gap: 25px;
    padding: 0 27px;
    margin: 10px 0 30px 0;

    @media (max-width: 900px) { // SRightContainer 위치 조정
        grid-template-columns: repeat(1, minmax(100px, 1fr)); /* 최소 150px, 최대 비율 분배 */
    }

    div {
        position: relative;
        border-radius: 2rem;
        overflow: hidden;
    }
    
    & > div:hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 16px #00000029;
    }
    
    img {
        width: 100%;
        height: 100%;
    }

    div > div {
        position: absolute;
        bottom: 10%;
        left: 5%;
        color: white;
        font-weight: 600;
        width: 90%;
        font-size: clamp(1rem, 5vw, 1.5rem);
        
        @media (max-width: 900px) {
            font-size: clamp(1rem, 5vw, 1.5rem); /* 작은 화면에서는 고정 크기 적용 */
        }
    }
`;