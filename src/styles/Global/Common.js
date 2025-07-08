import { css } from "@emotion/react";
import reset from "styled-reset";
/** @jsxImportSource @emotion/react */
import colors from "../../constants/color";

export const Common = css`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: "Spoqa Han Sans Neo", "sans-serif" !important;
        color: #444444;

        ::-webkit-scrollbar {
            width: 14px;
            height: 14px;
        }

        ::-webkit-scrollbar-thumb {
            outline: none;
            border-radius: 10px;
            border: 4px solid transparent;
            box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.15);
            cursor: pointer;
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

    a {
        text-decoration: none;
        cursor: pointer;
    }

    button {
        cursor: pointer;
    }

    button {
        background: inherit;
        border: none;
        box-shadow: none;
        border-radius: 0;
        padding: 0;
        overflow: visible;
        cursor: pointer;
    }

    .my-swal-popup {
        font-family: "Spoqa Han Sans Neo", sans-serif;
        font-size: 16px;
        border-radius: 1.5rem;
        padding: 2rem;
        white-space: pre-line;
    }

    .swal2-icon {
        margin: 0 auto 20px auto; /* 위아래 마진 재조정 */
        transform: none !important; /* 위치 비틀림 제거 */
    }

    .my-swal-confirm {
        background-color: ${colors.primaryButton};
        color: white;

        &:hover {
            background-color:  ${colors.primaryButtonHover};
        }
    }

    .my-swal-cancel {
        background-color: ${colors.primaryCancelButton};
        color: white;

        &:hover {
            background-color:  ${colors.primaryCancelButtonHover};
        }
    }
`;
