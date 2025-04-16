import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 10px;
	padding: 10px 0;
	font-size: 14px;
	border-bottom: 1px solid #dbdbdb;
    height: 100px;
	img {
		border-radius: 10px;
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	margin: 0 10px;
	width: 120px;
    height: 100%;
	& span {
        line-height: 14px;
		font-size: 12px;
		color: #777777;
	}
`;

export const STitle = css`
    margin-bottom: 5px;
	font-size: 16px;
	font-weight: 600;
`;

export const SAddress = css`
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const SLikeBox = css`
	display: flex;
	font-size: 12px;
	* {
		display: flex;
		align-items: center;
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
	border-radius: 50%;
	padding: 5px;
	background-color: rgb(188, 224, 228);
	box-shadow: 1px 1px 5px #a7b5b9;
	& * {
		font-size: 18px;
		color: white;
	}
`;
