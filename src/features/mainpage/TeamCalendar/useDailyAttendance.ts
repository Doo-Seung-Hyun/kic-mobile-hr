import {useEffect, useState} from 'react';
import {addBusinessDays, format} from "date-fns";
import type {AttendanceData} from "../../../types/attendanceData.ts";



const tempDate = format(new Date(), 'yyyyMMdd');
const tempNextDate = format(addBusinessDays(new Date(),1), 'yyyyMMdd');
const tempPrevDate = format(addBusinessDays(new Date(),-1), 'yyyyMMdd');

const mockData:AttendanceData[] = [
    {
        empNm : '두승현',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '4급',
        ymd : tempDate,
        _seq : 1,
        workStartTime: 9,
        workEndTime: 18,
        familyTimeTypeCd : '20'
    },{
        empNm : '최민수',
        empNo : '2220115',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempDate,
        _seq : 2,
        workStartTime: 9,
        workEndTime: 18,
        familyTimeTypeCd : '20'
    },{
        empNm : '두승현',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '4급',
        ymd : tempPrevDate,
        _seq : 1,
        workStartTime: 8,
        workEndTime: 17,
        isHalfDayLeave : true,
        halfDayType: 'PM',
        leaveTitleNm : '오후반차',
        remark : '8:00-12:00',
        leaveStaYmd : tempPrevDate,
        leaveEndYmd : tempPrevDate
    },{
        empNm : '양용원',
        empNo : '2220105',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempPrevDate,
        workStartTime: 9,
        workEndTime: 18,
        familyTimeTypeCd : '20',
        _seq : 1
    },{
        empNm : '최민수',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempPrevDate,
        workStartTime: 9,
        workEndTime: 18,
        _seq : 2,
        leaveTitleNm : '대체휴가',
        leaveStaYmd : tempPrevDate,
        leaveEndYmd : tempPrevDate
    },{
        empNm : '두승현',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '4급',
        ymd : tempNextDate,
        workStartTime: 9,
        workEndTime: 18,
        familyTimeTypeCd : '30',
        _seq : 1
    },{
        empNm : '양용원',
        empNo : '2220105',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempNextDate,
        _seq : 1,
        workStartTime: 8,
        workEndTime: 17,
        leaveTitleNm : '연차휴가',
        leaveStaYmd : tempNextDate,
        leaveEndYmd : tempNextDate
    },
];

const getTeamAttendanceList = (
    date: string,
    orgId: string
) => {
    return mockData.filter(data => data.ymd===date);
}

const useDailyAttendance = (selectedDate: string, orgId: string) => {

    const [attendanceList, setAttendanceList] = useState<AttendanceData[]>([]);

    useEffect(() => {
        const getAttendanceList = (date:string, orgId:string) =>{
            setAttendanceList(getTeamAttendanceList(date, orgId))
        }

        getAttendanceList(selectedDate, orgId)
    }, [selectedDate, orgId]);

    return attendanceList;
};

export default useDailyAttendance;