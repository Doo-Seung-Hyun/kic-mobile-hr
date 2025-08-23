import Chip from "../components/ui/Chip.tsx";
import {useGetOldestLeaveYear} from "../features/Leave/hooks/useLeaveApplication.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import type {LeaveType, SelectedLeaveProps} from "../features/Leave/types/leave.ts";
import {useEffect, useState} from "react";
import {LeaveHistoryList} from "../features/Leave/components/LeaveHistoryList.tsx";
import {LeaveHistoryCard} from "../features/Leave/components/LeaveHistoryCard.tsx";



const getLeaveYears = (oldestLeaveYear : number) => {

    const currentYear = new Date().getFullYear();

    if(!oldestLeaveYear)
        oldestLeaveYear = currentYear

    const years:number[] = [];
    for(let year=currentYear; year >= oldestLeaveYear; year--) {
        years.push(year)
    }

    return years;
}

const LeaveHistoryPage = () => {
    const empNo = 2230103;

    const [leaveYear, setLeaveYear] = useState<number>(0);

    const {isLoading: isOldestLeaveYearLoading, oldestLeaveYear} = useGetOldestLeaveYear(empNo);

    const year = new Date().getFullYear();
    useEffect(() => {
        if(!oldestLeaveYear)
            setLeaveYear(year);
    },[oldestLeaveYear])

    if(isOldestLeaveYearLoading) {
        return (
            <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                <LoadingSpinner size={40} color={"#aaa"} strokeWidth={12} />
            </div>
        )
    }
    return (<div>
        <div className={"flex gap-1 py-4"}>
            {getLeaveYears(oldestLeaveYear)?.map(year =>
                <button key={year}>
                    <Chip outline={true}
                          classNames={[
                              year !== leaveYear ? 'bg-white' : '',
                              'px-2',
                              'py-1',
                          ].join(' ')}
                          isSelected={year === leaveYear}
                          onClick={() => setLeaveYear(year)}
                    >{year}</Chip>
                </button>
            )}
        </div>
        <LeaveHistoryList empNo={empNo} year={leaveYear} />
    </div>)
}

export default LeaveHistoryPage;