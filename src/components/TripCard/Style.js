import { css } from "@emotion/react";

export const SLayout = css`
    position: relative;
    margin: auto;
    border: 2px solid #dbdbdb;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
    max-width: 220px;
	height: 100%;
    aspect-ratio: 1 / 1; /* 정사각형 비율 유지*/
    cursor: pointer;
`;

export const SHeader = css`
    display: flex;
    justify-content: center; /* 좌우 끝 정렬 */
	margin-bottom: 10px;
    align-items: center;
    position: relative;
    width: 100%;
	height: 28px;
`;

export const SHostBox = css`
    display: flex;
    justify-content: center;
    align-items: center;

    .host {
        font-size: 14px;
        background-color: #365267;
        color: white;
        border-radius: 10px;
        padding: 5px;
        margin-right: 5px;
    }

    span {
        font-weight: 600;
    }
`;

export const SDday = css`
    border-radius: 20px;
    background-color: #365267;
    color: white;
    width: 70px;
	height: 100%;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
`;

export const SBody = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	height: calc(100% - 38px);
	
	.active {
		padding: 0px 5px;
	}
	.none {
		padding: 20px 5px;
	}
`;

export const STitle =  css`
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
`;

export const SLocation = css`
    padding: 5px;
    text-align: center;
`;

export const SDateRange = css`
    padding: 5px;
    font-size: 12px;
`;

export const SButtonGroup = css`
    width: 100%;
	display: flex;
	justify-content: space-between;

    button {
        border-radius: 10px;
        width: 47%;
		height: 30px;
		color: white;
		font-weight: 600;
    }
	
	.acceptBtn {
		background-color:rgb(81, 130, 255);
		&:hover {
			background-color:rgb(61, 116, 255);
		}
	}

	.declineBtn {
		background-color:rgb(255, 81, 81);
		&:hover {
			background-color:rgb(255, 42, 42);
		}
	}
`;
