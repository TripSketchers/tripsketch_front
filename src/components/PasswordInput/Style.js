import { css } from '@emotion/react';

export const SInputWrapper = css`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`;

export const SInputStyle = css`
    flex: 1;
    width: 100%;
    padding: 10px 40px 10px 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:disabled {
        background-color: #f5f5f5;
        color: #999;
        cursor: not-allowed;
    }
`;

export const SIconStyle = css`
    cursor: pointer;
    position: absolute;
    right: 10px;

    & * {
        color: rgb(141, 141, 141);
        font-size: 18px;
    }

    :disabled {
        pointer-events: none; /* 아이콘 클릭 비활성화 */
        opacity: 0.5;
    }
`;
