import { css } from '@emotion/react';

export const SBubbleEditor = css`
	position: absolute;
	top: calc(100% + 5px);
	left: 0;
	margin-top: 8px;
	padding: 12px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 50;
	display: flex;
	flex-direction: column;

    /* ✅ 말풍선 꼬리 추가 */
	&::before {
		content: "";
		position: absolute;
		top: -8px;
		left: calc(50% - 8px);
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid #fff; /* 말풍선 배경색과 동일 */
	}

    label {
        font-weight: bold;
        font-size: 14px;
        margin: 8px 0 4px 0;
    }

	input[type="time"],
	input[type="number"] {
		padding: 4px 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 12px;
	}

	button {
		align-self: center;
        margin-top: 8px;
		padding: 5px 20px;
		background-color: #1890ff;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: #1476cc;
		}
	}
`;

export const SEditorRow = css`
	display: flex;
	gap: 6px;
	align-items: center;
`;

export const STimeInput = css`
	width: 50px;
`;
