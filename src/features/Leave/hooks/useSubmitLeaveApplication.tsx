import {useMutation} from "@tanstack/react-query";
import leaveApplicationApi from "../service/leaveApplicationApi.ts";
import {useNavigate} from "react-router-dom";
import type {LeaveResultPageProps} from "../../../pages/LeaveResultPage.tsx";

const useSubmitLeaveApplication = ({
    leaveType,
    leavePeriodProps
}:LeaveResultPageProps) => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn : leaveApplicationApi.submitLeaveApplication,
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
export default useSubmitLeaveApplication;