import { css } from "@emotion/react";

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 10%;
`;

export const SContainer = css`
    max-width: 1100px;
    width: 100%;
    height: 100%;
`;

export const STripContainer = css`
    padding: 10px 20px 30px 20px;
`;

export const SHeader = css`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

export const STitleBox = css`
    width: max-content;
    display: flex;
    justify-content: space-between;

    div {
        display: inline-block;
        vertical-align: middle;
        padding: 10px 0;
        margin-right: 20px;
        font-size: 20px;
        font-weight: 500;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        position: relative;
        -webkit-transition-property: color, font-weight;
        transition-property: color, font-weight;
        -webkit-transition-duration: 0.5s;
        transition-duration: 0.5s;
        cursor: pointer;
    }

    .active {
        font-weight: 600;
    }

    div:before {
        content: "";
        position: absolute;

        z-index: -1;
        height: 3px;
        left: 0;
        right: 0;
        bottom: 0;
        background: #5c86b3;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0 50%;
        transform-origin: 0 50%;
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transition-duration: 0.5s;
        transition-duration: 0.5s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
    }

    .active:before {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transition-timing-function: cubic-bezier(
            0.52,
            1.64,
            0.37,
            0.66
        );
        transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    }
`;

export const SFilterBox = css`
    padding: 10px 0;

    ul {
        display: flex;
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        padding: 10px 0;
        transition: color 0.3s;

        &:hover, &.active {
            color: #5c86b3;
            font-weight: 600;
        }
    }
`;

export const STripBox = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 190px);
    gap: 20px;
    justify-content: center;
`;
