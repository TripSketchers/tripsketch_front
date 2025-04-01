import { css } from '@emotion/react';

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 5%;
    padding: 0 50px;
`;

export const SProfileContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px;
`;

export const SUser = css`
    padding: 10px 0 5px;
`;

export const SLeaveBtn = css`
    color:rgb(226, 71, 71);
    font-size: 12px;
`;

export const SProfile = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    background-color:rgb(245, 245, 245);
    img {
        padding: 10px;
        width: 100%;
        height: 100%;
    }
`;

export const SEditContainer = css`
    width: 100%;
    max-width: 800px;
    padding: 10px 20px;
`;

export const STitleBox = css`
    margin-bottom: 30px;
    border-bottom: 4px solid #5C86B3;
    padding: 10px 0;
    width: max-content;
    h1 {
        font-size: 22px;
        font-weight: 600;
    }
`;

export const SFormBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const SRow = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
    font-size: 14px;

    *:first-child {
        width: 20%;
        min-width: 85px;
    }

    *:nth-child(2) {
        padding: 8px;
        width: 50%;
        min-width: 150px;
    }

    *:last-child {
        width: 20%;
        min-width: 85px;
    }

    button {
        white-space: nowrap;
        border-radius: 10px;
        padding: 8px;
        background-color:rgb(196, 217, 239);
        
        :active {
            background-color:rgb(164, 186, 209);
        }
    }
`;

export const SSubmitBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    button {
        width: 40%;
        padding: 12px;
        margin-top: 30px;
        font-size: 16px;
        background-color:rgb(59, 92, 128);
        color: white;
        border: none;
        border-radius: 6px;
    }
`;
