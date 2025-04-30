import { css } from "@emotion/react";

export const SPanelWrapper = css`
    position: relative;
`;

export const SMenu = css`
	position: absolute;
	top: 0px;
	right: -10px;
    z-index: 2;
    
	* {
		font-size: 26px;
	}
`;

export const STogglePanel = css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0px;
    right: -80px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 10px #dbdbdb;
    z-index: 2;
    overflow: hidden;
    div:first-of-type {
        border-bottom: 1px solid #dbdbdb;
    }
`;

export const SToggleMenu = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    svg {
        margin-right: 8px;
        font-size: 14px;
    }
    span {
        font-size: 14px;
    }
    :hover {
        background-color:rgb(239, 239, 239);
    }
`;