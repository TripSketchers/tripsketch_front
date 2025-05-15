export const parseTime = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

export const minutesToTime = (totalMinutes) => {
    const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}:00`;
};

export const getAbsoluteMinutes = (dateStr, timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    const totalMinutes = h * 60 + m;
    return totalMinutes < 360 ? totalMinutes + 1440 : totalMinutes;
};

export const findPrevEndTime = (sorted, currentStartAbs) => {
    let prevEnd = 360;
    for (let s of sorted) {
        const sEndAbs = getAbsoluteMinutes(s.date, s.endTime);
        if (sEndAbs >= currentStartAbs) break;
        prevEnd = sEndAbs;
    }
    return prevEnd;
};

export const formatHour = (h) => `${(h <= 24 ? h : h % 24).toString().padStart(2, "0")}:00`