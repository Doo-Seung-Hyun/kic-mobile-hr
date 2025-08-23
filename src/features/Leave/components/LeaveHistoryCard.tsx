import {format} from "date-fns";
import {ko} from "date-fns/locale";
import Card from "../../../components/ui/Card.tsx";
import Chip from "../../../components/ui/Chip.tsx";
import type {LeaveType, SelectedLeaveProps} from "../types/leave.ts";

interface LeaveHistoryCardProps {
    leaveType : LeaveType;
    leavePeriodProps : SelectedLeaveProps;
    statusCd : string;
}

export function LeaveHistoryCard({
    leaveType,
    leavePeriodProps,
    statusCd,
}: LeaveHistoryCardProps) {
    let periodString = '';
    periodString = format(leavePeriodProps.leaveDates[0].dateInfo.date, 'M월 d일(EE)', {locale: ko});

    if (leavePeriodProps.leaveDates.length === 2) {
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