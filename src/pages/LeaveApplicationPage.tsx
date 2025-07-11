import React, {useEffect, useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {HalfLeaveType, LeaveType, SelectedLeaveProps} from "../types/leave.ts";
import TeamCalendar from "../features/mainpage/TeamCalendar/TeamCalendar.tsx";
import Chip from "../components/ui/Chip.tsx";
import DropdownChip from "../components/ui/DropdownChip.tsx";
import {addDays, format, nextSunday, previousSunday} from "date-fns";
import {ko} from "date-fns/locale";
import {Checkbox} from "../components/ui/Checkbox.tsx";
import useBottomSheet from "../features/mainpage/leaveApplication/hooks/useBottomSheet.ts";
import LeaveSelectionBottomSheetContent
    from "../features/mainpage/leaveApplication/components/LeaveSelectionBottomSheetContent.tsx";
import LeavePeriodBottomSheet from "../features/mainpage/leaveApplication/components/LeavePeriodBottomSheet.tsx";

const myLeaveDays : LeaveType[] = [
    {leaveTypeCode: '001', leaveTypeName: '연차휴가', leftLeaveDays: 10},
    {leaveTypeCode: '002', leaveTypeName: '저축휴가', leftLeaveDays: 2},
    {leaveTypeCode: '003', leaveTypeName: '자녀돌봄', leftLeaveDays: 1},
    {leaveTypeCode: '004', leaveTypeName: '배우자 출산', leftLeaveDays: 2},
    {leaveTypeCode: '005', leaveTypeName: '배우자 출산', leftLeaveDays: 20},
    {leaveTypeCode: '006', leaveTypeName: '입양', leftLeaveDays: 20},
    {leaveTypeCode: '007', leaveTypeName: '가족돌봄', leftLeaveDays: 10},
    {leaveTypeCode: '008', leaveTypeName: '본인결혼', leftLeaveDays: 5},
    {leaveTypeCode: '009', leaveTypeName: '배우자사망', leftLeaveDays: 5},
    {leaveTypeCode: '010', leaveTypeName: '본인 및 배우자 부모의 사망', leftLeaveDays: 5},
    {leaveTypeCode: '011', leaveTypeName: '본인 및 배우자 형제자매 사망', leftLeaveDays: 1},
    {leaveTypeCode: '012', leaveTypeName: '본인 및 배우자 조부모 사망', leftLeaveDays: 3},
    {leaveTypeCode: '013', leaveTypeName: '자녀결혼', leftLeaveDays: 1},
    {leaveTypeCode: '014', leaveTypeName: '백신접종', leftLeaveDays: 1},
    {leaveTypeCode: '015', leaveTypeName: '건강검진', leftLeaveDays: 1},
    {leaveTypeCode: '016', leaveTypeName: '예비군', leftLeaveDays: 1},
    {leaveTypeCode: '017', leaveTypeName: '보상휴가', leftLeaveDays: 0},
    {leaveTypeCode: '018', leaveTypeName: '대체휴가', leftLeaveDays: 0},
    // {leaveTypeCode: '004', leaveTypeName: '공가', leftLeaveDays: 1}
];



interface DimmedBackgroundProps {
    onBackgroundClick : React.MouseEventHandler<HTMLDivElement>;
    children : React.ReactNode;
    type : 'bottomSheet' | 'modal';
}

const DimmedBackground = ({
        type,
        onBackgroundClick,
        children
    } : DimmedBackgroundProps) => {

    const baseClasses = 'flex bg-black bg-opacity-70 fixed inset-0 text-gray-800';

    const layoutClasses = {
        bottomSheet : 'flex flex-col-reverse',
        modal : 'flex items-center justify-center p-4'
    }

    return (
    <div className={`${baseClasses} ${layoutClasses[type]}`}
         onClick={onBackgroundClick}
    >
        {children}
    </div>
    );
}

const datePickerSvg = <svg className="w-5 text-gray-500"
                           aria-hidden="true" viewBox="0 0 24 24">
    <path
        d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
        fill={"currentColor"}></path>
</svg>;

const currDate = new Date();

function LeaveApplicationPage() {
    const [selectedLeave, setSelectedLeave] = useState<LeaveType>(myLeaveDays.find(leave => leave.leaveTypeCode === '001'));

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
    const [hideBottomSheet, setHideBottomSheet] = useState<boolean>(true);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {openBottomSheet, closeBottomSheet} = useBottomSheet();

    // 휴가종류 선택 핸들러
    const handleLeaveTypeClick = () =>{
        const content =
            <LeaveSelectionBottomSheetContent
                selectedLeave={selectedLeave}
                onLeaveSelect={newSelectedLeave => {
                    if(newSelectedLeave) setSelectedLeave(newSelectedLeave)
                }}
                closeBottomSheet={closeBottomSheet}
            />
        openBottomSheet(content);
    }

    // 휴가기간정보
    const [selectedLeaveProps, setSelectedLeaveProps] = useState<SelectedLeaveProps | null>(null);

    // 휴가기간 선택 핸들러
    const handleLeaveDateClick = () => {
        openBottomSheet(<LeavePeriodBottomSheet
            selectedLeaveProps={selectedLeaveProps}
            onConfirm={setSelectedLeaveProps}
        />);
    }

    //1일 휴가여부 (false는 휴가기간 설정)
    const isOneDayLeave = selectedLeaveProps?.leaveDates.length==1;

    useEffect(() => {
        if(isBottomSheetOpen)
            setHideBottomSheet(false);
    }, [isBottomSheetOpen]);



    return (
        <div className={"flex flex-col gap-4"}>
            <div>
                <div className="font-bold text-xl pt-6 pb-4">휴가 종류를 선택해주세요</div>
                <Card>
                    <Card.Content>
                        <div>
                            <Button variant={"none"}
                                    className={`flex flex-row w-full justify-between px-1 text-gray-800`}
                                    onClick={handleLeaveTypeClick}>
                                <span>{selectedLeave.leaveTypeName}</span>
                                <div>
                                    <span>{selectedLeave.leftLeaveDays}</span>
                                    <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                </div>
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">언제 가시나요?</div>
                <Card>
                    <Card.Content className={"font-normal px-2"}>
                        <div className={"py-2"}
                             onClick={handleLeaveDateClick}
                        >
                            날짜를 선택해주세요
                        </div>
                        {selectedLeaveProps?.leaveDates.length==1 && <>
                            <div className={"flex items-center pb-4"}>
                                <span className={"flex-1"}>휴가일자</span>
                                <div>
                                    <div className={"relative"}>
                                        <input type={"text"}
                                               readOnly={true}
                                               className={"border rounded-md p-1 px-2 w-32 text-sm font-semibold"}
                                               value={format(selectedLeaveProps?.leaveDates[0].dateInfo.date, 'yyyy.M.d(EE)', {locale: ko})}
                                        />
                                        <button className={"absolute right-1 top-1/2 transform -translate-y-1/2"}
                                                onClick={openModal}
                                        >
                                            {datePickerSvg}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <Chip outline={true}
                                      classNames={"px-2 py-1"}
                                      onClick={() => setSelectedLeaveProps({
                                          dateComponentType: 'todayChip',
                                          leaveDates: [
                                              {dateInfo: {date:currDate, yyyyMMdd:format(currDate, 'yyyyMMdd')}}
                                          ]
                                      })}
                                      isSelected={!!(selectedLeaveProps
                                          && selectedLeaveProps.dateComponentType === 'todayChip')}
                                >오늘</Chip>
                                <Chip outline={true}
                                      classNames={"px-2 py-1"}
                                      onClick={() => setSelectedLeaveProps({
                                          dateComponentType: 'tomorrowChip',
                                          leaveDates: [
                                              {dateInfo: {date:addDays(currDate,1), yyyyMMdd:format(addDays(currDate,1), 'yyyyMMdd')}}
                                          ]
                                      })}
                                      isSelected={!!(selectedLeaveProps
                                          && selectedLeaveProps.dateComponentType === 'tomorrowChip')}
                                >내일</Chip>
                                <DropdownChip onChange={(selectedItems) => setSelectedLeaveProps(prev => {
                                    const [{value: sunday}, {value: dist}] = selectedItems;
                                    if (sunday instanceof Date && typeof dist === 'number')
                                        return {
                                            dateComponentType: 'dropdownChip',
                                            leaveDates: [
                                                {dateInfo: {date:addDays(sunday, dist), yyyyMMdd:format(addDays(sunday, dist), 'yyyyMMdd')}}
                                            ]
                                        }
                                    return prev;
                                })}
                                              isSelected={!!(selectedLeaveProps &&
                                                  selectedLeaveProps.dateComponentType === 'dropdownChip')}
                                >
                                    <DropdownChip.DropdownMenu
                                        items={[
                                            {label: '이번주', value: previousSunday(currDate)},
                                            {label: '다음주', value: nextSunday(currDate)},
                                        ]}
                                        defaultIndex={1}
                                    />
                                    <DropdownChip.DropdownMenu
                                        items={['월', '화', '수', '목', '금'].map((day, idx) => {
                                            return {label: day, value: idx + 1}
                                        })}
                                        defaultIndex={0}
                                    />

                                </DropdownChip>
                            </div>
                        </>}

                    </Card.Content>
                </Card>

                {
                    isOneDayLeave &&
                    <Card className={"mt-4"}>
                        <Card.Header>반차 설정</Card.Header>
                        <Card.Content>
                            <div className={"flex items-center gap-2"}>{
                                getHalfLeaveTypes('AM').map(halfLeaveType=>
                                    <Chip outline={true}
                                          classNames={"flex-1 px-2 py-1"}
                                          onClick={()=>handleHalfLeaveSelect(0,halfLeaveType)}
                                          isSelected={isHalfLeaveSelected(0,halfLeaveType)}
                                    >
                                        {halfLeaveType.halfLeaveTypeCdName}
                                    </Chip>)
                            }</div>
                            <div className={"flex items-center gap-2 mt-3"}>{
                                getHalfLeaveTypes('PM').map(halfLeaveType=>
                                    <Chip outline={true}
                                          classNames={"flex-1 px-2 py-1"}
                                          onClick={()=>handleHalfLeaveSelect(0,halfLeaveType)}
                                          isSelected={isHalfLeaveSelected(0,halfLeaveType)}
                                    >
                                        {halfLeaveType.halfLeaveTypeCdName}
                                    </Chip>)
                            }</div>
                            {selectedLeaveProps.leaveDates[0].halfLeaveType?.halfLeaveTypeCd==='A' &&
                                selectedLeaveProps.leaveDates[0].halfLeaveType.dayOffTypeCd==='H' && <div className={"pt-4"}>
                                <Checkbox className={"font-normal text-sm"}>8:00 출근 (12:00 퇴근)</Checkbox>
                            </div>}
                        </Card.Content>
                    </Card>
                }
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">휴가사유를 입력해주세요</div>
                <Card>
                    <Card.Header>휴가 사유</Card.Header>
                    <Card.Content>
                        <textarea className={"appearance-none border w-full h-40 " +
                            "resize-none rounded-md " +
                            "p-2.5 font-normal " +
                            "focus: border"}/>
                    </Card.Content>
                </Card>
            </div>
            {
                isModalOpen &&
                <DimmedBackground type={"modal"}
                                  onBackgroundClick={()=>closeModal()}>
                    <Card className={"max-w-[calc(100vw-4rem)]"}
                          onClick={event => event.stopPropagation()}
                    >
                        <Card.Content>
                            <TeamCalendar
                                initialSelectedDate={selectedLeaveProps?.leaveDates[0].dateInfo.date}
                                initialSelectedDateRange={selectedLeaveProps?.leaveDates.length===2 ?
                                    [...selectedLeaveProps.leaveDates.map(leaveDate=>leaveDate.dateInfo)] : undefined}
                                onDateChange={(dateInfo, dateRange) => {
                                    setSelectedLeaveProps(prev=>{
                                        const newSelectedLeaveProps:SelectedLeaveProps ={
                                            dateComponentType : 'datePicker',
                                            leaveDates : []
                                        };
                                        if(dateRange)
                                            newSelectedLeaveProps.leaveDates.push({dateInfo:dateRange[0]});

                                        newSelectedLeaveProps.leaveDates.push({dateInfo});

                                        return newSelectedLeaveProps;
                                    })
                                }}
                                dateRangePickerMode = {true}
                            />
                            <Button variant={"primary"}
                                    className={"w-full"}
                                    onClick={closeModal}
                            >날짜 선택</Button>
                        </Card.Content>
                    </Card>
                </DimmedBackground>
            }
        </div>
    );
}

export default LeaveApplicationPage;