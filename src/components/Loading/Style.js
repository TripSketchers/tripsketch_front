import { css } from "@emotion/react";
import colors  from "../../constants/color";

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
        background: ${colors.loading1};
        border-radius: 0.6em;
        animation: loading 1s infinite alternate;
    }

    /*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
    .loading span:nth-of-type(2) {
        background: ${colors.loading2};
        animation-delay: 0.2s;
    }
    .loading span:nth-of-type(3) {
        background: ${colors.loading3};
        animation-delay: 0.4s;
    }
    .loading span:nth-of-type(4) {
        background: ${colors.loading4};
        animation-delay: 0.6s;
    }
    .loading span:nth-of-type(5) {
        background: ${colors.loading5};
        animation-delay: 0.8s;
    }
    .loading span:nth-of-type(6) {
        background: ${colors.loading6};
        animation-delay: 1s;
    }
    .loading span:nth-of-type(7) {
        background: ${colors.loading7};
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
