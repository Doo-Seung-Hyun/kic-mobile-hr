import {format} from "date-fns";
import {ko} from "date-fns/locale";
import Card from "../../../components/ui/Card.tsx";
import Chip from "../../../components/ui/Chip.tsx";
import type {LeaveApplicationHistoryItem} from "../types/leave.ts";
import {useNavigate} from "react-router-dom";
import useAlertDialogStore from "../../../stores/alertDialogStore.ts";
import {useCancelLeaveApplication} from "../hooks/useLeaveApplication.tsx";

interface LeaveHistoryCardProps {
    leaveApplicationHistoryItem: LeaveApplicationHistoryItem,
    leftLeaveDays: number
}

export function LeaveHistoryCard({
                                     leaveApplicationHistoryItem,
                                     leftLeaveDays
                                 }: LeaveHistoryCardProps) {

    const openAlertDialog = useAlertDialogStore(state=>state.openAlertDialog);

    const {leaveType, leavePeriodProps, statusCd, leaveId} = leaveApplicationHistoryItem;
    let periodString = '';
    periodString = format(leavePeriodProps.leaveDates[0].dateInfo.date, 'M월 d일(EE)', {locale: ko});

    if (leavePeriodProps.leaveDates.length === 2) {
        periodString += ' - ';
        periodString += format(leavePeriodProps.leaveDates[1].dateInfo.date, 'M월 d일(EE)', {locale: ko});
    }

    const isConfirmed = statusCd === '132';

    //휴가 변경 핸들러
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate('/leave/apply', {
            state: {
                leaveApplicationHistoryItem,
                leftLeaveDays
            }
        });
    }

    //휴가 취소 핸들러
    const empNo = 2230103;
    const cancelMutation = useCancelLeaveApplication(empNo);
    const handleCancelClick = async () => {
        await cancelMutation.mutateAsync(leaveId);
    }

    return (
        <Card.Content className="font-normal py-4">
            <div className={"flex justify-between"}>
                <span className={"font-semibold"}>{leaveType.leaveTypeName}</span>
                <span>{leavePeriodProps.leaveDays}일</span>
            </div>
            <div className={"text-sm py-1"}>{periodString}</div>
            <div className={"mt-2"}>
                <button>
                    <Chip
                        onClick={handleEditClick}
                        outline
                        classNames={"p-1 w-20"}
                    >휴가변경</Chip>
                </button>
                {isConfirmed &&
                    <button onClick={()=>openAlertDialog({
                        buttonType : 'confirm',
                        title : '휴가를 취소하시겠어요?',
                        content : '그룹웨어로 휴가취소 결재를 진행합니다',
                        onConfirm : handleCancelClick
                    })}>
                        <Chip outline classNames={"ml-1.5 p-1 w-20 border-red-400 text-red-600"}>
                            휴가취소
                        </Chip>
                    </button>}
            </div>
        </Card.Content>
    );
}