import TeamCalendar from "../../TeamCalendar/TeamCalendar.tsx";
import type {HalfLeaveType, SelectedLeaveProps} from "../../../../types/leave.ts";
import {useEffect, useState} from "react";
import Chip from "../../../../components/ui/Chip.tsx";
import {Checkbox} from "../../../../components/ui/Checkbox.tsx";
import {format} from "date-fns";
import {ko} from "date-fns/locale";

const halfTypeCdList: HalfLeaveType[] =[
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'M', halfLeaveTypeCdName: '오전반차'},
    {dayOffTypeCd: 'P', dayOffTypeCdName: '반반차', halfLeaveTypeCd: 'M', halfLeaveTypeCdName: '오전반반차'},
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'A', halfLeaveTypeCdName: '오후반차'},
    {dayOffTypeCd: 'P', dayOffTypeCdName: '반반차', halfLeaveTypeCd: 'A', halfLeaveTypeCdName: '오후반반차'},
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'E', halfLeaveTypeCdName: '8:00 출근 (12:00 퇴근)'},
];

interface LeavePeriodBottomSheetProps {
    selectedLeaveProps?: SelectedLeaveProps | null;
    setBottomSheetContentState? : (bottomSheetContentState:any)=>void;
}

const LeavePeriodBottomSheet = ({
    selectedLeaveProps = null,
    setBottomSheetContentState
}: LeavePeriodBottomSheetProps) => {
    const [leavePeriodProps, setLeavePeriodProps] = useState<SelectedLeaveProps|null>(selectedLeaveProps);
    useEffect(() => {
        if(setBottomSheetContentState)
            setBottomSheetContentState(leavePeriodProps);
    }, [leavePeriodProps]);

    const getHalfLeaveTypes = (halfLeaveDivision:'AM'|'PM') => {
        const halfLeaveTypeCd = halfLeaveDivision==='AM' ? 'M' : 'A';
        return halfTypeCdList.filter(halfLeaveType => halfLeaveType.halfLeaveTypeCd === halfLeaveTypeCd);
    }

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

    //해당 반차가 선택되었는지 확인하는 함수
    const isHalfLeaveSelected = (leaveDateIndex:number, toFind:HalfLeaveType) =>{
        if(!leavePeriodProps)
            return false;
        const {leaveDates} = leavePeriodProps;
        const {halfLeaveType} = leaveDates[leaveDateIndex];
        return halfLeaveType &&
            (halfLeaveType.dayOffTypeCd === toFind.dayOffTypeCd) &&
            (halfLeaveType.halfLeaveTypeCd === toFind.halfLeaveTypeCd);
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            <div className={"font-bold text-xl pb-8"}>날짜를 선택해주세요</div>
            <TeamCalendar
                initialSelectedDate={leavePeriodProps?.leaveDates[0].dateInfo.date}
                initialSelectedDateRange={leavePeriodProps?.leaveDates.length === 2 ?
                    [...leavePeriodProps.leaveDates.map(leaveDate => leaveDate.dateInfo)] : undefined}
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
                    })
                }}
                dateRangePickerMode={true}
            />
            <div className={"font-bold text-xl pb-8"}>반차를 사용하시나요?</div>
            {
                leavePeriodProps?.leaveDates.length==1 &&
                    // 1일 휴가인 경우
                    <div>
                        <div className={"flex items-center gap-2"}>{
                            getHalfLeaveTypes('AM').map(halfLeaveType =>
                                <Chip outline={true}
                                      classNames={"flex-1 px-2 py-1"}
                                      onClick={() => handleHalfLeaveSelect(0, halfLeaveType)}
                                      isSelected={isHalfLeaveSelected(0, halfLeaveType)}
                                >
                                    {halfLeaveType.halfLeaveTypeCdName}
                                </Chip>)
                        }</div>
                        <div className={"flex items-center gap-2 mt-3"}>{
                            getHalfLeaveTypes('PM').map(halfLeaveType =>
                                <Chip outline={true}
                                      classNames={"flex-1 px-2 py-1"}
                                      onClick={() => handleHalfLeaveSelect(0, halfLeaveType)}
                                      isSelected={isHalfLeaveSelected(0, halfLeaveType)}
                                >
                                    {halfLeaveType.halfLeaveTypeCdName}
                                </Chip>)
                        }</div>
                        {leavePeriodProps?.leaveDates[0].halfLeaveType?.halfLeaveTypeCd === 'A' &&
                            leavePeriodProps?.leaveDates[0].halfLeaveType.dayOffTypeCd === 'H' &&
                            <div className={"pt-4"}>
                                <Checkbox className={"font-normal text-sm"}>8:00 출근 (12:00 퇴근)</Checkbox>
                            </div>}
                    </div>
            }
            {
                leavePeriodProps?.leaveDates.length==2 &&
                // 기간 휴가인 경우
                <div>
                    <div className={"pb-2"}>
                        <div className={"flex items-center pb-2"}>
                            <span className={"flex-1"}>휴가시작</span>
                            <div>
                                {format(leavePeriodProps.leaveDates[0].dateInfo.date, 'yyyy.M.d(EE)', {locale: ko})}
                            </div>
                        </div>
                        <div className={"flex items-center gap-2 pb-1"}>{
                            getHalfLeaveTypes('PM').map(halfLeaveType =>
                                <Chip outline={true}
                                      classNames={"flex-1 px-2 py-1"}
                                      onClick={() => handleHalfLeaveSelect(0, halfLeaveType)}
                                      isSelected={isHalfLeaveSelected(0, halfLeaveType)}
                                >
                                    {halfLeaveType.halfLeaveTypeCdName}
                                </Chip>)
                        }</div>
                        <div>
                            <Checkbox className={["font-normal text-sm",
                                leavePeriodProps.leaveDates[0].halfLeaveType?.dayOffTypeCd !== 'H' && "invisible"
                            ].filter(Boolean).join(' ')}
                            >
                                8:00 출근 (12:00 퇴근)
                            </Checkbox>
                        </div>
                    </div>
                    <div className={"flex items-center pb-2"}>
                        <span className={"flex-1"}>휴가종료</span>
                        <div>
                            {format(leavePeriodProps.leaveDates[1].dateInfo.date, 'yyyy.M.d(EE)', {locale: ko})}
                        </div>
                    </div>
                    <div className={"flex items-center gap-2"}>{
                        getHalfLeaveTypes('AM').map(halfLeaveType=>
                            <Chip outline={true}
                                  classNames={"flex-1 px-2 py-1"}
                                  onClick={()=>handleHalfLeaveSelect(1, halfLeaveType)}
                                  isSelected={isHalfLeaveSelected(1, halfLeaveType)}
                            >
                                {halfLeaveType.halfLeaveTypeCdName}
                            </Chip>)
                    }</div>
                </div>
            }

        </div>
    )
}

export default LeavePeriodBottomSheet;