import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { IoSearch } from "react-icons/io5";

function SearchInput({ placeholder, onSearch, setIsShow }) {
    const [searchValue, setSearchValue] = useState(null);

    const handleChange = (e) => {
        setSearchValue(e.target.value); // 입력값 업데이트
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchBtn(); // Enter 키 누르면 검색 실행
			setIsShow(true);
        }
    };

    const handleSearchBtn = () => {
        onSearch(searchValue);
    };

    const handleFocus = () => {
        setIsShow(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsShow(false);
        }, 100);
    };

    return (
        <div css={S.SSearchBox}>
            <input
                css={S.SInput}
                type="search"
                value={searchValue}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={handleFocus}
				onBlur={handleBlur}
            />
            <button css={S.SButton} onClick={handleSearchBtn}>
                <IoSearch />
            </button>
        </div>
    );
}

export default SearchInput;
