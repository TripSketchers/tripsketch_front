import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 5px;
	border-radius: 10px;
	padding: 10px;
	font-size: 14px;
	box-shadow: 3px -2px 8px rgb(203, 203, 203);
    height: 70px;
	img {
		border-radius: 10px;
		width: 50px;
		height: 50px;
		object-fit: cover;
	}
`;

export const SContainer = css`
	display: flex;
`;

export const SInfoContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
	margin: 0 5px 0 10px;
	width: 75px;
    height: 100%;
	span {
        line-height: 16px;
		font-size: 11px;
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

const colorMap = {
	명소: "#4CAF50",   // 초록
	맛집: "#FF5722",   // 주황
	카페: "#9C27B0",   // 보라
	숙소: "#2196F3",   // 파랑
};


export const SCategory = (category) => css`
	color: ${colorMap[category]};
`;

export const SAddress = css`
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	color: #777777;
`;

export const STimeContainer = css`
	display: flex;
	justify-content: center;
	align-items: center;
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
