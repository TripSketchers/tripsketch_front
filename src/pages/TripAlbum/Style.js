import { css } from '@emotion/react';

export const SLayout = css`
    position: relative;
    top: -2px;

    display: flex;
    justify-content: center;
    
    & > div {
        margin: 0 20%;
        border-radius: 10px;
        padding: 30px 40px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
        background-color: white;
        
        width: 100%;
        min-width: 430px;
    }
    
    h1 {
        font-size: 30px;
        font-weight: 600;
    }
`;


export const SViewTypeBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    a { // 사진 업로드 버튼
        border: 0;
        border-radius: 3rem;
        padding: 10px;
        background-color: #51748b;
        color: white;
    } 

    .switches-container {
        width: 12rem;
        position: relative;
        display: flex;
        padding: 0;
        background: #51748b;
        line-height: 2rem;
        border-radius: 3rem;
    }

    .switches-container input {
        visibility: hidden;
        position: absolute;
        top: 0;
    }

    .switches-container label {
        width: 50%;
        padding: 0;
        margin: 0;
        text-align: center;
        cursor: pointer;
        color: white;
    }

    // 라벨 클릭 시 슬라이딩 효과를 위한 스위치 래퍼 
    .switch-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50%;
        padding: 0.15rem;
        z-index: 1;
        transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    }

    // 스위치 박스 
    .switch {
        border-radius: 3rem;
        background: white;
        height: 100%;
    }

    // 스위치 내부 텍스트 
    .switch div {
        width: 100%;
        text-align: center;
        opacity: 0;
        display: block;
        color: #51748b;
        transition: opacity 0.2s cubic-bezier(0.77, 0, 0.175, 1) 0.125s;
        position: absolute;
        top: 0;
        left: 0;
    }

    // 전체보기 선택 시 슬라이더 왼쪽으로 
    .switches-container input:nth-of-type(1):checked ~ .switch-wrapper {
        transform: translateX(0%);
    }

    // 폴더별 보기 선택 시 슬라이더 오른쪽으로 
    .switches-container input:nth-of-type(2):checked ~ .switch-wrapper {
        transform: translateX(100%);
    }

    // 전체보기 선택 시 텍스트 보여주기 
    .switches-container input:nth-of-type(1):checked ~ .switch-wrapper .switch div:nth-of-type(1) {
        opacity: 1;
    }

    // 폴더별 보기 선택 시 텍스트 보여주기
    .switches-container input:nth-of-type(2):checked ~ .switch-wrapper .switch div:nth-of-type(2) {
        opacity: 1;
    }

`;
export const ViewType = (viewType) =>  css`
    cursor: pointer;
    border-bottom: ${viewType === 1 ? "3px solid #51748b" : "" };
`;
