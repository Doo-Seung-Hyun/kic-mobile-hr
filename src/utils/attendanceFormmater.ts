import {
    type AttendanceData, type FamilyTimeAttendanceData,
    isFamilyTimeAttendance,
    isLeaveAttendance,
    type LeaveAttendanceData
} from "../types/attendanceData.ts";

const getIcon = (attendanceType: 'Leave'|'FamilyTime') =>
    attendanceType==='Leave' ? '🏖️' : '⏰';

const timeFormatter = (time:number)=>{
    const hour = Math.floor(time);
    const min = Math.round((time-hour)*60);
    const minStr = min<10? `0${min}` : String(min);

    return `${hour}:${minStr}`;
}

const dateFormatter = (date:string) => {
    const MM = date.substring(4,6);
    const dd = date.substring(6,8);

    const m = Number(MM);
    const d = Number(dd);

    return `${m}.${d}`;
}

const dateRangeFormatter = (from:string, to:string)=>
    `${dateFormatter(from)} - ${dateFormatter(to)}`;

const getDisplayInfoOfLeaveAttendanceData = ({
    workStartTime,
    workEndTime,
    isHalfDayLeave,
    halfDayType,
    leaveStaYmd,
    leaveEndYmd,
    leaveTitleNm
}:LeaveAttendanceData) => {
    const formatDuration = () => {
        const halfWorkTime = workStartTime + 4 +(workStartTime>8 ? 1:0);

        if(isHalfDayLeave && halfDayType==='AM')
            return `${timeFormatter(workStartTime)} - ${timeFormatter(halfWorkTime)}`;
        else if(isHalfDayLeave && halfDayType==='PM')
            return `${timeFormatter(halfWorkTime)} - ${timeFormatter(workEndTime)}`;
        else if(!isHalfDayLeave && leaveStaYmd === leaveEndYmd)
            return `${dateFormatter(leaveStaYmd)}`;
        else
            return `${dateRangeFormatter(leaveStaYmd,leaveEndYmd)}`

    }
    const icon = getIcon('Leave');
    const displayTexts = [
        leaveTitleNm,
        formatDuration()
    ];

    return {
        icon,
        displayTexts
    }
}

const getFamilyTimeName = (familyTimeTypeCd:string) =>
    familyTimeTypeCd==='20' ? '오전':'오후';

const getDisplayInfoOfFamilyTimeAttendanceData = ({
    workStartTime,
    workEndTime,
    familyTimeTypeCd
}:FamilyTimeAttendanceData) => {
    const formatDuration = () => {
        const startTime = getFamilyTimeName(familyTimeTypeCd)==='오전' ?
            Math.max(8,workStartTime) :
            workEndTime-2;
        const endTime  = getFamilyTimeName(familyTimeTypeCd)==='오전' ?
            10 :
            workEndTime;

        return `${timeFormatter(startTime)} - ${timeFormatter(endTime)}`;
    }

    const icon = getIcon('FamilyTime');
    const displayTexts = [
        getFamilyTimeName(familyTimeTypeCd),
        formatDuration()
    ];

    return {
        icon,
        displayTexts
    }
};

const getDisplayInfoOfAttendanceData = (attendanceData: AttendanceData) => {
    if(isLeaveAttendance(attendanceData)){
        return getDisplayInfoOfLeaveAttendanceData(attendanceData);
    }else if(isFamilyTimeAttendance(attendanceData)){
        return getDisplayInfoOfFamilyTimeAttendanceData(attendanceData);
    }
    return {icon: '', displayTexts: []}
}



export {getDisplayInfoOfAttendanceData};