import { css } from "@emotion/react";
import colors from "../../constants/color";

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 20px;

    @media (max-width: 1300px) {
        // SRightContainer 위치 조정
        flex-direction: column;
    }

    h3 {
        // 제목
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const SLeftContainer = css`
    flex: 1;
`;

export const SRightContainer = css`
    flex: 0.7;
    max-width: 400px;

    @media (max-width: 1300px) {
        max-width: 100%;
    }

    .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    span {
        font-size: 14px;
    }
`;

export const STripBox = css`
    padding: 4px;
    background-color: ${colors.primaryLightGray};
    border-radius: 1rem;
    overflow: hidden;
`;

export const SUploadButton = css`
    margin-top: 10px;
    border: 3px solid ${colors.primaryButton};
    border-radius: 1rem;
    width: 100%;
    /* background-color: ${colors.primaryButton}; */
    color: ${colors.primaryButton};
    padding: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    height: 100px;

    @media (max-width: 1300px) {
        // SRightContainer 위치 조정
        height: 50px;
    }
`;
