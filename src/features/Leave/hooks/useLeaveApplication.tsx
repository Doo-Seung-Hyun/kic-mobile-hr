import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import type {LeaveResultPageProps} from "../../../pages/LeaveResultPage.tsx";
import type {LeaveApplicationHistoryItem, LeaveApplicationRequest, UserLeaveBalance} from "../types/leave.ts";
import type {ApiResponse} from "../../../types/common.ts";
import submitLeaveApplicationApi from "../service/leaveApi.ts";

export const useSubmitLeaveApplication = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn : async (requestProps:LeaveApplicationRequest)=>
            submitLeaveApplicationApi.submitLeaveApplication(requestProps),
        onSuccess : (data,variables) => {
            console.log(data);
            navigate('/leave/result',{
                state : {
                    leaveType : variables.leaveType,
                    leavePeriodProps : variables.leavePeriodProps,
                    isModificationRequested : variables.isModificationRequested,
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

    const leaveApplicationHistory = data?.result?.sort((a,b)=>
        a.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd < b.leavePeriodProps.leaveDates[0].dateInfo.yyyyMMdd ? -1:1)

    return {
        leaveApplicationHistory,
        isLoading: isLoading,
        isError
    }
}

export const useGetOldestLeaveYear = (
    empNo: number,
) => {
  const {data, isLoading, isError, error} = useQuery<ApiResponse<string>>({
      queryKey : ['MyLeaveYears',empNo],
      queryFn : ()=>submitLeaveApplicationApi.getOldestLeaveDate(empNo)
  });

  if(isError)
      console.error(error);

  const oldestLeaveYear = Number(data?.result?.substring(0,4)?? '0');

  return {
      oldestLeaveYear,
      isLoading: isLoading,
      isError
  }
}

export const useGetMyLeaveBalances = (
    empNo: number,
) => {
  const {data, isLoading, isError, error} = useQuery<ApiResponse<UserLeaveBalance[]>>({
      queryKey : ['MyLeaveBalance',empNo],
      queryFn : ()=>submitLeaveApplicationApi.getMyLeaveBalance(empNo)
  });

  if(isError)
      console.error(error);

  const myLeaveBalances = data?.result ?? [];

  return {
      myLeaveBalances,
      isLoading: isLoading,
      isError
  }
}

export const useCancelLeaveApplication = (
    empNo: number,
)=> {
    return useMutation({
        mutationFn: async(leaveId:string) => await submitLeaveApplicationApi.cancelLeaveApplication(leaveId, empNo),
        onSuccess: data => console.log(data),
        onError: error => console.error(error)
    });
}

export default useSubmitLeaveApplication;