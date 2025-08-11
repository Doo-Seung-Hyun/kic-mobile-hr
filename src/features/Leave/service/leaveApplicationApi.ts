import type {LeaveType, SelectedLeaveProps} from "../../../types/leave.ts";

interface LeaveApplicationRequest {
    empNo: number;
    leaveType : LeaveType;
    leavePeriodProps : SelectedLeaveProps
    rmk? : string;
}

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

const submitLeaveApplicationApi = {
    submitLeaveApplication
};

export default submitLeaveApplicationApi;