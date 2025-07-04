import { css } from "@emotion/react";
import colors from "../../constants/color";

export const SLayout = css`
    display: flex;
    padding: 40px;
    width: 100%;
    height: calc(100vh - 100px);
    overflow: hidden;
    background-color: #f1f4fb;
`;

export const SContainer = css`
    display: flex;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0px 0px 10px #a7b5b9;
`;
