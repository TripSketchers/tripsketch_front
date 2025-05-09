import { css } from "@emotion/react";

export const SLayout = css`
	display: flex;
	flex-direction: column;
	min-width: 300px;
	height: 100%;
	h1 {
		font-size: 18px;
		font-weight: 500;
	}
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
	padding: 10px;
	flex: 1;
	height: 100%;
`;

export const STitleBox = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		border-radius: 8px;
		padding: 4px 8px;
		background-color:rgb(87, 87, 87);
		color: white;
		* {
			color: white;
		}
	}
`;

export const SHeader = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 0;
	button {
		color: #e35454;
	}
`;

export const SStoredNum = css`
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		margin-left: 5px;
	}
`;

export const SDate = css`
	margin-top: 10px;
	padding: 0 10px;
	font-size: 14px;
`;

export const SContentBox = css`
	flex: 1;
	height: 100%;
	overflow-y: auto;
`;
