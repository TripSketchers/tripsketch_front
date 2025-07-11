import { css, keyframes } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const SAlbumImgBox = css`
    position: relative;
    border-radius: 1rem;
    background-color: transparent;
    height: 174px;
    overflow: hidden;
    cursor: pointer;
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

