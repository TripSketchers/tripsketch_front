import { css } from '@emotion/react';
import colors from '../../constants/color';

export const SLayout = css`
    border-radius: 20px;
    border: 1px solid ${colors.mainBlue};
    background: ${colors.mainBlue};
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;