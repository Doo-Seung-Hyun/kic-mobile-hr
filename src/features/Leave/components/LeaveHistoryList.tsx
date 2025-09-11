import {LoadingSpinner} from "../../../components/ui/LoadingSpinner.tsx";
import {useGetLeaveApplicationHistory} from "../hooks/useLeaveApplication.tsx";
import {LeaveHistoryCard} from "./LeaveHistoryCard.tsx";
import {format} from "date-fns";
import type {UserLeaveBalance} from "../types/leave.ts";
import Card from "../../../components/ui/Card.tsx";

interface LeaveHistoryListProps {
    empNo: number;
    year: number;
    leaveBalanceData?: UserLeaveBalance[];
    whatKind: 'all' | 'upcoming' | 'past';
}

const TODAY = new Date();
const TODAY_STRING = format(TODAY, 'yyyyMMdd');

export function LeaveHistoryList({
                                     empNo,
                                     year,
                                     leaveBalanceData,
                                     whatKind = 'all'
                                 }: LeaveHistoryListProps) {
    const {isLoading: isHistoryLoading, leaveApplicationHistory} = useGetLeaveApplicationHistory(
        empNo, `${year}0101`, `${year}1231`
    );

    if (!leaveApplicationHistory || leaveApplicationHistory.length === 0)
        return <div className="flex flex-1 justify-center items-center">
            {isHistoryLoading ?
                <LoadingSpinner size={40} color={"#aaa"} strokeWidth={12}/> :
                "조회결과가 없습니다"}
        </div>

    const filteredLeaveApplicationHistory =(() => {
        if (whatKind === 'all')
            return leaveApplicationHistory;
        else if (whatKind === 'upcoming')
            return leaveApplicationHistory.filter(item =>
                item.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd >= TODAY_STRING
            );
        else
            return leaveApplicationHistory.filter(item =>
                item.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd < TODAY_STRING
            );
    })();

    const getUserLeaveBalance = (
        leaveTypeCode : string
    )=>
        leaveBalanceData?.find(leave=>leave.leaveType.leaveTypeCode === leaveTypeCode);

    return <div className={"flex flex-1 flex-col"}>
        <Card className={"flex-1 divide-y px-6 gap-[0px]"}>
            {
                filteredLeaveApplicationHistory.map((item, index) => {
                    const leaveTypeCode = item.leaveType.leaveTypeCode;
                    const userLeaveBalance = getUserLeaveBalance(leaveTypeCode);

                    return <LeaveHistoryCard key={index}
                                             leaveApplicationHistoryItem={item}
                                             leftLeaveDays={userLeaveBalance?.leftLeaveDays ?? 0}
                    />;
                })
            }
        </Card>

    </div>;
}