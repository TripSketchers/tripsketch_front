import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const STitle = css`
    font-size: 22px;
    font-weight: 600;
    width: 400px;
    margin-bottom: 20px;
`;

export const SContainer = css`
    background-color: ${colors.primaryLightGray};
    border-radius: 10px;

    & h3 {
        font-size: 18px;
        font-weight: 500;
        padding: 10px 0;
    }
`;

export const SBox = css`
    display: flex;
    margin-bottom: 20px;
    padding: 10px;
    gap: 0 10px;
    justify-content: space-between;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    
    .dateBox {
        flex: 1;
    }

    .placeBox {
        flex: 4;
        text-align: center;
        text-overflow: ellipsis;
    }
`;

export const SButton = css`
    button {
        width: 60px;
        height: 40px;
        border-radius: 10px;
        color: white;
        font-size: 16px;
    }

    .cancelBtn {
        margin-right: 10px;
        background-color: ${colors.primaryCancelButton};
        :hover {
            background-color: ${colors.primaryCancelButtonHover};
        }
    }

    .editBtn {
        background-color: ${colors.primaryButton};
        :hover {
            background-color: ${colors.primaryButtonHover};
        }
    }
`;