import type {UserLeaveBalance} from "../../../../features/Leave/types/leave.ts";

const QUICK_USE_LEAVE_CODES = ['018', '017', '001']; //대체-보상-연차

export function getPrioritizedLeaveBalance(
    balances : UserLeaveBalance[]
) {
    for (const code of QUICK_USE_LEAVE_CODES) {
        const found = balances.find(balance =>
            balance.leaveType.leaveTypeCode === code && balance.leftLeaveDays >= 1
        );
        if (found)
            return found;
    }
}