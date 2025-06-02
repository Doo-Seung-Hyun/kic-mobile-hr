import Card from "../components/ui/Card.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {compareAsc, differenceInCalendarDays, format, parse, startOfDay} from "date-fns";

interface LeaveType {
    leaveTypeCode: string;
    leaveTypeName: string;
    leftLeaveDays: number;
}

// 로더로 이관 예정
interface ScheduledLeavesType {
    leaveTypeCode: string;
    leaveTypeName: string;
    leaveTypeDisplayName: string;
    scheduledLeaveStartDate: string;
    scheduledLeaveStartTime: string;
    scheduledLeaveEndDate: string;
    scheduledLeaveEndTime: string;
    daysLeft: string;
    formattedDuration: {start:string, end:string, isOneDay:boolean};
}

const myLeaveDays : LeaveType[] = [
    {leaveTypeCode: '001', leaveTypeName: '연차휴가', leftLeaveDays: 10},
    {leaveTypeCode: '002', leaveTypeName: '보상휴가', leftLeaveDays: 2},
    {leaveTypeCode: '003', leaveTypeName: '대체휴가', leftLeaveDays: 4},
    {leaveTypeCode: '004', leaveTypeName: '공가', leftLeaveDays: 1}
];

const calculateDaysLeft = (leaveDate:string):string =>{
    const to:Date = startOfDay(parse(leaveDate,'yyyyMMdd',new Date()));
    const daysLeft = differenceInCalendarDays(to,new Date());
    return daysLeft===0 ? '오늘':
        daysLeft===1 ? '내일':
        `D-${daysLeft}`;
}

const getFormattedDuration = (
    startDate:string,
    startTime:string,
    endDate:string,
    endTime:string,
    tot_use_num:number
)=>{
    startDate = format(parse(startDate,'yyyyMMdd',new Date()),'M.d');
    endDate = format(parse(endDate,'yyyyMMdd',new Date()),'M.d');
    const duration:{start:string, end:string, isOneDay:boolean} = {
        start: "",
        end: "",
        isOneDay: false
    };
    duration.isOneDay = false;
    if(tot_use_num<1){
        duration.start = startTime;
        duration.end = endTime;
    }else if(tot_use_num>1){
        duration.start = startDate;
        duration.end = endDate;
    }else{
        duration.start = startDate;
        duration.end = endDate;
        duration.isOneDay = true;
    }

    return duration;
}

const scheduledLeaves : ScheduledLeavesType[] = [
    {
        leaveTypeCode: '001',
        leaveTypeName: '연차휴가',
        leaveTypeDisplayName: '오후반차',
        scheduledLeaveStartDate: '20250701',
        scheduledLeaveStartTime: '12:00',
        scheduledLeaveEndDate: '20250701',
        scheduledLeaveEndTime: '17:00',
        daysLeft: calculateDaysLeft('20250701'),
        formattedDuration: getFormattedDuration('20250701','12:00','20250701','17:00',0.5)
    },
    {
        leaveTypeCode: '001',
        leaveTypeName: '연차휴가',
        leaveTypeDisplayName: '연차',
        scheduledLeaveStartDate: '20250616',
        scheduledLeaveStartTime: '09:00',
        scheduledLeaveEndDate: '20250616',
        scheduledLeaveEndTime: '18:00',
        daysLeft: calculateDaysLeft('20250616'),
        formattedDuration: getFormattedDuration('20250616','09:00','20250616','18:00',1)
    },
    {
        leaveTypeCode: '001',
        leaveTypeName: '연차휴가',
        leaveTypeDisplayName: '연차',
        scheduledLeaveStartDate: '20250605',
        scheduledLeaveStartTime: '09:00',
        scheduledLeaveEndDate: '20250609',
        scheduledLeaveEndTime: '18:00',
        daysLeft: calculateDaysLeft('20250605'),
        formattedDuration: getFormattedDuration('20250605','09:00','20250609','18:00',3)
    }
].sort((a,b)=>
    compareAsc(
        parse(a.scheduledLeaveStartDate+a.scheduledLeaveStartTime,'yyyyMMddHH:mm',new Date()),
        parse(b.scheduledLeaveStartDate+b.scheduledLeaveStartTime,'yyyyMMddHH:mm',new Date())
    ));

function MainPage(props) {

    const [isLeaveListExpanded, setIsLeaveListExpanded] = useState<boolean>(false);
    const [expandableLeaveListHeight, setExpandableLeaveListHeight] = useState<number>(0);
    const expandableLeaveListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const height = expandableLeaveListRef.current.scrollHeight;
        setExpandableLeaveListHeight(height);
    }, [myLeaveDays]);

    const toggleExpandingLeaveList = ():void =>{
        setIsLeaveListExpanded(prev=>!prev);
    }

    console.log(scheduledLeaves);
    console.log(format(parse(scheduledLeaves[0].scheduledLeaveStartDate,'yyyyMMdd',new Date()),'M.d'));

    return (
        <div className="text-gray-800">
            {/*휴가 현황*/}
            <Card>
                <Card.Header>휴가 현황</Card.Header>
                <Card.Content>
                    <ul>
                        {myLeaveDays.slice(0,1).map(leave =>
                            <li className="flex flex-row justify-between p-2.5">
                                <span>{leave.leaveTypeName}</span>
                                <div>
                                    {leave.leftLeaveDays}
                                    <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                </div>
                            </li>
                        )}
                    </ul>
                    {myLeaveDays.length > 1 &&
                        <>
                            <ul className={'overflow-hidden transition-[height] duration-300 ease-in-out'}
                                style={{height: isLeaveListExpanded? `${expandableLeaveListHeight}px` : '0px'}}
                                ref={expandableLeaveListRef}>
                                {myLeaveDays.slice(1, myLeaveDays.length).map(leave =>
                                    <li className="flex flex-row justify-between p-2.5">
                                        <span>{leave.leaveTypeName}</span>
                                        <div>
                                            {leave.leftLeaveDays}
                                            <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <button
                                className="block font-normal w-full bg-gray-100 rounded-md border-gray-400 p-2 mt-2"
                                onClick={toggleExpandingLeaveList}>
                                <span>{isLeaveListExpanded ? '접기' : '더보기'}</span>
                                <span><svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    className={`ml-1 inline ${isLeaveListExpanded? 'rotate-180':''}`}
                                >
                              <path
                                  d="M1 1L5 5L9 1"
                                  stroke="#929294"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              />
                            </svg></span>
                            </button>
                        </>
                    }
                </Card.Content>
            </Card>
            {/*예정 휴가*/}
            <Card>
                <Card.Header>예정 휴가</Card.Header>
                <Card.Content>
                    {scheduledLeaves.map(leave =>
                        <div className="flex flex-row items-center justify-between p-2">
                            <div className="flex-1 text-blue-500">
                                <span>{leave.daysLeft}</span>
                            </div>
                            <div className="flex-1 font-normal">
                                <span>{leave.leaveTypeDisplayName}</span>
                            </div>
                            <div className="flex-1 flex-grow-[2] text-right font-normal text-sm text-gray-700">
                                <span className="bg-gray-100 rounded-md p-0.5">{leave.formattedDuration.start}</span>

                                {!leave.formattedDuration.isOneDay &&
                                    <>
                                        <span className="mx-1">-</span>
                                        <span className="bg-gray-100 rounded-md p-0.5">{leave.formattedDuration.end}</span>
                                    </>
                                }
                            </div>
                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
}

export default MainPage;