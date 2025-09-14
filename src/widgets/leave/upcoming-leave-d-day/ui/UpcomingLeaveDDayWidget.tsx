import type {LeaveApplicationHistoryItem} from "../../../../features/Leave/types/leave.ts";
import Card from "../../../../components/ui/Card.tsx";
import {dDayformatter} from "../../../../utils/attendanceFormmater.ts";
import {format} from "date-fns";
import fireIcon from '/src/assets/images/fireIcon.png';
import {CalendarDays} from "lucide-react";
import {LoadingSpinner} from "../../../../components/ui/LoadingSpinner.tsx";

interface UpcomingLeaveDDayWidgetProps {
    leaveApplicationHistoryItem?: LeaveApplicationHistoryItem;
    isLoading?: boolean;
}

const Title = ({
    leaveTypeName = '휴가'
}:{leaveTypeName?:string}) => {

    return <div className={'flex items-center font-semibold gap-1'}>
        <img src={fireIcon} alt={'불꽃아이콘'} width={14} height={14} />
        <span>{`다음 ${leaveTypeName}까지`}</span>
    </div>
}

const Loading = () => {
    return (<>
        <Title />
        <div className={'flex-1 flex items-center justify-center'}>
            <LoadingSpinner />
        </div>
        <div></div>
    </>);
}

const DDayWidget = ({
    item
}:{item:LeaveApplicationHistoryItem})=> {

    const {leaveType, leavePeriodProps} = item;
    const leaveStartDate = leavePeriodProps.leaveDates[0].dateInfo.date;
    const leaveStartDateString = leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd;

    return (<>
        <Title leaveTypeName={leaveType.leaveTypeName} />
        <div className={'flex-1 flex items-center justify-center font-bold text-3xl text-gray-700'}>
            {dDayformatter(leaveStartDateString)}
        </div>
        <div className={'font-medium flex items-center gap-1'}>
            <CalendarDays size={14}/>
            <span>{format(leaveStartDate, 'M월 d일')}</span>
        </div>
    </>);
}

const Empty = () => {
    return (<>
        <Title />
        <div className={'flex items-center justify-center h-full'}>
            휴가가 없습니다
        </div>
        <div></div>
    </>)
}

export const UpcomingLeaveDDayWidget = ({
    leaveApplicationHistoryItem,
    isLoading,
}: UpcomingLeaveDDayWidgetProps) => {
    return <Card className={'font-medium text-sm flex-1 aspect-square max-w-48'}>
        <Card.Content className={'flex-1 flex flex-col text-gray-500'}>
            {isLoading ? <Loading />
                : leaveApplicationHistoryItem ? <DDayWidget item={leaveApplicationHistoryItem} />
                        : <Empty />}
        </Card.Content>
    </Card>;
}