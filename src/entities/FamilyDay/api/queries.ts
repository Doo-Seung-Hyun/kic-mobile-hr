import {useQuery} from "@tanstack/react-query";
import {getMyFamilyDays, getOverTimeHours} from "./api.ts";

export const useOverTimeHoursQuery = (
    empNo : number
)=> {
    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['OverTimeHours', empNo],
        queryFn : async ()=> await getOverTimeHours(empNo)
    })

    if(isError)
        console.error(error);

    const overTimeHoursResponse = data?.result;

    return {overTimeHoursResponse, isLoading}
}


export const useMyFamilyDaysQuery = (
    empNo: number,
    yyyyMm: string
)=> {
    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['MyFamilyDays', empNo, yyyyMm],
        queryFn : async ()=> await getMyFamilyDays(empNo, yyyyMm),
    });

    if(isError)
        console.error(error);

    const myFamilyDaysResponse = data?.result;

    return {myFamilyDaysResponse, isLoading};
}