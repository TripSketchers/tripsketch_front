import { css } from "@emotion/react";

export const SLayout = css`
    display: flex;
    padding: 40px;
    width: 100%;
    height: calc(100vh - 100px);
    overflow: hidden;
    background-color: rgb(239, 247, 248);

    * {
        ::-webkit-scrollbar {
            width: 14px;
            height: 14px;
        }

        ::-webkit-scrollbar-thumb {
            outline: none;
            border-radius: 10px;
            border: 4px solid transparent;
            box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.15);
        }

        ::-webkit-scrollbar-thumb:hover {
            border: 4px solid transparent;
            box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
        }

        ::-webkit-scrollbar-track {
            box-shadow: none;
            background-color: transparent;
        }
    }
`;

export const SContainer = css`
    display: flex;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0px 0px 10px #a7b5b9;
`;
