import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { IoMdMore } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function TripCard({ dDay, title, location, dateRange }) {
    return (
        <div css={S.SLayout}>
            <div css={S.SHeader}>
                <div css={S.SDday}>{dDay}</div>
                <button css={S.SMenu}><IoMdMore /></button>
            </div>
            <h2 css={S.STitle}>{title}</h2>
            <div css={S.SLocation}>{location}</div>
            <div css={S.SDateRange}>{dateRange}</div>
        </div>
    );
}

export default TripCard;