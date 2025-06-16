import React, {useEffect, useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {LeaveType} from "../types/leave.ts";
import TeamCalendar from "../features/mainpage/TeamCalendar/TeamCalendar.tsx";
import Chip from "../components/ui/Chip.tsx";
import DropdownChip from "../components/ui/DropdownChip.tsx";

const arrowDownSvg = <span><svg
    width="8"
    viewBox="0 0 10 6"
    fill="none"
    className={`ml-1 inline`}
>
      <path
          d="M1 1L5 5L9 1"
          stroke="#323234"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
      />
</svg></span>;

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
        bottomSheet : 'flex flex-row-reverse',
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

const checkedSvg = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        data-seed-icon="true" data-seed-icon-version="0.0.21" width="18"
                        height="18" className="_1ks49b8e">
    <g>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.2424 3.55704C22.7631 3.96703 22.8528 4.72151 22.4428 5.24222L10.632 20.2422C10.4171 20.5151 10.0945 20.6816 9.7475 20.6984C9.40053 20.7153 9.06327 20.581 8.82289 20.3302L1.6337 12.8302C1.17509 12.3518 1.19116 11.5922 1.6696 11.1336C2.14804 10.675 2.90767 10.691 3.36628 11.1695L9.60029 17.673L20.5572 3.75749C20.9672 3.23679 21.7216 3.14705 22.2424 3.55704Z"
              fill="rgb(38, 86, 201)"></path>
    </g>
</svg>;

const datePickerSvg = <svg className="w-5 text-gray-500"
                           aria-hidden="true" viewBox="0 0 24 24">
    <path
        d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
        fill={"currentColor"}></path>
</svg>;



function LeaveApplicationPage(props) {
    const [selectedLeave, setSelectedLeave] = useState<LeaveType>(myLeaveDays.find(leave => leave.leaveTypeCode === '001'));

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
    const [hideBottomSheet, setHideBottomSheet] = useState<boolean>(true);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [menusOpen, setMenusOpen] = useState<boolean[]>([false,false]);

    const onLeaveItemClickOfBottomSheet = (leaveTypeCode: string) => {
        const selectedLeave = myLeaveDays.find(leave=>
            leave.leaveTypeCode===leaveTypeCode);
        setSelectedLeave(selectedLeave);
    }

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
                        <div className={`flex flex-row justify-between pb-3 text-gray-800`}>
                            <span>{selectedLeave.leaveTypeName}</span>
                            <div>
                                <span>{selectedLeave.leftLeaveDays}</span>
                                <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                            </div>
                        </div>
                        <div className={"pt-2 border-t"}>
                            <Button variant={"none"}
                                    size={"sm"}
                                    className={"block w-full font-semibold pt-0 pb-0 underline underline-offset-4"}
                                    onClick={()=>setIsBottomSheetOpen(true)}
                            >휴가변경</Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">언제 가시나요?</div>
                <Card>
                    <Card.Content className={"font-normal"}>
                        {/*<div className={"flex justify-between"}>*/}
                        {/*    <span>2일 이상</span>*/}
                        {/*    <div>*/}
                        {/*        <div className={"w-10 h-6 bg-blue-600 rounded-full p-0.5"}>*/}
                        {/*            <div className={"aspect-square max-h-full bg-white rounded-full"}></div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={"flex items-center pb-2"}>
                            <span className={"flex-1"}>휴가일자</span>
                            <div>
                                <div className={"relative"}>
                                    <input type={"text"}
                                           readOnly={true}
                                           className={"border rounded-md p-1 px-2 w-32 text-sm font-semibold"}
                                    />
                                    <button className={"absolute right-1 top-1/2 transform -translate-y-1/2"}>
                                        {datePickerSvg}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"flex items-center gap-3 pb-3"}>
                            <Chip outline={true}
                                  classNames={"px-3 py-1"}>오늘</Chip>
                            <Chip outline={true}
                                  classNames={"px-3 py-1"}>내일</Chip>
                            <DropdownChip dropdownGroup={[{
                                id: 'week',
                                items: [{label:'이번주', value:'01'}, {label:'다음주', value:'02'}],
                                defaultValue: '02'
                            }, {
                                id: 'day',
                                items: [{label:'월', value:'01'}, {label:'화', value:'02'}
                                    , {label:'수', value:'03'}, {label:'목', value:'04'}
                                    , {label:'금', value:'05'}],
                                defaultValue: '01'
                            }]} />
                        </div>
                        <div>
                            <span>종료일</span>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            {
                isBottomSheetOpen &&
                <DimmedBackground type={"bottomSheet"}
                                  onBackgroundClick={()=>setHideBottomSheet(true)} >
                    <div className={"rounded-t-2xl max-h-[75%] overflow-auto bg-white p-6"}
                         style={{transition: 'transform 0.3s',
                             transform: `translateY(${hideBottomSheet ? '100%' : '0'})`
                         }}
                         onTransitionEnd={()=> {
                             if(hideBottomSheet)
                                setIsBottomSheetOpen(false);
                         }}
                    >
                        <div className={"font-bold text-xl"}>휴가 현황</div>
                        <ul className={"pt-4"}>
                            {myLeaveDays.map(leave=>
                            <li key={leave.leaveTypeCode}
                                className={"block w-full [&:not(:first-child)]:border-t"}>
                                <button onClick={()=>onLeaveItemClickOfBottomSheet(leave.leaveTypeCode)}
                                        className={"flex w-full justify-between py-3 items-center " +
                                            `${leave.leaveTypeCode===selectedLeave.leaveTypeCode && 'text-blue-700'}`}>
                                    <div className={"flex flex-col text-left"}>
                                        <span className={"font-bold"}>{leave.leaveTypeName}</span>
                                        <span className={"text-sm"}>{leave.leftLeaveDays}일</span>
                                    </div>
                                    <div>
                                        {leave.leaveTypeCode===selectedLeave.leaveTypeCode &&
                                        checkedSvg}
                                    </div>
                                </button>
                            </li>)}
                        </ul>
                    </div>
                </DimmedBackground>
            }
            {
                isModalOpen &&
                <DimmedBackground type={"modal"}
                                  onBackgroundClick={()=>null}>
                    <Card className={"max-w-[calc(100vw-4rem)]"}>
                        <Card.Content>
                            <TeamCalendar/>
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