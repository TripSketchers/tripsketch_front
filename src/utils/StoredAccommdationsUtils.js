import { addDays, format, parseISO, eachDayOfInterval } from "date-fns";

/**
 * 유틸: place 객체에서 일관된 ID 추출
 */
function getPlaceId(place) {
    return place?.googlePlaceId || place?.id || place?.place_id || null;
}

/**
 * storedAccommodations Map을 배열로 변환하면서,
 * 특정 날짜(dateToRemove)에 해당하는 숙소를 제거하고,
 * 연속된 숙박 날짜는 하나의 객체로 병합합니다.
 *
 * @param {Object} accommodationMap - 날짜별 숙소 저장 객체 { [dateStr]: place }
 * @param {string} [dateToRemove] - 제거할 날짜 (예: "2025-05-14"), 없으면 전체 변환만 수행
 * @returns {Array} - [{ place, checkInDate, checkOutDate }, ...]
 */
export function convertStoredAccommodationMapToArray(
    accommodationMap,
    dateToRemove
) {
    // ✅ 날짜-숙소 쌍을 배열로 변환, 제거할 날짜는 제외
    const dateEntries = Object.entries(accommodationMap)
        .filter(([date]) => date !== dateToRemove) // ❌ 제거 대상 날짜 제외
        .sort(([a], [b]) => new Date(a) - new Date(b)); // 📅 날짜 오름차순 정렬

    const grouped = []; // 최종 결과 (숙소 묶음들)
    let current = null; // 현재 묶고 있는 숙소 정보

    for (let i = 0; i < dateEntries.length; i++) {
        const [dateStr, place] = dateEntries[i];
        const date = parseISO(dateStr); // 문자열 → 날짜 객체로 파싱

        if (!current) {
            // ✅ 첫 번째 항목이거나, 새 묶음을 시작하는 경우
            current = {
                place,
                checkInDate: dateStr,
                checkOutDate: format(addDays(date, 1), "yyyy-MM-dd"), // 하루 뒤로 설정
            };
        } else {
            const prevCheckOut = parseISO(current.checkOutDate); // 이전 묶음의 종료일
            const isConsecutive =
                format(date, "yyyy-MM-dd") ===
                format(prevCheckOut, "yyyy-MM-dd");

            // place 비교를 위해 일관된 키 사용
            const prevPlaceId = getPlaceId(current.place);
            const placeId = getPlaceId(place);
            const isSamePlace =
                placeId && prevPlaceId && placeId === prevPlaceId;

            if (isConsecutive && isSamePlace) {
                // ✅ 같은 숙소 + 연속 날짜 → 하나의 묶음으로 연결
                current.checkOutDate = format(addDays(date, 1), "yyyy-MM-dd");
            } else {
                // 🔄 장소가 다르거나 날짜가 끊기면 → 현재 묶음 종료
                grouped.push(current);

                // 새로운 묶음 시작
                current = {
                    place,
                    checkInDate: dateStr,
                    checkOutDate: format(addDays(date, 1), "yyyy-MM-dd"),
                };
            }
        }
    }

    // ✅ 마지막 묶음이 남아 있다면 결과에 추가
    if (current) grouped.push(current);

    return grouped;
}

/**
 * 서버에서 받아온 [{ place, checkInDate, checkOutDate }, ...] 데이터를
 * 프론트에서 사용하던 날짜별 Map 형태로 변환.
 *
 * @param {Array} accommodations - 서버 응답 데이터
 * @returns {Object} - { "yyyy-MM-dd": place, ... }
 */
export function convertArrayToAccommodationMap(accommodations) {
    const map = {};

    accommodations.forEach(({ place, checkInDate, checkOutDate }) => {
        const start = parseISO(checkInDate);
        const end = parseISO(checkOutDate);

        const stayDates = eachDayOfInterval({
            start,
            end: addDays(end, -1), // checkOutDate는 마지막 날 포함 안 하니까 -1
        });

        stayDates.forEach((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            map[dateStr] = place;
        });
    });

    return map;
}
