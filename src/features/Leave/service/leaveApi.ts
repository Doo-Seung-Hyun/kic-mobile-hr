import type {
    LeaveApplicationHistoryItem,
    LeaveApplicationRequest,
    LeaveType,
    SelectedLeaveProps, UserLeaveBalance
} from "../types/leave.ts";
import MOCK_LEAVE_REQUEST_HISTORY from "../data/mockLeaveRequestHistory.ts";
import type {ApiResponse} from "../../../types/common.ts";


interface LeaveApplicationResponse {
    isSuccess: boolean;
    message?: string;
}

const submitLeaveApplication = async (
    leaveApplicationRequest : LeaveApplicationRequest
):Promise<LeaveApplicationResponse> => {
    return await new Promise((resolve,reject) =>
        setTimeout(()=>{
            if(Math.random()>=0.1){
                resolve({
                    isSuccess: true,
                    message: '휴가신청이 완료되었습니다'
                })
            }else {
                reject(new Error('휴가신청 중 오류가 발생했습니다. 관리자에게 문의하시기 바랍니다.'));
            }
        },2000));
}

const getLeaveApplicationHistory = async (
    empNo : number,
    startDate : string,
    endDate : string,
):Promise<ApiResponse<LeaveApplicationHistoryItem[]>> => {
    return await new Promise((resolve,reject) =>
        setTimeout(()=>{
            resolve({
                isSuccess: true,
                message : '휴가신청내역 조회가 완료되었습니다.',
                result : MOCK_LEAVE_REQUEST_HISTORY.filter(
                    item=>
                        item.empNo===empNo &&
                        item.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd>=startDate &&
                        item.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd<=endDate
                )
            })
        },2000)
    )
}

const getOldestLeaveDate = async (
    empNo : number,
):Promise<ApiResponse<string>> => {
  return await new Promise((resolve,reject) =>
      setTimeout(()=>{
          resolve({
              isSuccess: true,
              message: '사용한 휴가연도 조회가 완료되었습니다.',
              result: '2023'
          })
      },500)
  )
}

const getMyLeaveBalance = async (
    empNo: number,
):Promise<ApiResponse<UserLeaveBalance[]>> => {
    return await new Promise(resolve =>
        setTimeout(()=>{
            resolve({
                isSuccess: true,
                message : '나의 휴가현황 조회가 완료되었습니다.',
                result : [
                    {
                        "leaveType": {
                            "leaveTypeCode": "001",
                            "leaveTypeName": "연차휴가",
                            //"icon": <Plane />
                        },
                        "leftLeaveDays": 10,
                        "totalLeaveDays": 15
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "002",
                            "leaveTypeName": "저축휴가",
                            //"icon": <PiggyBank />
                        },
                        "leftLeaveDays": 2,
                        "totalLeaveDays": 4
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "003",
                            "leaveTypeName": "자녀돌봄",
                            //"icon": <Rabbit />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 2
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "004",
                            "leaveTypeName": "배우자 출산",
                            //"icon": <Baby />
                        },
                        "leftLeaveDays": 2,
                        "totalLeaveDays": 2
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "005",
                            "leaveTypeName": "배우자 유,사산",
                            //"icon": <Droplet />
                        },
                        "leftLeaveDays": 3,
                        "totalLeaveDays": 3
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "006",
                            "leaveTypeName": "입양",
                            //"icon": <Baby />
                        },
                        "leftLeaveDays": 20,
                        "totalLeaveDays": 20
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "007",
                            "leaveTypeName": "가족돌봄",
                            //"icon": <HeartHandshake />
                        },
                        "leftLeaveDays": 10,
                        "totalLeaveDays": 10
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "008",
                            "leaveTypeName": "본인결혼",
                            //"icon": <Heart />
                        },
                        "leftLeaveDays": 5,
                        "totalLeaveDays": 5
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "009",
                            "leaveTypeName": "배우자사망",
                            //"icon": <Droplet />
                        },
                        "leftLeaveDays": 5,
                        "totalLeaveDays": 5
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "010",
                            "leaveTypeName": "본인 및 배우자 부모의 사망",
                            //"icon": <Droplet />
                        },
                        "leftLeaveDays": 5,
                        "totalLeaveDays": 5
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "011",
                            "leaveTypeName": "본인 및 배우자 형제자매 사망",
                            //"icon": <Droplet />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 1
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "012",
                            "leaveTypeName": "본인 및 배우자 조부모 사망",
                            //"icon": <Droplet />
                        },
                        "leftLeaveDays": 3,
                        "totalLeaveDays": 3
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "013",
                            "leaveTypeName": "자녀결혼",
                            //"icon": <PartyPopper />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 1
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "014",
                            "leaveTypeName": "백신접종",
                            //"icon": <Syringe />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 1
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "015",
                            "leaveTypeName": "건강검진",
                            //"icon": <Stethoscope />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 1
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "016",
                            "leaveTypeName": "예비군",
                            //"icon": <Shield />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 1
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "017",
                            "leaveTypeName": "보상휴가",
                            //"icon": <Award />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 2
                    },
                    {
                        "leaveType": {
                            "leaveTypeCode": "018",
                            "leaveTypeName": "대체휴가",
                            //"icon": <Star />
                        },
                        "leftLeaveDays": 1,
                        "totalLeaveDays": 2
                    }
                ]
            })
        },2000)
    )
}

const cancelLeaveApplication = async (
    leaveId: string,
    empNo: number,
):Promise<ApiResponse<void>> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                isSuccess: true,
                message: '휴가취소 신청을 완료했습니다.'
            })
        }, 500)
    })
}

const submitLeaveApplicationApi = {
    submitLeaveApplication,
    getLeaveApplicationHistory,
    getOldestLeaveDate,
    getMyLeaveBalance,
    cancelLeaveApplication,
};

export default submitLeaveApplicationApi;