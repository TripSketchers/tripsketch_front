import { css } from '@emotion/react';

export const SLayout = css`
    position: relative;
    margin: 5% 0;
    width: 100%;
    height: 100%;
    padding: 0 20%;
    
    h1 {
        font-size: 2rem;
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

    @media (max-width: 1000px) { // SRightContainer 위치 조정
        flex-direction: column;
    }
`;

export const SLeftContainer = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
`;

export const STripBox = css`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 16px #00000029;
    }
    
    * { 
        color: white; 
        font-weight: 600;
        transition: transform 0.3s ease;
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
        padding: 5px;
        background-color: #dff2f6;
        color: black;
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
        line-height: 1.3rem;
    }

    h3 {
        font-size: 1.3rem;
        line-height: 2rem;
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
        
    }
`;

export const SRightContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    & > div {
        position: relative;
        width: 100%;
        padding-bottom: clamp(60%, 65%, 80%); // 브라우저에 맞춰 비율 조정
    }

    .albumBox {
        position: absolute;
        width: 70%;
        height: 85%;
        overflow: hidden;
        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 1번: 앞에 보이는 앨범 */
    .albumBox:nth-of-type(1) {
        z-index: 2;
        transform: translate(0%, 20%);

        &:hover {
            transform: translate(0%, 20%) scale(1.03);
            box-shadow: 2px 4px 16px #00000029;
        }
    }

    /* 2번: 중간 앨범 */
    .albumBox:nth-of-type(2) {
        z-index: 1;
        transform: translate(20%, 10%);

        &:hover {
            transform: translate(20%, 10%) scale(1.03);
            box-shadow: 2px 4px 16px #00000029;
            z-index: 3;
        }
    }

    /* 3번: 제일 뒤 앨범 */
    .albumBox:nth-of-type(3) {
        z-index: 0;
        transform: translate(40%, 0%);

        &:hover {
            transform: translate(40%, 0%) scale(1.03);
            box-shadow: 2px 4px 16px #00000029;
            z-index: 3;
        }

        @media (max-width: 1000px) { // SRightContainer 위치 조정
            
        }
    }
    
`;