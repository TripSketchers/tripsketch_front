import { css } from "@emotion/react";

export const SLayout = (image) => css`
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
        text-shadow: 0 0 4px rgba(0, 0, 0, 1.0);
        font-weight: 600;
    }
`;

export const STitle = (isEditing) => css`
    display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
    font-size: 28px;
    padding-top: ${isEditing ? "0" : "6px"};
`;

export const SInput = css`
    font-size: 28px;
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
