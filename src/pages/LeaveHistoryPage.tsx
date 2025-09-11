import Chip from "../components/ui/Chip.tsx";
import {useGetMyLeaveBalances, useGetOldestLeaveYear} from "../features/Leave/hooks/useLeaveApplication.tsx";
import {LoadingSpinner} from "../components/ui/LoadingSpinner.tsx";
import {useEffect, useState} from "react";
import {LeaveHistoryList} from "../features/Leave/components/LeaveHistoryList.tsx";
import Tab from "../components/ui/Tab/Tab.tsx";

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

    const [leaveYear, setLeaveYear] = useState<number>(new Date().getFullYear());

    // 휴가를 사용한 가장 오래된 연도를 조회
    const {isLoading: isOldestLeaveYearLoading, oldestLeaveYear} = useGetOldestLeaveYear(empNo);

    // 잔여 휴가현황 조회
    const {isLoading: isMyLeaveBalancesLoading, myLeaveBalances} = useGetMyLeaveBalances(empNo);

    //activeTab index state 관리
    const [activeTabName, setActiveTabName] = useState<'upcoming'|'past'>('past')

    const year = new Date().getFullYear();
    useEffect(() => {
        if(!oldestLeaveYear)
            setLeaveYear(year);
    },[oldestLeaveYear])

    if(isOldestLeaveYearLoading) {
        return (
            <div className="flex justify-center items-center flex-1">
                <LoadingSpinner size={40} color={"#aaa"} strokeWidth={12} />
            </div>
        )
    }
    return (<>
        <div className={"flex flex-row gap-1 py-4"}>
            {getLeaveYears(oldestLeaveYear)?.map(year =>
                <button key={year}>
                    <Chip outline={true}
                          classNames={[
                              year !== leaveYear ? 'bg-white' : '',
                              'px-4'
                          ].join(' ')}
                          isSelected={year === leaveYear}
                          onClick={() => setLeaveYear(year)}
                    >{year}</Chip>
                </button>
            )}
        </div>
        <Tab onChange={activeIndex => setActiveTabName(activeIndex===0? 'upcoming':'past')}
             defaultActiveIndex={1}
             className={'mb-6'}
        >
            <Tab.Item>예정중 휴가</Tab.Item>
            <Tab.Item>다녀온 휴가</Tab.Item>
        </Tab>
        <LeaveHistoryList
            empNo={empNo}
            year={leaveYear}
            leaveBalanceData={myLeaveBalances}
            whatKind={activeTabName}
        />
    </>)
}

export default LeaveHistoryPage;