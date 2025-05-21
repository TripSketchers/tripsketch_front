import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null; // 한 페이지면 안 보임

    const handleClick = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
		const pages = [];
		const start = Math.max(1, currentPage - 2);
		const end = Math.min(totalPages, currentPage + 2);

		for (let i = start; i <= end; i++) {
			pages.push(
				<button
					key={i}
					css={S.PageNumber(i === currentPage)}
					onClick={() => handleClick(i)}
				>
					{i}
				</button>
			);
		}
		return pages;
	};

	return (
		<div css={S.SLayout}>
			{/* 첫 페이지로 */}
			<button
				css={S.PageButton}
				onClick={() => handleClick(1)}
				disabled={currentPage === 1}
			>
				&#171;
			</button>

			{/* 이전 페이지로 */}
			<button
				css={S.PageButton}
				onClick={() => handleClick(currentPage - 1)}
				disabled={currentPage === 1}
			>
				&#60;
			</button>

			{renderPageNumbers()}

			{/* 다음 페이지로 */}
			<button
				css={S.PageButton}
				onClick={() => handleClick(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				&#62;
			</button>

			{/* 마지막 페이지로 */}
			<button
				css={S.PageButton}
				onClick={() => handleClick(totalPages)}
				disabled={currentPage === totalPages}
			>
				&#187;
			</button>
		</div>
	);
}

export default Pagination;
