import MOCK_HOLIDAYS from "../data/mockHolidays.ts";

const getHolidaysByPeriod = async (startDate: string, endDate: string) => {
    await new Promise(resolve => setTimeout(resolve,300));
    return MOCK_HOLIDAYS.filter(holiday=>
        (holiday.date>startDate||holiday.date===startDate) &&
        (holiday.date<endDate||holiday.date===endDate));
}

const holidayApi = {
    getHolidaysByPeriod
};

export default holidayApi;