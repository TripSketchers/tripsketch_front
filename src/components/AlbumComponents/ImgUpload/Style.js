import { css } from '@emotion/react';
import colors from '../../../constants/color';

export const SLayout = css`
    position: relative;
    width: 100%;
`;

export const STitleContainer = css`
    display: flex;
    justify-content: space-between;
    
    button { color: red; }
`;

export const SContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    border-radius: 1rem;
    background-color: ${colors.primaryLightGray};
`;

export const STopContainer = css`
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;    //사진 메모와의 거리 유지
    border-radius: 1rem;
    padding: 0 50px;
    width: 100%;

    .imgButton {
        position: absolute;
        z-index: 1;
        font-size: 2rem;
        width: 50px;
        height: 400px;
        
        @media (max-width: 1100px) {
            height: 400px;
        }
    }
    .leftButton {
        top: 0;
        left: 0;
    }
    .rightButton {
        top: 0;
        right: 0;
    }
`;

export const SImgBox = css`
    position: relative;
    border-radius: 1rem;
    width: 100%;
    height: 400px;
    overflow: hidden;
    background-color: white;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media (max-width: 1100px) {
        height: 400px;
    }
`;

export const SPhotoDelete = css`
    position: absolute;
    z-index: 2;
    top: 7px;
    right: 7px;
    background-color: transparent;

    path {
        color: #da2a2a;

        :hover {
            color:rgb(255, 56, 56);
        }
    }
`;

export const SAddImg = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 3.5rem;
    cursor: pointer;

    input {
        display: none;
    }
`;

export const SBottomContainer = css`
    margin: 0 50px;
    
    textarea {
        border: 0;
        border-radius: 1rem;
        padding: 10px;
        resize: none;
        width: 100%;
        height: 100px;
    }
`;