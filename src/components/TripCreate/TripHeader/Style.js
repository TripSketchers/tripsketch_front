import { css } from "@emotion/react";
import image from "../../../assets/w1.jpg";

export const SLayout = css`
	padding: 20px;
	background-image: url(${image});
	background-size: cover; /* 이미지가 꽉 차도록 */
	background-position: center; /* 가운데 정렬 */
	background-repeat: no-repeat; /* 반복 안 되게 */
	* {
		color: white;
	}
`;

export const STitle = css`
	margin-bottom: 30px;
	font-size: 28px;
	font-weight: 600;
`;

export const STripDes = css`
	margin-bottom: 5px;
	font-size: 20px;
`;
