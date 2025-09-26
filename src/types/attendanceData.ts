import type {BaseAttendanceData} from "../shared/api/types.ts";

export interface LeaveAttendanceData extends BaseAttendanceData{
    isHalfDayLeave? : boolean;
    halfDayType? : 'AM' | 'PM';
    leaveStaYmd : string;
    leaveEndYmd : string;
    leaveTitleNm : string;
    remark? : string;
}

export interface FamilyTimeAttendanceData extends BaseAttendanceData{
    familyTimeTypeCd : '20'|'30';
    familyTimeTypeNm : '오전'|'오후';
}

export type AttendanceData = LeaveAttendanceData | FamilyTimeAttendanceData;

export const isLeaveAttendance =
    (attendanceData:AttendanceData):attendanceData is LeaveAttendanceData =>
        'leaveStaYmd' in attendanceData;

export const isFamilyTimeAttendance =
    (attendanceData:AttendanceData): attendanceData is FamilyTimeAttendanceData =>
        'familyTimeTypeCd' in attendanceData;

