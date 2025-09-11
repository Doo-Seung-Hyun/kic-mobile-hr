import type {LeaveType, UserLeaveBalance} from "../../../Leave/types/leave.ts";
import Button from "../../../../components/ui/Button.tsx";
import {useGetMyLeaveBalances} from "../../../Leave/hooks/useLeaveApplication.tsx";
import {LoadingSpinner} from "../../../../components/ui/LoadingSpinner.tsx";

interface LeaveSelectionBottomSheetContentProps {
    selectedLeave?: LeaveType | null;
    onLeaveSelect: (selectedLeave: LeaveType | undefined, leaveBalance: number) => void;
    closeBottomSheet: () => void;
}

const checkedSvg = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        data-seed-icon="true" data-seed-icon-version="0.0.21" width="18"
                        height="18" className="_1ks49b8e">
    <g>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.2424 3.55704C22.7631 3.96703 22.8528 4.72151 22.4428 5.24222L10.632 20.2422C10.4171 20.5151 10.0945 20.6816 9.7475 20.6984C9.40053 20.7153 9.06327 20.581 8.82289 20.3302L1.6337 12.8302C1.17509 12.3518 1.19116 11.5922 1.6696 11.1336C2.14804 10.675 2.90767 10.691 3.36628 11.1695L9.60029 17.673L20.5572 3.75749C20.9672 3.23679 21.7216 3.14705 22.2424 3.55704Z"
              fill="rgb(38, 86, 201)"></path>
    </g>
</svg>;

interface MyLeavesBalanceListProps {
    leavesBalance?: UserLeaveBalance[];
    onClick?: (leaveBalance : UserLeaveBalance) => void;
    selectedLeave?: LeaveType | null;
}

function MyLeavesBalanceList({
    leavesBalance = [],
    onClick : handleLeaveSelect,
    selectedLeave,
}: MyLeavesBalanceListProps) {
    return <ul className={"pt-4"}>
        {leavesBalance.map(leaveBalance =>
            <li key={leaveBalance.leaveType.leaveTypeCode}
                className={"block w-full [&:not(:first-child)]:border-t"}>
                <Button onClick={() => {
                    if(handleLeaveSelect)
                        handleLeaveSelect(leaveBalance)
                }}
                        variant={"none"}
                        className={"flex w-full justify-between py-3 items-center " +
                            `${leaveBalance.leaveType.leaveTypeCode === selectedLeave?.leaveTypeCode && 'text-blue-700'}`}
                        disabled={leaveBalance.leftLeaveDays === 0}>
                    <div className={"flex flex-col text-left"}>
                        <span className={"font-bold"}>{leaveBalance.leaveType.leaveTypeName}</span>
                        <span className={"text-sm"}>{leaveBalance.leftLeaveDays}일</span>
                    </div>
                    <div>
                        {leaveBalance.leaveType.leaveTypeCode === selectedLeave?.leaveTypeCode &&
                            checkedSvg}
                    </div>
                </Button>
            </li>)}
    </ul>
}

const LeaveSelectionBottomSheetContent = ({
                                              selectedLeave = null,
                                              onLeaveSelect,
                                              closeBottomSheet
                                          }: LeaveSelectionBottomSheetContentProps) => {
    const empNo = 2230103;
    const {myLeaveBalances, isLoading, isError} = useGetMyLeaveBalances(empNo)

    const handleLeaveSelect = (selectedLeaveTypeCode: string) => {
        const selectedLeave = myLeaveBalances.find(leaveBalance =>
            leaveBalance.leaveType.leaveTypeCode === selectedLeaveTypeCode)
        onLeaveSelect(selectedLeave?.leaveType, selectedLeave!.leftLeaveDays);
        closeBottomSheet();
    }

    return (<>
        <div className={"font-bold text-xl"}>휴가 현황</div>
        {isLoading ?
            <div className={'flex h-full justify-center items-center'}>
                <LoadingSpinner size={40} color={"#aaa"} />
            </div> :
            <MyLeavesBalanceList
                leavesBalance={myLeaveBalances}
                onClick={leaveBalance => handleLeaveSelect(leaveBalance.leaveType.leaveTypeCode)}
                selectedLeave={selectedLeave}
            />
        }

    </>);
}

export default LeaveSelectionBottomSheetContent;