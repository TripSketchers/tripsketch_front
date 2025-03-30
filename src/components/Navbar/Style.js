import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

export const SNav = css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 40px;
`;

export const SNavItem = (currentPath) => css`
    display: flex;
    align-items: center;
    border-bottom: ${currentPath ? "5px solid white" : "0" };
    border-radius: 5px 5px 0 0;
    padding: 2px 25px 0 25px;
    height: ${currentPath ? "50px" : "40px"};
    background-color: ${currentPath ? "white" : "#51748b"};
    font-size: 18px;
    box-shadow: 1px -3px 3px rgba(0,0,0,0.3);
    z-index: ${currentPath ? "3" : "1"};
`;