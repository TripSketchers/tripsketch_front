import { css } from "@emotion/react";
import image from "../../../assets/w1.jpg";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	background-image: url(${image});
	background-size: cover; /* 이미지가 꽉 차도록 */
	background-position: center; /* 가운데 정렬 */
	background-repeat: no-repeat; /* 반복 안 되게 */
	width: 100%;
	* {
		color: white;
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
