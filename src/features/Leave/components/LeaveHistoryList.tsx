import {LoadingSpinner} from "../../../components/ui/LoadingSpinner.tsx";
import {useGetLeaveApplicationHistory} from "../hooks/useLeaveApplication.tsx";
import {LeaveHistoryCard} from "./LeaveHistoryCard.tsx";
import {format} from "date-fns";

interface LeaveHistoryListProps {
    empNo : number;
    year : number;
}

const TODAY = new Date();
const TODAY_STRING = format(TODAY, 'yyyyMMdd');

export function LeaveHistoryList({
    empNo,
    year,
}:LeaveHistoryListProps) {
    const {isLoading: isHistoryLoading, leaveApplicationHistory} = useGetLeaveApplicationHistory(
        empNo, `${year}0101`, `${year}1231`
    );

    if (!leaveApplicationHistory || leaveApplicationHistory.length === 0)
        return <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
            {isHistoryLoading ?
                <LoadingSpinner size={40} color={"#aaa"} strokeWidth={12}/> :
                "조회결과가 없습니다"}
        </div>

    const upcomingLeaveApplicationHistory = leaveApplicationHistory.filter(
        item => item.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd >= TODAY_STRING
    )

    const pastLeaveApplicationHistory = leaveApplicationHistory.filter(
        item => item.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd < TODAY_STRING
    )

    return <div className={"flex flex-col gap-3"}>
        {!!upcomingLeaveApplicationHistory.length && <h2 className="font-bold text-xl py-2">예정중인 휴가</h2>}
        {
            upcomingLeaveApplicationHistory.map((item, index) =>
                <LeaveHistoryCard key={index} {...item} />)
        }

        {!!pastLeaveApplicationHistory.length && <h2 className="font-bold text-xl py-2">다녀온 휴가</h2>}
        {
            pastLeaveApplicationHistory.map((item, index) =>
                <LeaveHistoryCard key={index} {...item} />)
        }
    </div>;
}