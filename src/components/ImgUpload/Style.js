import { css } from '@emotion/react';

export const SLayout = css`
    position: relative;

    & > div {
        display: flex;
        justify-content: center;
    }
`;

export const SContainer = css`
    display: grid;
    grid-template-columns: repeat(2 , 1fr); // 4개 열로 나누기
    grid-template-rows: repeat(2, 1fr);
    gap: 5px;
    padding: 10px 0;
    width: 100%;
    max-width: 380px;

    img {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1100px) {
        max-width: 80%;
    }
`;

export const ButtonBox = css`
    text-align: center;
`;