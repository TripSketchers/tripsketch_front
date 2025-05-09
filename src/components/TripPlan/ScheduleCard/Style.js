import { css } from '@emotion/react';

export const SCard = css`
	position: absolute;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #dbdbdb;
	border-left: 4px solid #1890ff;
	padding: 0 8px;
	background-color: white;
	width: 100%;
`;

export const SCompactText = css`
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 163px;
	span {
		font-weight: bold;
		margin-right: 3px;
	}
`;

export const SContainer = css`
	display: flex;
	flex-direction: column;
`;

export const SCardTime = css`
	font-size: 12px;
	font-weight: bold;
	color: #333;
	margin-bottom: 5px;
	span {
		margin-left: 5px;
		font-weight: 400;
		color:rgb(100, 100, 100);
	}
`;

export const SCardLabel = css`
	font-size: 14px;
	font-weight: 500;
	width: 160px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const SLocked = css`
	font-size: 14px;
	cursor: pointer;

	* {
		color: rgb(100, 100, 100);
	}
`;

export const SBubbleEditor = css`
	position: absolute;
	top: calc(100% + 5px);
	left: 0;
	margin-top: 8px;
	padding: 12px;
	background: #ffffff;
	border-radius: 12px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
	z-index: 30;
	width: 98%;

	display: flex;
	flex-direction: column;
	gap: 10px;

	&::before {
		content: "";
		position: absolute;
		top: -8px;
		left: calc(50% - 8px);
		border-width: 0 8px 8px 8px;
		border-style: solid;
		border-color: transparent transparent #ffffff transparent;
	}

	label {
		font-size: 12px;
		font-weight: 600;
		color: #444;
	}

	input {
		font-size: 13px;
		padding: 6px 8px;
		border: 1px solid #ddd;
		border-radius: 6px;
		outline: none;

		&:focus {
			border-color: #007aff;
			box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
		}
	}

	button {
		margin-top: 6px;
		padding: 6px 10px;
		background-color: #007aff;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 13px;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: #005fcc;
		}
	}
`;
