import type {LeaveDate, UserLeaveBalance} from "../../../../features/Leave/types/leave.ts";
import Card from "../../../../components/ui/Card.tsx";
import {useMemo, useState} from "react";
import lightningIcon from '/src/assets/images/lightningIcon.png'
import sadFaceIcon from "/src/assets/images/sadFaceIcon.png";
import {LoadingSpinner} from "../../../../components/ui/LoadingSpinner.tsx";
import useSubmitLeaveApplication from "../../../../features/Leave/hooks/useLeaveApplication.tsx";
import {addDays, format} from "date-fns";
import type {DateInfo} from "../../../../types/calendar.ts";
import {getPrioritizedLeaveBalance} from "../model/selectors.ts";
import {Content} from "./Content.tsx";

interface QuickLeaveUseWidgetProps {
    myLeaveBalances: UserLeaveBalance[];
    isLoading : boolean;
}
export type ChipText = 'TODAY' | 'TOMORROW' | 'CUSTOM';
export interface DateChipProps {
    chipText : ChipText;
    dateInfo : DateInfo;
}

export const QuickLeaveUseWidget = ({
    myLeaveBalances,
    isLoading,
}: QuickLeaveUseWidgetProps) => {

    function ErrorContent() {
        return <div className={'flex-1 flex flex-col items-center justify-center text-center pb-6'}>
            <span>휴가가 부족해요&nbsp;
                <img src={sadFaceIcon} alt="sadFaceIcon"
                     width={18}
                     height={18}
                     className={'inline'} />
            </span>
        </div>
    }

    function Loading() {
        return <div className={'flex-1 flex items-center justify-center pb-6'}>
            <LoadingSpinner />
        </div>
    }

    function createDateChipState(chipText:ChipText, distanceFromToday:number) {
        const today = new Date();
        return {
            chipText,
            dateInfo : {
                date : addDays(today,distanceFromToday),
                yyyyMMdd : format(addDays(today,distanceFromToday), 'yyyyMMdd')
            }
        }
    }

    function handleChangeDateChip(chipText:ChipText, distanceFromToday:number) {
        setDateChip(createDateChipState(chipText, distanceFromToday));
    }

    function handleOnSubmit(){
        if(userLeaveBalance){
            leaveApplicationMutation.mutateAsync({
                empNo: EMP_NO,
                leaveType: userLeaveBalance.leaveType,
                leavePeriodProps:  {
                    leaveDates:[{dateInfo:dateChip.dateInfo}],
                    dateComponentType: "dropdownChip",
                    leaveDays: 1,
                },
                isModificationRequested: false
            })
        }
    }

    const EMP_NO=1140373;

    const [dateChip, setDateChip] = useState<DateChipProps>(()=>
        createDateChipState('TODAY',0));

    //대체-보상-연차 순으로 잔여일수가 있는 휴가를 찾고, 찾으면 break
    const userLeaveBalance = useMemo(()=>
        getPrioritizedLeaveBalance(myLeaveBalances)
    ,[myLeaveBalances]);

    const leaveApplicationMutation = useSubmitLeaveApplication();


    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1 items-center'}>
                <img src={lightningIcon} alt={'번개 아이콘'} width={14} height={14} />
                빠른 휴가사용
            </div>
        </Card.Header>
        <Card.Content className={'flex-1 flex flex-col'}>
            {isLoading ? <Loading />
            : !userLeaveBalance ? <ErrorContent />
            : <Content dateChip={dateChip}
                       handleChangeDateChip={handleChangeDateChip}
                       userLeaveBalance={userLeaveBalance}
                       onSubmit={handleOnSubmit}
                       isSubmitting={leaveApplicationMutation.isPending} />}
        </Card.Content>
    </Card>;
}