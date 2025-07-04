import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import emptyIcon from '../../assets/empty-icon.png'; // ✅ default import로 수정

function EmptyState({ message, buttonLabel, onButtonClick }) {
    return (
        <div css={S.SLayout}>
            <img src={emptyIcon} alt="empty state icon" />
            <p>{message}</p>
            {buttonLabel && onButtonClick && (
                <button onClick={onButtonClick}>{buttonLabel}</button>
            )}
        </div>
    );
}

export default EmptyState;