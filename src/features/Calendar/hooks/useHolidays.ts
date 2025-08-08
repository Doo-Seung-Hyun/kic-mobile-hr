import type {Holiday, HolidayApiParams} from "../../../types/holiday.ts";
import {useQuery} from "@tanstack/react-query";
import HolidayApi from "../service/holidayApi.ts";
import {useMemo} from "react";

export const useHolidaysByPeriod = (holidayApiParams:HolidayApiParams) => {
    const {data, isLoading} = useQuery<Holiday[]>({
        queryKey : ['Holiday', holidayApiParams.startDate, holidayApiParams.endDate],
        queryFn : () => HolidayApi.getHolidaysByPeriod(holidayApiParams),
    });

    const holidaysByMonth = useMemo(() => {
        const map = new Map<string, Holiday[]>();
        if(!data)
            return map;

        data.forEach((holiday: Holiday) => {
            const monthKey = holiday.yyyyMMdd.substring(0,6);
            map.set(monthKey,
                map.has(monthKey) ?
                    [...map.get(monthKey)!, holiday] :
                    [holiday]
            );
        });
        return map;
    }, [data]);

    return {data, holidaysByMonth, isLoading};
}