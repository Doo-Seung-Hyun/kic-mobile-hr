import Card from "../components/ui/Card.tsx";
import Chip from "../components/ui/Chip.tsx";
import {useGetLeaveApplicationHistory, useGetLeaveYears} from "../features/Leave/hooks/useLeaveApplication.tsx";
import {format} from "date-fns";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import type {LeaveType, SelectedLeaveProps} from "../features/Leave/types/leave.ts";
import {ko} from "date-fns/locale";
import {useEffect, useState} from "react";

interface LeaveHistoryCardProps {
    leaveType : LeaveType;
    leavePeriodProps : SelectedLeaveProps;
    statusCd : string;
}
function LeaveHistoryCard({
    leaveType,
    leavePeriodProps,
    statusCd,
}:LeaveHistoryCardProps) {
    let periodString = '';
    periodString = format(leavePeriodProps.leaveDates[0].dateInfo.date,'M월 d일(EE)', {locale: ko});

    if(leavePeriodProps.leaveDates.length === 2) {
        periodString += ' - ';
        periodString += format(leavePeriodProps.leaveDates[1].dateInfo.date, 'M월 d일(EE)', {locale: ko});
    }

    const isConfirmed = statusCd === '132';

    return (
        <Card>
            <Card.Content className="font-normal">
                <div className={"flex justify-between"}>
                    <span className={"font-semibold"}>{leaveType.leaveTypeName}</span>
                    <span>{leavePeriodProps.leaveDays}일</span>
                </div>
                <div className={"text-sm py-1"}>{periodString}</div>
                <div className={"mt-2"}>
                    <button>
                        <Chip outline classNames={"p-1 w-20"}>휴가변경</Chip>
                    </button>
                    {isConfirmed && <button>
                        <Chip outline classNames={"ml-1.5 p-1 w-20 border-red-400 text-red-600"}>휴가취소</Chip>
                    </button>}
                </div>
            </Card.Content>
        </Card>
    );
}

const LeaveHistoryPage = () => {
    const empNo = 2230103;
    const TODAY = new Date();

    const [leaveYear, setLeaveYear] = useState<number>(0);
    const {isLoading: isHistoryLoading, leaveApplicationHistory} = useGetLeaveApplicationHistory(
        empNo, `${leaveYear}0101`, `${leaveYear}1231`
    );
    const {isLoading: isYearsLoading, leaveYears} = useGetLeaveYears(empNo);

    useEffect(() => {
        if(leaveYears && leaveYear===0)
            setLeaveYear(leaveYears[0]);
    },[leaveYears])

    if(isYearsLoading) {
        return (
            <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                <LoadingSpinner size={40} color={"#aaa"} strokeWidth={12} />
            </div>
        )
    }
    return (<div>
        <div className={"flex gap-1 py-4"}>
            {leaveYears?.map(year =>
                <button key={year}>
                    <Chip outline={true}
                          classNames={[
                              year !== leaveYear ? 'bg-white':'',
                              'px-2',
                              'py-1',
                          ].join(' ')}
                          isSelected={year === leaveYear}
                          onClick={() => setLeaveYear(year)}
                    >{year}</Chip>
                </button>
            )}
        </div>
        <div className={"flex flex-col gap-3"}>
        {
            !leaveApplicationHistory || leaveApplicationHistory.length===0 ?
                (<div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    {isHistoryLoading ? <LoadingSpinner size={40} color={"#aaa"} strokeWidth={12} /> :
                        '조회결과가 없습니다'}
                </div>) :
                leaveApplicationHistory.map((item,index)=>
                    <LeaveHistoryCard key={index} {...item} />)
        }
        </div>
    </div>)
}

export default LeaveHistoryPage;