import { css } from '@emotion/react';

export const SWrapper = css`
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

export const SLayout = css`
    display: flex;
    flex: 1;
`;

export const SContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    min-width: 0;
`;

export const STimeColumn = css`
    position: sticky;
    left: 0;
    z-index: 10;
    width: 60px;
    min-width: 60px;
    flex-shrink: 0;
    background-color: #f0f0f0;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SStickyHeaderSpacer = css`
    height: 40px;
    width: 100%;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
`;

export const STimeRow = css`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #ccc;
    font-size: 12px;
    color: #555;
`;
