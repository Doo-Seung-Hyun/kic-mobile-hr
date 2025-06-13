import React from 'react';
import {type AttendanceData, isLeaveAttendance, type LeaveAttendanceData} from "../../../types/attendanceData.ts";
import {format, parse} from "date-fns";
import {getDisplayInfoOfAttendanceData} from "../../../utils/attendanceFormmater.ts";

interface TeamDailyAttendanceListProps {
    selectedDate: string;
    attendanceList: AttendanceData[];
}

const TeamDailyAttendanceList = ({
    selectedDate,
    attendanceList
}:TeamDailyAttendanceListProps) => {
    const date = parse(selectedDate,'yyyyMMdd',new Date());


    return (
        <div>
            <div>{format(date,'M월 M일')}</div>
            <div>{
                attendanceList.sort((a,b)=>{
                    const isALeave = isLeaveAttendance(a);
                    const isBLeave = isLeaveAttendance(b);

                    if(isALeave && !isBLeave) return -1;
                    if(!isALeave && isBLeave) return 1;

                    return a._seq - b._seq;
                }).map(attendanceData=> {
                    const {
                        icon,
                        displayTexts
                    } = getDisplayInfoOfAttendanceData(attendanceData);
                    return (
                    <div>
                        <span>{icon}</span>
                        <div>
                            <div>
                                <span>{attendanceData.empNm}</span>
                                <span>{attendanceData.posGrdNm}</span>
                            </div>
                            <div>
                                {displayTexts.map(displayText=>
                                    <span>{displayText}</span>
                                )}
                            </div>
                        </div>
                    </div>);
                })
            }</div>
        </div>
    );
};

export default TeamDailyAttendanceList;