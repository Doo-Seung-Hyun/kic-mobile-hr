import type {LeaveDate} from "../../Leave/types/leave.ts";
import {useHolidaysByPeriod} from "./useHolidays.ts";
import {calculateBusinessLeaveDays} from "../../../utils/leaveUtils.ts";

const useLeaveCalculation = (leaveDates:LeaveDate[]|null)=>{
    const defaultYear = String(new Date().getFullYear());
    const startYear = leaveDates ? leaveDates[0].dateInfo.yyyyMMdd.substring(0,4) : defaultYear;
    const endYear = leaveDates?.length===1? startYear :
        leaveDates?.length===2? leaveDates[1].dateInfo.yyyyMMdd.substring(0,4) :
            defaultYear;
    const {data : holidays=[]} = useHolidaysByPeriod({
        startDate: `${startYear}0101`,
        endDate: `${endYear}1231`
    });

    const leaveDays = leaveDates ? calculateBusinessLeaveDays(leaveDates, holidays) : 0;

    return {leaveDays};
}

export default useLeaveCalculation;