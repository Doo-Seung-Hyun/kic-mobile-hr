import type {Holiday, HolidayApiParams} from "../../../types/holiday.ts";
import {useQuery} from "@tanstack/react-query";
import HolidayApi from "../service/holidayApi.ts";

export const useHolidaysByPeriod = (holidayApiParams:HolidayApiParams) => {
    const {data, isLoading} = useQuery<Holiday[]>({
        queryKey : ['Holiday', holidayApiParams.startDate, holidayApiParams.endDate],
        queryFn : () => HolidayApi.getHolidaysByPeriod(holidayApiParams),
    });
    return {data, isLoading};
}