import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function Loading({ content }) {
    return (
        <div css={S.SLayout}>
            <div class="loading">
                <h2>{content || "로딩 중입니다. 잠시만 기다려주세요."}</h2>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Loading;
