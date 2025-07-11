import type {DateInfo} from "./calendar.ts";

export interface LeaveType {
    leaveTypeCode: string;
    leaveTypeName: string;
    leftLeaveDays: number;
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
}

export interface LeaveDate {
    dateInfo : DateInfo;
    halfLeaveType? : HalfLeaveType;
}