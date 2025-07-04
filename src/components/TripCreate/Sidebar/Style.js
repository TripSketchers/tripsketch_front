import { css } from "@emotion/react";
import colors from "../../../constants/color";

export const SLayout = css`
    display: flex;
    align-items: center;
    margin-right: 10px;
    height: 100%;
    transition: width 0.3s ease;
    cursor: pointer;

    &:hover .step-label {
        opacity: 1;
        max-width: 120px;
        margin-left: 10px;
    }
`;

export const SContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 30px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px #a7b5b9;
    height: 100%;

    svg {
        font-size: 28px;
        transition: color 0.3s ease;
    }

    .step-label {
        width: 80px;
        opacity: 0;
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        transition: all 0.3s ease;
    }
`;

export const SBox = (isActive) => css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 20px;
    padding: 15px;
    transition: all 0.3s ease;

	* {
        color: rgb(173, 187, 189);
    }

    ${isActive
        ? ` 
        box-shadow: 0px 0px 10px #a7b5b9;
        background-color: ${colors.mainBlue}; 
        * {
            font-weight: 600;
            color: white;
        }
    `
        : ""};
`;

export const SSaveBtn = css`
	display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 11px;
    transition: all 0.3s ease;
	border: 4px solid ${colors.mainBlue};
	* {
		font-size: 28px;
		font-weight: 600;
		color: ${colors.mainBlue};
	}
`;