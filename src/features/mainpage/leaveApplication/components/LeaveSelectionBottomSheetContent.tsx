import type {LeaveType, UserLeaveBalance} from "../../../Leave/types/leave.ts";
import Button from "../../../../components/ui/Button.tsx";
import {
    Award,
    Baby,
    Droplet,
    Heart,
    HeartHandshake,
    PartyPopper,
    PiggyBank,
    Plane,
    Rabbit, Shield, Star, Stethoscope,
    Syringe,
    ToyBrick
} from "lucide-react";

interface LeaveSelectionBottomSheetContentProps {
    selectedLeave? : LeaveType | null;
    onLeaveSelect : (selectedLeave:LeaveType | undefined, leaveBalance:number)=>void;
    closeBottomSheet : ()=>void;
}

const myLeaveBalances : UserLeaveBalance[] = [
    {
        "leaveType": {
            "leaveTypeCode": "001",
            "leaveTypeName": "연차휴가",
            "icon": <Plane />
        },
        "leftLeaveDays": 10,
        "totalLeaveDays": 15
    },
    {
        "leaveType": {
            "leaveTypeCode": "002",
            "leaveTypeName": "저축휴가",
            "icon": <PiggyBank />
        },
        "leftLeaveDays": 2,
        "totalLeaveDays": 4
    },
    {
        "leaveType": {
            "leaveTypeCode": "003",
            "leaveTypeName": "자녀돌봄",
            "icon": <Rabbit />
        },
        "leftLeaveDays": 1,
        "totalLeaveDays": 2
    },
    {
        "leaveType": {
            "leaveTypeCode": "004",
            "leaveTypeName": "배우자 출산",
            "icon": <Baby />
        },
        "leftLeaveDays": 2,
        "totalLeaveDays": 2
    },
    {
        "leaveType": {
            "leaveTypeCode": "005",
            "leaveTypeName": "배우자 유,사산",
            "icon": <Droplet />
        },
        "leftLeaveDays": 3,
        "totalLeaveDays": 3
    },
    {
        "leaveType": {
            "leaveTypeCode": "006",
            "leaveTypeName": "입양",
            "icon": <Baby />
        },
        "leftLeaveDays": 20,
        "totalLeaveDays": 20
    },
    {
        "leaveType": {
            "leaveTypeCode": "007",
            "leaveTypeName": "가족돌봄",
            "icon": <HeartHandshake />
        },
        "leftLeaveDays": 10,
        "totalLeaveDays": 10
    },
    {
        "leaveType": {
            "leaveTypeCode": "008",
            "leaveTypeName": "본인결혼",
            "icon": <Heart />
        },
        "leftLeaveDays": 5,
        "totalLeaveDays": 5
    },
    {
        "leaveType": {
            "leaveTypeCode": "009",
            "leaveTypeName": "배우자사망",
            "icon": <Droplet />
        },
        "leftLeaveDays": 5,
        "totalLeaveDays": 5
    },
    {
        "leaveType": {
            "leaveTypeCode": "010",
            "leaveTypeName": "본인 및 배우자 부모의 사망",
            "icon": <Droplet />
        },
        "leftLeaveDays": 5,
        "totalLeaveDays": 5
    },
    {
        "leaveType": {
            "leaveTypeCode": "011",
            "leaveTypeName": "본인 및 배우자 형제자매 사망",
            "icon": <Droplet />
        },
        "leftLeaveDays": 1,
        "totalLeaveDays": 1
    },
    {
        "leaveType": {
            "leaveTypeCode": "012",
            "leaveTypeName": "본인 및 배우자 조부모 사망",
            "icon": <Droplet />
        },
        "leftLeaveDays": 3,
        "totalLeaveDays": 3
    },
    {
        "leaveType": {
            "leaveTypeCode": "013",
            "leaveTypeName": "자녀결혼",
            "icon": <PartyPopper />
        },
        "leftLeaveDays": 1,
        "totalLeaveDays": 1
    },
    {
        "leaveType": {
            "leaveTypeCode": "014",
            "leaveTypeName": "백신접종",
            "icon": <Syringe />
        },
        "leftLeaveDays": 1,
        "totalLeaveDays": 1
    },
    {
        "leaveType": {
            "leaveTypeCode": "015",
            "leaveTypeName": "건강검진",
            "icon": <Stethoscope />
        },
        "leftLeaveDays": 1,
        "totalLeaveDays": 1
    },
    {
        "leaveType": {
            "leaveTypeCode": "016",
            "leaveTypeName": "예비군",
            "icon": <Shield />
        },
        "leftLeaveDays": 1,
        "totalLeaveDays": 1
    },
    {
        "leaveType": {
            "leaveTypeCode": "017",
            "leaveTypeName": "보상휴가",
            "icon": <Award />
        },
        "leftLeaveDays": 0,
        "totalLeaveDays": 2
    },
    {
        "leaveType": {
            "leaveTypeCode": "018",
            "leaveTypeName": "대체휴가",
            "icon": <Star />
        },
        "leftLeaveDays": 0,
        "totalLeaveDays": 2
    }
];

const checkedSvg = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        data-seed-icon="true" data-seed-icon-version="0.0.21" width="18"
                        height="18" className="_1ks49b8e">
    <g>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.2424 3.55704C22.7631 3.96703 22.8528 4.72151 22.4428 5.24222L10.632 20.2422C10.4171 20.5151 10.0945 20.6816 9.7475 20.6984C9.40053 20.7153 9.06327 20.581 8.82289 20.3302L1.6337 12.8302C1.17509 12.3518 1.19116 11.5922 1.6696 11.1336C2.14804 10.675 2.90767 10.691 3.36628 11.1695L9.60029 17.673L20.5572 3.75749C20.9672 3.23679 21.7216 3.14705 22.2424 3.55704Z"
              fill="rgb(38, 86, 201)"></path>
    </g>
</svg>;

const LeaveSelectionBottomSheetContent = ({
    selectedLeave = null,
    onLeaveSelect,
    closeBottomSheet
}:LeaveSelectionBottomSheetContentProps) => {

    const handleLeaveSelect = (selectedLeaveTypeCode: string) => {
        const selectedLeave = myLeaveBalances.find(leaveBalance =>
            leaveBalance.leaveType.leaveTypeCode === selectedLeaveTypeCode)
        onLeaveSelect(selectedLeave?.leaveType, selectedLeave!.leftLeaveDays);
        closeBottomSheet();
    }

    return (<>
        <div className={"font-bold text-xl"}>휴가 현황</div>
        <ul className={"pt-4"}>
            {myLeaveBalances.map(leaveBalance=>
                <li key={leaveBalance.leaveType.leaveTypeCode}
                    className={"block w-full [&:not(:first-child)]:border-t"}>
                    <Button onClick={()=>handleLeaveSelect(leaveBalance.leaveType.leaveTypeCode)}
                            variant={"none"}
                            className={"flex w-full justify-between py-3 items-center " +
                                `${leaveBalance.leaveType.leaveTypeCode===selectedLeave?.leaveTypeCode && 'text-blue-700'}`}
                            disabled={leaveBalance.leftLeaveDays === 0} >
                        <div className={"flex flex-col text-left"}>
                            <span className={"font-bold"}>{leaveBalance.leaveType.leaveTypeName}</span>
                            <span className={"text-sm"}>{leaveBalance.leftLeaveDays}일</span>
                        </div>
                        <div>
                            {leaveBalance.leaveType.leaveTypeCode===selectedLeave?.leaveTypeCode &&
                                checkedSvg}
                        </div>
                    </Button>
                </li>)}
        </ul>
    </>);
}

export default LeaveSelectionBottomSheetContent;