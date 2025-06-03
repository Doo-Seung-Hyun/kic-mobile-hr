import Card from "../components/ui/Card.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {compareAsc, differenceInCalendarDays, format, parse, startOfDay} from "date-fns";
import ExpandableCard from "../components/ui/ExpandableCard.tsx";
import Button from "../components/ui/Button.tsx";

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
    // {leaveTypeCode: '004', leaveTypeName: '공가', leftLeaveDays: 1}
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

    return (
        <div className="flex flex-col gap-4 text-gray-800">
            <div className="font-bold text-xl pt-6">🚀 휴가를 떠나요</div>
            {/*휴가 현황*/}
            <ExpandableCard
                title='휴가 현황'
                items={myLeaveDays}
                itemRenderFunc= {leave => <>
                    <span>{leave.leaveTypeName}</span>
                    <div>
                        {leave.leftLeaveDays}
                        <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                    </div>
                </>}
                visibleCount={3}
            />

            {/*예정 휴가*/}
            <ExpandableCard
                title='예정된 휴가'
                items={scheduledLeaves}
                itemRenderFunc= {leave => <>
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
                </>}
                listItemClassName='items-center'
            />

            {/*휴가신청 버튼*/}
            <Button className={"mb-2"}>휴가 신청하기</Button>

            <div className="font-bold text-xl pt-6">🕕 가족과 함께 시간을 보내요</div>

            {/*예정 휴가*/}
            <ExpandableCard
                title='예정된 휴가'
                items={scheduledLeaves}
                itemRenderFunc= {leave => <>
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
                </>}
                listItemClassName='items-center'
            />

            {/*가족과 함께하는날 신청 버튼*/}
            <Button className={"mb-2"}>가족과 함꼐하는 날 신청하기</Button>
        </div>
    );
}

export default MainPage;