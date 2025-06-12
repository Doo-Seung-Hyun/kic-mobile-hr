import React, {useState} from 'react';
import {addBusinessDays, addDays, format} from "date-fns";

interface attendanceData {
    empNo : string,
    empNm : string,
    orgNm : string,
    posGrdNm : string,
    ymd : string,
    leaveStaYmd? : string,
    leaveEndYmd? : string,
    leaveTitleNm? : string,
    remark? : string,
    familyTimeTypeCd? : '20'|'30'
    _seq : number
}

const tempDate = format(new Date(), 'yyyyMMdd');
const tempNextDate = format(addBusinessDays(new Date(),1), 'yyyyMMdd');
const tempPrevDate = format(addBusinessDays(new Date(),-1), 'yyyyMMdd');

const mockData:attendanceData[] = [
    {
        empNm : '두승현',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '4급',
        ymd : tempDate,
        _seq : 1,
        familyTimeTypeCd : '20'
    },{
        empNm : '최민수',
        empNo : '2220115',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempDate,
        _seq : 2,
        familyTimeTypeCd : '20'
    },{
        empNm : '두승현',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '4급',
        ymd : tempPrevDate,
        _seq : 1,
        leaveTitleNm : '오전반차',
        remark : '8:00-12:00',
        leaveStaYmd : tempPrevDate,
        leaveEndYmd : tempPrevDate
    },{
        empNm : '양용원',
        empNo : '2220105',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempPrevDate,
        familyTimeTypeCd : '20',
        _seq : 1
    },{
        empNm : '최민수',
        empNo : '2230103',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempPrevDate,
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
        familyTimeTypeCd : '30',
        _seq : 1
    },{
        empNm : '양용원',
        empNo : '2220105',
        orgNm : '정보시스템실',
        posGrdNm : '5급',
        ymd : tempNextDate,
        _seq : 1,
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

const useDailyAttendance = (
    date: string,
    orgId: string
) => {
    const [attendanceList, setAttendanceList] = useState<attendanceData[]>([]);

    const getAttendanceList = () =>{
        setAttendanceList(getTeamAttendanceList(date, orgId))
    }

    return {
        getAttendanceList,
        attendanceList
    }
};

export default useDailyAttendance;