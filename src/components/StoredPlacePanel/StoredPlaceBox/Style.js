import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px;
	border-radius: 10px;
	padding: 10px;
	font-size: 14px;
	background-color: white;
    height: 70px;
	img {
		border-radius: 10px;
		width: 50px;
		height: 50px;
		object-fit: cover;
	}
`;

export const SInputContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    span {
        margin-right: 10px;
    }
`;

export const SInputTime = css`
    border: none;
	padding: 2px;
	font-size: 14px;
	width: 40px;
`;

export const SSaveBtn = css`
    margin-left: 30px;
    border-radius: 10px;
    padding: 5px 10px;
    background-color:rgb(208, 228, 227);
`;

export const SInfoContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
	margin: 0 5px 0 10px;
	width: 65px;
    height: 100%;
	span {
        line-height: 16px;
		font-size: 11px;
		color: #777777;
	}
`;

export const STitle = css`
	margin-bottom: 5px;
	font-size: 14px;
	font-weight: 500;
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const SCategory = css`
	
`;

export const SAddress = css`
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const STimeContainer = css`
	display: flex;
	flex-direction: column;
	& > span {
		font-size: 12px;
		margin-bottom: 5px;
	}
`;

export const STimeBox = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 5px;
	border-radius: 5px;
	padding: 5px;
	font-size: 12px;
	background-color: rgb(230, 230, 230);
    cursor: pointer;
`;

export const SDeleteBtn = css`
	* {
		color: rgb(100, 100, 100);
		:hover {
			color: #e35454;
		}
	}
`;
