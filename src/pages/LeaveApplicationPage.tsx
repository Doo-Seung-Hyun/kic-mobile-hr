import React, {useEffect, useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {LeaveType} from "../types/leave.ts";

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

function LeaveApplicationPage(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(true);
    useEffect(() => {
        if(isOpen)
            setHide(false);
    }, [isOpen]);
    return (
        <div>
            <div className="font-bold text-2xl pt-6 pb-4">휴가 종류를 선택해주세요</div>
            <Card className={"py-2"}>
                <Card.Content>
                    <ul>
                        <li className={`flex flex-row justify-between p-2.5`}>
                            <span>{"연차휴가"}</span>
                            <div>
                                <span>10</span>
                                <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                            </div>
                        </li>
                        <li>
                            <Button variant={"none"}
                                    size={"sm"}
                                    className={"block w-full"}
                                    onClick={()=>setIsOpen(true)}
                            >휴가 변경</Button>
                        </li>
                    </ul>
                </Card.Content>
            </Card>

            {
                isOpen &&
                <div className={"flex flex-col-reverse bg-black bg-opacity-70 fixed inset-0"}>
                    <div className={"rounded-t-2xl max-h-[75%] overflow-auto bg-white p-6"}
                         style={{transition: 'transform 0.3s',
                             transform: `translateY(${hide ? '100%' : '0'})`
                         }}
                         onTransitionEnd={()=> {
                             if(hide)
                                setIsOpen(false);
                         }}
                    >
                        <div className={"font-bold text-xl"}>휴가 현황</div>
                        <ul className={"pt-4"}>
                            {myLeaveDays.map(leave=>
                            <li key={leave.leaveTypeCode}
                                className={"block w-full [&:not(:first-child)]:border-t"}>
                                <button onClick={()=>setHide(true)} className={"flex w-full justify-between p-4"}>
                                    <span>{leave.leaveTypeName}</span>
                                    <div>
                                        <span>{leave.leftLeaveDays}</span>
                                        <span>일</span>
                                    </div>
                                </button>
                            </li>)}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

export default LeaveApplicationPage;