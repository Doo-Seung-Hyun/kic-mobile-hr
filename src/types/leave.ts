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