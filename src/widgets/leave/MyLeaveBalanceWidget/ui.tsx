import type {UserLeaveBalance} from "../../../features/Leave/types/leave.ts";
import ExpandableCard from "../../../components/ui/ExpandableCard.tsx";

interface MyLeaveBalanceWidgetProps {
    balances: UserLeaveBalance[];
    isLoading: boolean;
}

const MyLeaveBalanceWidget = ({
    balances,
    isLoading
}:MyLeaveBalanceWidgetProps) => {
    return <ExpandableCard
        title="휴가 현황"
        items={balances}
        itemRenderFunc = { leave => <>
            <span>{leave.leaveType.leaveTypeName}</span>
            <div>
                {leave.leftLeaveDays}
                <span className="text-sm font-normal text-gray-500 pl-1">일</span>
            </div>
        </>}
        visibleCount={3}
        isLoading={isLoading}
    />;
}

export default MyLeaveBalanceWidget;