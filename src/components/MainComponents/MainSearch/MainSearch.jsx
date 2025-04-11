import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import MainImg from '../../../assets/MainImg.jpg'
import { IoSearch } from "react-icons/io5";
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function MainSearch(props) {
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["getPrincipal"]);
    const navigate = useNavigate();

    const [ searchValue, setSearchValue ] = useState(null);
    
    const handleChange = (e) => {
        setSearchValue(e.target.value); // 입력값 업데이트
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchBtn(); // Enter 키 누르면 검색 실행
        }
    };
    
    const handleSearchBtn = () => {
        console.log("검색어:", searchValue); // 검색 버튼 클릭 시 값 출력
    }

    const handleStartBtn = () => {
        navigate('/auth/signin');
    }

    return (
        <div css={S.SLayout}>
            <div css={S.SLeftContainer} >
                <img src={MainImg} />
            </div>
            <div css={S.SRightContainer} >
                <div>
                    <h1>나만의 여행을<br />스케치 해보세요</h1>
                    {principalState?.data?.data ?
                        <div css={S.SSearchBox}>
                            <IoSearch />
                            <input type="search" value={searchValue} placeholder='여행지 검색'
                                onKeyDown={handleKeyDown} onChange={handleChange} />
                            <button onClick={handleSearchBtn}>검색</button>
                        </div>:
                        <button onClick={handleStartBtn}>시작하기</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default MainSearch;