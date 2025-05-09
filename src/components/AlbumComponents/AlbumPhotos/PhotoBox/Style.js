import { css, keyframes } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const SAlbumContainer = css`
    margin-bottom: 15px;
`;

export const SSelectMode = css`
    position: relative;
    display: flex;
    align-items: center;
    button {
        font-size: 16px;
    }
`;

export const SScheduleBox = css`
    span {
        font-weight: 600;
    }
`;

export const SAlbumBox = css`
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 174px); /* 기본 5개 */
    margin-top: 10px;
`;

export const SAlbumImgBox = css`
    position: relative;
    border-radius: 1rem;
    background-color: transparent;
    height: 174px;
    overflow: hidden;
`;

export const shimmer = keyframes`
  0% { background-color: #eee; }
  50% { background-color: #ddd; }
  100% { background-color: #eee; }
`;

export const wrapper = css`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const placeholder = css`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    animation: ${shimmer} 0.7s infinite;
`;

export const image = (isLoaded) => css`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    opacity: ${isLoaded ? 1 : 0};
    transition: opacity 0.5s ease;
    position: relative;
`;

export const SImgCheckBox = css`
    position: absolute;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    z-index: 1;
`;

