import type {HalfLeaveType, LeaveDate} from "../types/leave.ts";
import {eachDayOfInterval, format} from "date-fns";
import type {Holiday} from "../types/holiday.ts";

/**
 * 반차 종류별 휴가일수
 * @param halfLeaveType
 */
const calculateHalfLeaveDays = (halfLeaveType?: HalfLeaveType) => {
    if(!halfLeaveType)
        return 1;
    switch(halfLeaveType.dayOffTypeCd) {
        case 'H' :
            return 0.5;
        case 'P' :
            return 0.25;
        default :
            return 1;
    }
}

/**
 * 날짜 기간 내에 실제 영업일수만 계산
 * @param start
 * @param end
 * @param holidays
 */
export const calculateBusinessDays = (start: Date, end: Date, holidays?: Holiday[]) => {
    const businessDates = eachDayOfInterval({start:start, end:end});
    const holidaySet = new Set<string>(holidays?.map(holiday=>holiday.yyyyMMdd));

    return businessDates.filter(date => {
        const dateStr = format(date, "yyyyMMdd");
        return date.getDay() !== 0 &&
            date.getDay() !== 6 &&
            !(holidaySet.has(dateStr));
    }).length;
}

/**
 * 휴가 기간에 대해 휴가일수 계산 (영업일, 공휴일 제외)
 * @param leaveDates
 * @param holidays
 */
export const calculateBusinessLeaveDays = (
    leaveDates:LeaveDate[],
    holidays?: Holiday[],
) => {
    let leaveDays = calculateBusinessDays(
        leaveDates[0].dateInfo.date,
        leaveDates[leaveDates.length===2 ? 1:0].dateInfo.date,
        holidays
    );
    if(leaveDays === 0)
        return leaveDays;

    leaveDays -= (1-calculateHalfLeaveDays(leaveDates[0].halfLeaveType));
    if(leaveDates.length === 2) {
        leaveDays -= (1-calculateHalfLeaveDays(leaveDates[1].halfLeaveType));
    }
    return leaveDays;
}