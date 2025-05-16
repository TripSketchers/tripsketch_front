import { css } from "@emotion/react";

export const SLayout = css`
    position: relative;
    margin: 5% 0;
    width: 100%;
    height: 100%;
    padding: 0 20%;

    h2 {
        font-size: 24px;
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
    height: 100%;

    @media (max-width: 1000px) {
        // SRightContainer 위치 조정
        flex-direction: column;
    }
`;

export const SLeftContainer = css`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const STripBox = css`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 16px #00000029;
    }

    * {
        color: white;
        font-weight: 600;
        transition: transform 0.3s ease;
    }

    span,
    h3 {
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
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
        line-height: 1.5rem;
    }

    h3 {
        font-size: 1.3rem;
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
        object-fit: cover;
    }
`;

export const SRightContainer = css`
    position: relative;
    flex: 1;

    & > div {
        position: relative;
        width: 100%;
        height: 85%;

        @media (max-width: 1000px) {
            // SRightContainer 위치 조정
            height: clamp(160px, 30vw, 300px);
        }
    }

    & > div {
        position: relative;
        width: 100%;
        height: calc(100% - 44px);

        @media (max-width: 1000px) {
            // SRightContainer 위치 조정
            height: clamp(160px, 30vw, 300px);
        }
    }

    /* 기본 albumBox 스타일 */
    .albumBox {
        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    /* albumBox가 1개일 때 */
    .albumBox-count-1 {
        position: absolute;
        width: 100%;
        height: 100%;
        min-height: 160px;
        z-index: 2;
        transform: translate(0%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 0%) scale(1.03);
            z-index: 3;
        }
    }

    /* albumBox가 2개일 때 */
    .albumBox-count-2.albumBox-idx-1 {
        position: absolute;
        width: 80%;
        height: 90%;
        left: 0;
        top: 10%;
        z-index: 1;
        transform: translate(0%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 0%) scale(1.03);
            z-index: 3;
        }
    }
    .albumBox-count-2.albumBox-idx-2 {
        position: absolute;
        width: 80%;
        height: 90%;
        left: 20%;
        top: 0;
        z-index: 0;
        transform: translate(0%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 0%) scale(1.03);
            z-index: 3;
        }
    }

    /* albumBox가 3개일 때*/
    .albumBox-count-3.albumBox-idx-1 {
        position: absolute;
        width: 70%;
        height: 85%;
        z-index: 2;
        transform: translate(0%, 18%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(0%, 18%) scale(1.03);
            z-index: 3;
        }
    }
    .albumBox-count-3.albumBox-idx-2 {
        position: absolute;
        width: 70%;
        height: 85%;
        z-index: 1;
        transform: translate(20%, 9%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(20%, 9%) scale(1.03);
            z-index: 3;
        }
    }
    .albumBox-count-3.albumBox-idx-3 {
        position: absolute;
        width: 70%;
        height: 85%;
        z-index: 0;
        transform: translate(40%, 0%);
        transition: transform 0.3s, box-shadow 0.3s, z-index 0.3s;
        &:hover {
            transform: translate(40%, 0%) scale(1.03);
            z-index: 3;
        }
    }
`;

export const SNoAlbum = css`
    position: rez;
    width: 100%;
    height: 100%;
    min-height: 160px;
    border: 1px dashed #aaa;
    border-radius: 20px;
    color: #888;
    font-size: 1.1rem;
    cursor: pointer;
`;
