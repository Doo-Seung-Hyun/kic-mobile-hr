import Chip from "../../../../components/ui/Chip.tsx";
import {Checkbox} from "../../../../components/ui/Checkbox.tsx";
import {format} from "date-fns";
import {ko} from "date-fns/locale";
import type {HalfLeaveType, SelectedLeaveProps} from "../../../../types/leave.ts";
import {useEffect, useRef, useState} from "react";
import ToggleSwitch from "../../../../components/ui/ToggleSwitch.tsx";

interface HalfLeaveSelectionProps {
    leavePeriodProps : SelectedLeaveProps
    onHalfLeaveOptionClick : (leaveDateIndex:number, halfLeaveType : HalfLeaveType) => void;
}

const halfTypeCdList: HalfLeaveType[] =[
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'M', halfLeaveTypeCdName: '오전반차'},
    {dayOffTypeCd: 'P', dayOffTypeCdName: '반반차', halfLeaveTypeCd: 'M', halfLeaveTypeCdName: '오전반반차'},
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'A', halfLeaveTypeCdName: '오후반차'},
    {dayOffTypeCd: 'P', dayOffTypeCdName: '반반차', halfLeaveTypeCd: 'A', halfLeaveTypeCdName: '오후반반차'},
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'E', halfLeaveTypeCdName: '8:00 출근 (12:00 퇴근)'},
];

const earlyAfternoonHalfLeaveType = halfTypeCdList.find(halfLeaveType => halfLeaveType.halfLeaveTypeCd==='E') as HalfLeaveType;

const HalfLeaveSelection =({
   leavePeriodProps,
   onHalfLeaveOptionClick
}:HalfLeaveSelectionProps) => {

    const [showArea, setShowArea] = useState(leavePeriodProps.leaveDates.some(leaveDate=>leaveDate.halfLeaveType));

    const prevStartDateInLeavePeriodProps = useRef<string>(undefined);

    const getHalfLeaveTypes = (halfLeaveDivision:'AM'|'PM') => {
        const halfLeaveTypeCd = halfLeaveDivision==='AM' ? 'M' : 'A';
        return halfTypeCdList.filter(halfLeaveType => halfLeaveType.halfLeaveTypeCd === halfLeaveTypeCd);
    }

    const scrollIntoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollIntoRef.current)
            scrollIntoRef.current.scrollIntoView({
                behavior:'smooth',
                block : 'start'
            })
    }, [showArea]);

    useEffect(() => {
        const prev = prevStartDateInLeavePeriodProps.current;
        if(showArea) {
            const curr = leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd;
        }
    }, [leavePeriodProps.leaveDates]);

    //해당 반차가 선택되었는지 확인하는 함수
    const isHalfLeaveSelected = (leaveDateIndex:number, toFind:HalfLeaveType) =>{
        if(!leavePeriodProps)
            return false;
        const {leaveDates} = leavePeriodProps;
        const {halfLeaveType} = leaveDates[leaveDateIndex];
        return halfLeaveType &&
            (halfLeaveType.dayOffTypeCd === toFind.dayOffTypeCd) &&
            (halfLeaveType.halfLeaveTypeCd === toFind.halfLeaveTypeCd ||
                (toFind.halfLeaveTypeCd==='A' &&
                    toFind.dayOffTypeCd==='H' &&
                    halfLeaveType.halfLeaveTypeCd === 'E')
            );
    }

    return <>
        <div className={"font-bold text-xl pb-4 flex justify-between items-center"}
             ref={scrollIntoRef}
        >
            <span>반차를 사용하시나요?</span>
            <ToggleSwitch
                isOn={showArea}
                onClick={()=>setShowArea(prev=>!prev)}
                classNames={'w-10'}
            />
        </div>
        {
            showArea && leavePeriodProps?.leaveDates.length==1 &&
            // 1일 휴가인 경우
            <div>
                <div className={"flex items-center gap-2"}>{
                    getHalfLeaveTypes('AM').map(halfLeaveType =>
                        <Chip outline={true}
                              classNames={"flex-1 px-2 py-1"}
                              onClick={() => onHalfLeaveOptionClick(0, halfLeaveType)}
                              isSelected={isHalfLeaveSelected(0, halfLeaveType)}
                        >
                            {halfLeaveType.halfLeaveTypeCdName}
                        </Chip>)
                }</div>
                <div className={"flex items-center gap-2 mt-3"}>{
                    getHalfLeaveTypes('PM').map(halfLeaveType =>
                        <Chip outline={true}
                              classNames={"flex-1 px-2 py-1"}
                              onClick={() => onHalfLeaveOptionClick(0, halfLeaveType)}
                              isSelected={isHalfLeaveSelected(0, halfLeaveType)}
                        >
                            {halfLeaveType.halfLeaveTypeCdName}
                        </Chip>)
                }</div>
                {(leavePeriodProps?.leaveDates[0].halfLeaveType?.halfLeaveTypeCd === 'A' ||
                        leavePeriodProps?.leaveDates[0].halfLeaveType?.halfLeaveTypeCd === 'E') &&
                    leavePeriodProps?.leaveDates[0].halfLeaveType.dayOffTypeCd === 'H' &&
                    <div className={"pt-4"}>
                        <Checkbox className={"font-normal text-sm"}
                                  onChange={() => onHalfLeaveOptionClick(0, earlyAfternoonHalfLeaveType)}
                                  checked={leavePeriodProps?.leaveDates[0].halfLeaveType?.halfLeaveTypeCd === 'E'}
                        >8:00 출근 (12:00 퇴근)</Checkbox>
                    </div>}
            </div>
        }
        {
            showArea && leavePeriodProps?.leaveDates.length==2 &&
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
                                  onClick={() => onHalfLeaveOptionClick(0, halfLeaveType)}
                                  isSelected={isHalfLeaveSelected(0, halfLeaveType)}
                            >
                                {halfLeaveType.halfLeaveTypeCdName}
                            </Chip>)
                    }</div>
                    <div>
                        <Checkbox className={["font-normal text-sm",
                            leavePeriodProps.leaveDates[0].halfLeaveType?.dayOffTypeCd !== 'H' && "invisible"
                        ].filter(Boolean).join(' ')}
                                  onChange={() => onHalfLeaveOptionClick(0, earlyAfternoonHalfLeaveType)}
                                  checked={leavePeriodProps.leaveDates[0].halfLeaveType?.halfLeaveTypeCd === 'E'}
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
                              onClick={()=>onHalfLeaveOptionClick(1, halfLeaveType)}
                              isSelected={isHalfLeaveSelected(1, halfLeaveType)}
                        >
                            {halfLeaveType.halfLeaveTypeCdName}
                        </Chip>)
                }</div>
            </div>
        }
    </>
}

export default HalfLeaveSelection;