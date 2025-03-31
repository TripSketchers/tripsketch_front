import { css } from '@emotion/react';

export const ViewTypeBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        border: 0;
        border-radius: 10px;
        padding: 10px;
        background-color: #51748b;
    }
`;

export const ViewType = (viewType) =>  css`
    cursor: pointer;
    border-bottom: ${viewType == 1 ? "3px solid #51748b" : "" };
`;

export const SortingBox = css`
    position: relative;
    display: flex;
    justify-content: right;
    top: 20px;
    cursor: pointer;
`;