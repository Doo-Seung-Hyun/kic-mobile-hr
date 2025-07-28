import TeamCalendar from "../../TeamCalendar/TeamCalendar.tsx";
import type {HalfLeaveType, SelectedLeaveProps} from "../../../../types/leave.ts";
import {useEffect, useMemo, useState} from "react";
import HalfLeaveSelection from "./HalfLeaveSelection.tsx";
import {useBottomSheetValidation} from "../../../../stores/bottomSheetStore.ts";
import useLeaveCalculation from "../../../Calendar/hooks/useLeaveCalculation.ts";

interface LeavePeriodBottomSheetProps {
    selectedLeaveProps?: SelectedLeaveProps | null;
    setBottomSheetContentState? : (bottomSheetContentState:SelectedLeaveProps|null)=>void;
}

const LeavePeriodBottomSheet = ({
    selectedLeaveProps = null,
    setBottomSheetContentState
}: LeavePeriodBottomSheetProps) => {
    //휴가 날짜 선택 정보
    const [leavePeriodProps, setLeavePeriodProps] = useState<SelectedLeaveProps|null>(selectedLeaveProps)

    //실제 휴가일수 계산
    const {leaveDays=0} = useLeaveCalculation(leavePeriodProps?.leaveDates || null);
    const {setValidation} = useBottomSheetValidation();

    const leavePeriodPropsWithLeaveDays = useMemo(() => {
        if(!leavePeriodProps) return null;

        return {
            ...leavePeriodProps,
            leaveDays
        }
    }, [leavePeriodProps, leaveDays]);

    //휴가 날짜 선택 정보가 변경되면
    //외부에서 바텀시트에 선택된 휴가날짜 정보를 확인할수 있도록
    //bottomsheet의 api인 setBottomSheetContentState를 호출
    useEffect(() => {
        if(setBottomSheetContentState)
            setBottomSheetContentState(leavePeriodPropsWithLeaveDays);
    }, [leavePeriodProps])

    //반차 선택 핸들러
    const handleHalfLeaveSelect = (leaveDateIndex:number, halfLeaveType : HalfLeaveType) => {
        if(!leavePeriodProps)
            return;
        const newLeavePeriodProps = {...leavePeriodProps};
        const {leaveDates} = newLeavePeriodProps;
        if(leaveDates[leaveDateIndex].halfLeaveType === halfLeaveType)
            delete leaveDates[leaveDateIndex].halfLeaveType;
        else
            leaveDates[leaveDateIndex].halfLeaveType = halfLeaveType;

        setLeavePeriodProps(newLeavePeriodProps);
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            <div className={"font-bold text-xl pb-8"}>날짜를 선택해주세요</div>
            <TeamCalendar
                fixedHeightOfAttendanceList={false}
                initialSelectedDate={leavePeriodProps?.leaveDates[0].dateInfo.date}
                initialSelectedDateRange={leavePeriodProps?.leaveDates.length === 2 ?
                    [...leavePeriodProps.leaveDates.map(leaveDate => leaveDate.dateInfo)] : undefined}
                canSelectOffDay={false}
                onDateChange={(dateInfo, dateRange) => {
                    setLeavePeriodProps(() => {
                        const newLeavePeriodProps: SelectedLeaveProps = {
                            dateComponentType: 'datePicker',
                            leaveDates: []
                        };
                        if (dateRange)
                            newLeavePeriodProps.leaveDates.push({dateInfo: dateRange[0]});

                        newLeavePeriodProps.leaveDates.push({dateInfo});

                        return newLeavePeriodProps;
                    });

                    //validation 활성화
                    if(setValidation)
                        setValidation(true);
                }}
                dateRangePickerMode={true}
            />

            {leavePeriodProps && <div className={"py-12"}>
                <HalfLeaveSelection
                    leavePeriodProps={leavePeriodProps}
                    onHalfLeaveOptionClick={handleHalfLeaveSelect}
                />
            </div>}

        </div>
    )
}

export default LeavePeriodBottomSheet;