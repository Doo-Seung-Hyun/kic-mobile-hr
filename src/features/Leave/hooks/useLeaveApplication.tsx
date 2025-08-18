import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import type {LeaveResultPageProps} from "../../../pages/LeaveResultPage.tsx";
import type {LeaveApplicationHistoryItem} from "../types/leave.ts";
import type {ApiResponse} from "../../../types/common.ts";
import submitLeaveApplicationApi from "../service/leaveApi.ts";

export const useSubmitLeaveApplication = ({
    leaveType,
    leavePeriodProps
}:LeaveResultPageProps) => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn : submitLeaveApplicationApi.submitLeaveApplication,
        onSuccess : data => {
            console.log(data);
            navigate('/leave/result',{
                state : {
                    leaveType,
                    leavePeriodProps
                }
            })
        },
        onError: error => {
            console.log(error);
            alert(error);
        }
    })
}

export const useGetLeaveApplicationHistory = (
    empNo: number,
    startDate : string,
    endDate : string,
)=>{
    const {data, isLoading, isError, error} = useQuery<ApiResponse<LeaveApplicationHistoryItem[]>>({
        queryKey: ['MyLeaveApplicationHistory',empNo, startDate, endDate],
        queryFn: ()=>submitLeaveApplicationApi.getLeaveApplicationHistory(empNo, startDate, endDate),
    });

    if(isError)
        console.error(error);

    return {
        leaveApplicationHistory: data?.result,
        isLoading: isLoading,
        isError
    }
}
export default useSubmitLeaveApplication;