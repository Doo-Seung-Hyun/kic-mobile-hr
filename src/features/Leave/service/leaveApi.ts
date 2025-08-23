import type {
    LeaveApplicationHistoryItem,
    LeaveApplicationRequest,
    LeaveType,
    SelectedLeaveProps
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
                result : MOCK_LEAVE_REQUEST_HISTORY
            })
        },2000)
    )
}

const getLeaveYears = async (
    empNo : number,
):Promise<ApiResponse<number[]>> => {
  return await new Promise((resolve,reject) =>
      setTimeout(()=>{
          resolve({
              isSuccess: true,
              message: '사용한 휴가연도 조회가 완료되었습니다.',
              result: [2025,2024,2023,2022]
          })
      },500)
  )
}

const submitLeaveApplicationApi = {
    submitLeaveApplication,
    getLeaveApplicationHistory,
    getLeaveYears,
};

export default submitLeaveApplicationApi;