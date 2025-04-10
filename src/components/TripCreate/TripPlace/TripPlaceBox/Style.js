import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	border-radius: 20px;
	padding: 10px;
	background-color: white;
	font-size: 14px;
	box-shadow: 4px 4px 5px rgb(183, 201, 206);
	img {
		border-radius: 10px;
		width: 70px;
		height: 70px;
		object-fit: cover;
	}
`;

export const SContainer = css`
	flex: 1;
	margin: 0 10px;
`;

export const STitle = css`
	font-size: 16px;
	font-weight: 600;
`;

export const SInfoBox = css`
	margin: 10px 0;
    font-size: 12px;
    * {
        color: #777777;
    }
`;

export const SCategory = css`
    margin-right: 5px;
`;


export const SLikeBox = css`
	display: flex;
	font-size: 12px;
	* {
        display: flex;
		align-items: center;
		margin-right: 5px;
        color: #777777;
	}
	svg {
		margin-right: 5px;
	}
`;

export const SLike = css`
	path {
		color: rgb(255, 96, 96);
	}
`;

export const SStar = css`
	path {
		color: rgb(255, 207, 64);
	}
`;

export const SButton = css`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	padding: 5px;
	background-color: rgb(224, 235, 236);
	svg {
		font-size: 18px;
	}
`;
