export interface Holiday {
    yyyyMMdd: string;
    date: Date;
    name: string;
}

export interface HolidayApiParams {
    startDate: string;
    endDate: string;
}