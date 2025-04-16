import { css } from "@emotion/react";
import image from "../../../assets/w1.jpg";

export const SLayout = css`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    background-image: url(${image});
    background-size: cover; /* 이미지가 꽉 차도록 */
    background-position: center; /* 가운데 정렬 */
    background-repeat: no-repeat; /* 반복 안 되게 */
    height: 135px;
    * {
        color: white;
    }
`;

export const STitle = css`
    display: flex;
    font-size: 28px;
    font-weight: 600;
    span {
        margin-top: 6px;
    }
`;

export const SInput = css`
    font-size: 28px;
    font-weight: 600;
    margin: 0;
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 0;
    background: transparent;
    outline: none;
    width: 100%;
`;

export const STripDes = css`
    margin-bottom: 5px;
    font-size: 20px;
`;

export const SDateBox = css`
    display: flex;
    justify-content: space-between;
    button {
        font-size: 16px;
        line-height: 14px;
    }
`;
