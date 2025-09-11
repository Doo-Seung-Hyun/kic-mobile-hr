import ExpandableCard from "../../../components/ui/ExpandableCard.tsx";
import leaveRocketIcon from "../../../assets/images/leaveRocketIcon.png";
import chevronDownIconUrl from '/src/assets/images/chevron-down.svg';
import {
    useGetLeaveApplicationHistory,
    useGetMyLeaveBalances
} from "../../../features/Leave/hooks/useLeaveApplication.tsx";
import {differenceInCalendarDays, format, parse, startOfDay} from "date-fns";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/ui/Button.tsx";
import MyLeaveBalanceWidget from "../MyLeaveBalanceWidget/ui.tsx";

const calculateDaysLeft = (leaveDate:string):string =>{
    const to:Date = startOfDay(parse(leaveDate,'yyyyMMdd',new Date()));
    const daysLeft = differenceInCalendarDays(to,new Date());
    return daysLeft===0 ? '오늘':
        daysLeft===1 ? '내일':
            `D-${daysLeft}`;
}

const getFormattedDateString = (date:string) =>{
    return format(parse(date,'yyyyMMdd',new Date()),'M월d일');
}


const LeaveDashboard = () => {
    const TODAY = new Date();
    const TODAY_STRING = format(TODAY, 'yyyyMMdd');

    const empNo = 2230103;
    const currentYear = TODAY_STRING.substring(0, 4);

    const navigate = useNavigate();

    //휴가 잔여일수 조회
    const {myLeaveBalances, isLoading: isLoadingMyLeaveBalances} = useGetMyLeaveBalances(empNo);
    const leaveTypeCodeForDisplaying = ['001', '017', '018'];
    const myLeaveBalanceForMainPage = myLeaveBalances.filter(leave =>
        leave.leftLeaveDays > 0 &&
        leaveTypeCodeForDisplaying.some(code=>code===leave.leaveType.leaveTypeCode)
    )

    //예정휴가목록 조회
    const {leaveApplicationHistory, isLoading: isLoadingHistory} = useGetLeaveApplicationHistory(
        empNo, `${currentYear}0101`, `${currentYear}1231`
    );

    const upComingLeaves = leaveApplicationHistory?.filter(
        leave =>
            leave.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd >= TODAY_STRING
    ) ?? [];

    return <>
        <div className="flex gap-3 items-center pt-6">
            <img src={leaveRocketIcon}
                 alt={"휴가 아이콘"}
                 className={"inline-block w-[26px] h-[26px]"}
            />
            <h1 className={"font-bold text-2xl"}>휴가를 떠나요</h1>
        </div>

        {/*휴가 현황*/}
        <MyLeaveBalanceWidget balances={myLeaveBalanceForMainPage} isLoading={isLoadingMyLeaveBalances} />

        {/*예정 휴가*/}
        <ExpandableCard
            title={<button onClick={() => navigate('/leave/history')}>
                <div className={"flex items-center"}>
                    <span>예정 휴가</span>
                    <img src={chevronDownIconUrl}
                         alt={"더보기"}
                         className={"inline-block -rotate-90 ml-1 h-[7px]"}
                    />
                </div>
            </button>}
            items={upComingLeaves}
            itemRenderFunc={leave => {
                const daysLeft = calculateDaysLeft(leave.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd);
                const leaveTypeName = leave.leaveType.leaveTypeName;
                const startDateString = leave.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd;
                const endDateString = leave.leavePeriodProps.leaveDates[1]?.dateInfo.yyyyMMdd ?? '';

                return <>
                    <div className="flex-1 text-blue-600">
                        <span>{daysLeft}</span>
                    </div>
                    <div className="flex-1 font-normal">
                        <span>{leaveTypeName}</span>
                    </div>
                    <div className="flex-1 flex-grow-[2] text-right font-normal text-sm text-gray-700">
                        <span>{getFormattedDateString(startDateString)}</span>

                        {leave.leavePeriodProps.leaveDates.length>1 &&
                            <>
                                <span className="mx-1">-</span>
                                <span>{getFormattedDateString(endDateString)}</span>
                            </>
                        }
                    </div>
                </>
            }}
            listItemClassName="items-center"
            isLoading={isLoadingHistory}
        />

        {/*휴가신청 버튼*/}
        <Button className={"mb-2"}
                onClick={() => navigate('/leave/apply')}>
            휴가 신청하기
        </Button>
    </>;
}

export default LeaveDashboard;