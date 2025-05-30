import { css } from "@emotion/react";

export const STitle = css`
    font-size: 20px;
    font-weight: 600;
    width: 400px;
`;

export const SInputContainer = css`
    width: 400px;
    flex-wrap: wrap;
    display: flex;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 2px 10px;
    margin: 10px 0;

    .email-tag {
        display: flex;
        align-items: center;
        background-color: #e5e7eb;
        border-radius: 20px;
        padding: 4px 10px;
        margin: 4px 6px 4px 0;
        font-size: 14px;
    }

    input {
        flex-grow: 1;
        min-width: 160px;
        border: none;
        outline: none;
        font-size: 14px;
        padding: 4px;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #fff inset;
        -webkit-text-fill-color: #000;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }
`;

export const STextArea = css`
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 7px;
    resize: none;
    width: 100%;
    height: 100px;
`;

export const SButtonGroup = css`
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-top: 5px;

    button {
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background-color: #dbdbdb;
        }
    }

    .sendBtn {
        background-color: #5c86b3;
        color: white;
        &:hover {
            background-color: #4a6f9c;
        }
    }
`;

export const SMessage = css`
    font-size: 14px;
    color: #555;
`;

export const SSharedUsersContainer = css`
    margin-top: 20px;

    h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    ul {
        list-style-type: none;
        padding: 0;

        .shared-user-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;

            span {
                font-size: 14px;
            }

            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                color: #e53e3e;

                &:hover {
                    color: #c53030;
                }
            }
        }
    }
`;