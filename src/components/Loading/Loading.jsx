import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function Loading(props) {
    return (
        <div css={S.SLayout}>
            <DotLottieReact
                src="https://lottie.host/4affde3c-24b1-4c33-9578-efd0c49a09f0/7hm1WPjAYB.lottie"
                loop
                autoplay
                css={S.SContainer}
            />
        </div>
    );
}

export default Loading;
