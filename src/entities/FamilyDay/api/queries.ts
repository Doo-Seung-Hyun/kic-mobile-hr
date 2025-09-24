import {useQuery} from "@tanstack/react-query";
import {getOverTimeHours} from "./api.ts";

export const useOverTimeHoursQuery = (
    empNo : number
)=> {
    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['OverTimeHours', empNo],
        queryFn : ()=>getOverTimeHours(empNo)
    })

    if(isError)
        console.error(error);

    const overTimeHoursResponse = data?.result;

    return {overTimeHoursResponse, isLoading}
}
