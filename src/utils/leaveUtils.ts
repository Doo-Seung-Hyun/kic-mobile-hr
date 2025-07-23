import type {HalfLeaveType, LeaveDate} from "../types/leave.ts";

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
 */
export const calculateLeaveDays = (leaveDates:LeaveDate[]) => {
    if(leaveDates.length===1)
        return calculateHalfLeaveDays(leaveDates[0].halfLeaveType);
    return 0;
}