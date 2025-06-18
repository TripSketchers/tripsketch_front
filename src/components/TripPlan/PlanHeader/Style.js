import { css } from "@emotion/react";

export const SLayout = (img) => css`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	background-image: url(${img});
	background-size: cover; /* 이미지가 꽉 차도록 */
	background-position: center; /* 가운데 정렬 */
	background-repeat: no-repeat; /* 반복 안 되게 */
	width: 100%;
	* {
		color: white;
        text-shadow: 0 0 4px rgba(0, 0, 0, 1.0);
	}
`;

export const SContainer = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	min-width: 250px;
	gap: 10px;
	* {
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden; /* 반복 안 되게 */
		font-size: 20px;
	}
`;

export const STitle = css`
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 28px;
	font-weight: 600;
`;

export const SButton = css`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color:rgb(58, 98, 111);
	font-size: 14px;
	font-weight: 500;
	min-width: 65px;
    height: 100%;
	cursor: pointer;

	& * {
        text-shadow: none;
	}
	svg {
		font-size: 18px;
        margin-right: 5px;
	}
`;
