import {useLocation} from "react-router-dom";
import ProcessResultLayout from "../components/layout/ProcessResultLayout.tsx";
import type {LeaveType, SelectedLeaveProps} from "../features/Leave/types/leave.ts";
import {format} from "date-fns";
import {ko} from "date-fns/locale";

export interface LeaveResultPageProps {
    leaveType: LeaveType;
    leavePeriodProps : SelectedLeaveProps;
    isModificationRequested? : boolean;
}

const LeaveResultPage = () => {
    const location = useLocation();
    const {leaveType, leavePeriodProps, isModificationRequested,
    }:LeaveResultPageProps = location.state || {};

    const {leaveDays, leaveDates} = leavePeriodProps;
    const startLeaveString = format(leaveDates[0].dateInfo.date, 'M월 d일(EE)', {locale: ko});
    const endLeaveString = leaveDates.length<2 ? null :
        format(leaveDates[1].dateInfo.date, 'M월 d일(EE)', {locale: ko});

    return (
        <ProcessResultLayout
            title={!isModificationRequested ? "휴가를 신청했습니다" : '휴가변경을 신청했습니다'}
            subMessage={"그룹웨어 전자결재로 결재가 진행됩니다"}
        >
            <div>
                <div>
                    <div className={"font-semibold flex justify-center gap-1 pb-2"}>
                        <div className={"flex flex-col text-left"}>
                            <span>{startLeaveString}
                            {endLeaveString &&
                                ` - ${endLeaveString}`}</span>
                        </div>
                    </div>
                    <div>{leaveType.leaveTypeName}</div>
                    <div>{`${leaveDays}일`}</div>
                </div>
            </div>
        </ProcessResultLayout>
    )
};

export default LeaveResultPage;