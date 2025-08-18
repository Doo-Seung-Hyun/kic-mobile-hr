import type {DateInfo} from "../../../types/calendar.ts";

export interface LeaveType {
    leaveTypeCode: string;
    leaveTypeName: string;
}

export interface UserLeaveBalance {
    leaveType : LeaveType
    leftLeaveDays: number;
    totalLeaveDays?: number;
}

export interface HalfLeaveType {
    dayOffTypeCd : 'H' | 'P';
    dayOffTypeCdName : '반차' | '반반차';
    halfLeaveTypeCd : 'A' | 'M' | 'E';
    halfLeaveTypeCdName : string;
}

export interface SelectedLeaveProps {
    dateComponentType : 'todayChip' | 'tomorrowChip'
        | 'dropdownChip' | 'datePicker';
    leaveDates : LeaveDate[];
    leaveDays? : number;
}

export interface LeaveDate {
    dateInfo : DateInfo;
    halfLeaveType? : HalfLeaveType;
}


export interface LeaveApplicationRequest {
    empNo: number;
    leaveType : LeaveType;
    leavePeriodProps : SelectedLeaveProps
    rmk? : string;
}

export interface LeaveApplicationHistoryItem {
    empNo: number;
    leaveType : LeaveType;
    leavePeriodProps : SelectedLeaveProps
    statusCd : string;
    appliedAt : string;
    approvedAt?: string;
    rmk? : string;
}