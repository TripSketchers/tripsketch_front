import { css } from "@emotion/react";

export const SLayout = css`
    /*
 * Baseline styles
 */
    /* 전체 레이아웃을 화면 중앙 정렬 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* 화면 전체 높이 */

    .loading {
        text-align: center;
    }

    h2 {
        color: #ccc;
        margin: 0;
        font: 0.8em verdana;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    /*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
    .loading span {
        display: inline-block;
        vertical-align: middle;
        width: 0.6em;
        height: 0.6em;
        margin: 0.19em;
        background: #cdffd8;
        border-radius: 0.6em;
        animation: loading 1s infinite alternate;
    }

    /*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
    .loading span:nth-of-type(2) {
        background: #c1f0e1;
        animation-delay: 0.2s;
    }
    .loading span:nth-of-type(3) {
        background: #b9e6e5;
        animation-delay: 0.4s;
    }
    .loading span:nth-of-type(4) {
        background: #b0dcec;
        animation-delay: 0.6s;
    }
    .loading span:nth-of-type(5) {
        background: #a6d0f2;
        animation-delay: 0.8s;
    }
    .loading span:nth-of-type(6) {
        background: #9fc7f7;
        animation-delay: 1s;
    }
    .loading span:nth-of-type(7) {
        background: #94b9ff;
        animation-delay: 1.2s;
    }

    /*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
    @keyframes loading {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;
