/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import colors from "../../../../constants/color";

export const SDatePickerWrapper = css`
    .react-datepicker__navigation {
        align-items: normal;
    }
    .react-datepicker__navigation-icon {
        font-size: 30px;
    }
    .react-datepicker__navigation--next {
        top: 20px;
        right: 10px;
    }
    .react-datepicker__navigation--previous {
        top: 20px;
        left: 10px;
    }
    .react-datepicker {
        border: none;
    }
    .react-datepicker__header {
        border: none;
        background-color: #ffffff00;
    }
    .react-datepicker__month-container {
        margin: 10px;
    }
    .react-datepicker__current-month {
        font-size: 18px;
        margin-bottom: 10px;
    }
    .react-datepicker__day-names {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    .react-datepicker__week {
        display: flex;
    }
    .react-datepicker__day--keyboard-selected:not([aria-disabled="true"]),
    .react-datepicker__day--keyboard-selected:not(
            [aria-disabled="true"]
        ):hover {
        background-color: #ffffff00;
    }
    .react-datepicker__day:not([aria-disabled="true"]):hover {
        background-color: #f0f0f0;
    }
    .react-datepicker__day--in-range {
        background-color: ${colors.mainLightBlue} !important;
        color: white;
    }
    .react-datepicker__day--range-start,
    .react-datepicker__day--range-end {
        background-color: ${colors.mainBlue} !important;
        color: white;
    }
    .react-datepicker__day--selected:not([aria-disabled="true"]):hover,
    .react-datepicker__day--in-selecting-range:not(
            [aria-disabled="true"]
        ):hover {
        background-color: ${colors.mainBlue};
    }

    .react-datepicker__day--in-range:not([aria-disabled="true"]):hover {
        background-color: ${colors.mainBlue};
    }
    .react-datepicker__day--in-selecting-range:not(
            .react-datepicker__day--in-range,
            .react-datepicker__month-text--in-range,
            .react-datepicker__quarter-text--in-range,
            .react-datepicker__year-text--in-range
        ) {
        background-color: ${colors.mainLightBlue};
        color: #444;
    }
    .react-datepicker__day--outside-month,
    .react-datepicker__day--outside-month:hover {
        background-color: #ffffff00 !important;
        cursor: default;
        color: white;
    }
`;
