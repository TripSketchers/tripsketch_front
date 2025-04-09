import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays } from "date-fns";
import { ko } from "date-fns/locale";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";

function CustomDatePicker({ dateRange, setDateRange }) {
    const [monthsToShow, setMonthsToShow] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            setMonthsToShow(window.innerWidth < 880 ? 1 : 2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDateChange = ([start, end]) => {
        if (start && !end) {
            setDateRange({ startDate: start, endDate: null });
        } else if (start && end) {
            const diff = differenceInCalendarDays(end, start);
            // 10일 초과 방지는 UI에서 막히므로 여기선 굳이 alert 필요 X
            setDateRange({ startDate: start, endDate: end });
        }
    };

    return (
        <div css={S.SDatePickerWrapper}>
            <ReactDatePicker
                selected={dateRange.startDate}
                onChange={handleDateChange}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                selectsRange
                inline
                monthsShown={monthsToShow}
                locale={ko}
                minDate={new Date()}
                maxDate={
                    dateRange.startDate && !dateRange.endDate
                        ? addDays(dateRange.startDate, 10)
                        : undefined
                }
            />
        </div>
    );
}
export default CustomDatePicker;
