import { css } from '@emotion/react';

export const SLayout = css`
    border-radius: 20px;
    border: 1px solid rgb(44,195,185);
    background: rgb(44,195,185);
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;