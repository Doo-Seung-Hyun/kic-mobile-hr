import type {HalfLeaveType, LeaveDate} from "../types/leave.ts";
import {eachDayOfInterval, format} from "date-fns";

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
 * 휴가 기간에 대해 휴가일수
 * @param leaveDates
 * @param excludeDates
 */
export const calculateBusinessLeaveDays = (
    leaveDates:LeaveDate[],
    excludeDates?: string[],
) => {
    const allDates = eachDayOfInterval({
        start:leaveDates[0].dateInfo.date,
        end: leaveDates[1].dateInfo.date,
    });
    const businessDates = allDates.filter((date) => {
        return date.getDay()!==0 && date.getDay()!==6
            && !excludeDates?.some(excludeDate => excludeDate === format(date, "yyyyMMdd"))
    })
    if(!businessDates.length) {
        return 0;
    }
    else if(businessDates.length===1) {
        if(leaveDates.length===1)
            return calculateHalfLeaveDays(leaveDates[0].halfLeaveType);
        else
            return calculateHalfLeaveDays(leaveDates[1].halfLeaveType);
    }
    return 0;
}