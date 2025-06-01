import Card from "../components/ui/Card.tsx";
import {useEffect, useRef, useState} from "react";

interface LeaveType {
    leaveTypeName: string;
    leftLeaveDays: number;
}

interface ScheduledLeaves {

}

const myLeaveDays : LeaveType[] = [
    {leaveTypeName: '연차휴가', leftLeaveDays: 10},
    {leaveTypeName: '보상휴가', leftLeaveDays: 2},
    {leaveTypeName: '대체휴가', leftLeaveDays: 4},
    {leaveTypeName: '공가', leftLeaveDays: 1}
];

function MainPage(props) {
    const [isLeaveListExpanded, setIsLeaveListExpanded] = useState<boolean>(false);
    const [expandableLeaveListHeight, setExpandableLeaveListHeight] = useState<number>(0);
    const expandableLeaveListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setExpandableLeaveListHeight(expandableLeaveListRef.current.scrollHeight);
    }, [myLeaveDays]);

    const toggleExpandingLeaveList = ():void =>{
        setIsLeaveListExpanded(prev=>!prev);
    }

    return (
        <div className="text-gray-800">
            {/*휴가 현황*/}
            <Card>
                <Card.Header>휴가 현황</Card.Header>
                <Card.Content>
                    <ul>
                        {myLeaveDays.slice(0,1).map(leave =>
                            <li className="flex flex-row justify-between p-2.5">
                                <span>{leave.leaveTypeName}</span>
                                <div>
                                    {leave.leftLeaveDays}
                                    <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                </div>
                            </li>
                        )}
                    </ul>
                    {myLeaveDays.length > 1 &&
                        <>
                            <ul className={'overflow-hidden transition-[height] duration-300 ease-in-out'}
                                style={{height: isLeaveListExpanded? `${expandableLeaveListHeight}px` : '0px'}}
                                ref={expandableLeaveListRef}>
                                {myLeaveDays.slice(1, myLeaveDays.length).map(leave =>
                                    <li className="flex flex-row justify-between p-2.5">
                                        <span>{leave.leaveTypeName}</span>
                                        <div>
                                            {leave.leftLeaveDays}
                                            <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <button
                                className="block font-normal w-full bg-gray-100 rounded-md border-gray-400 p-2 mt-2"
                                onClick={toggleExpandingLeaveList}>
                                <span>{isLeaveListExpanded ? '접기' : '더보기'}</span>
                                <span><svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    className={`ml-1 inline ${isLeaveListExpanded? 'rotate-180':''}`}
                                >
                              <path
                                  d="M1 1L5 5L9 1"
                                  stroke="#929294"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              />
                            </svg></span>
                            </button>
                        </>
                    }
                </Card.Content>
            </Card>
            {/*예정 휴가*/}
            <Card>
                <Card.Header>예정 휴가</Card.Header>
                <Card.Content>
                    {myLeaveDays.map(leave =>
                        <div className="flex flex-row justify-between p-2">
                            <span>{leave.leaveTypeName}</span>
                            <div>
                                {leave.leftLeaveDays}
                                <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                            </div>
                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
}

export default MainPage;