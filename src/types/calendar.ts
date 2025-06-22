export interface CalendarDay {
    date?: string;
    fullDate?: string;
    hasLeave?: boolean;
    hasFamilyTime?: boolean;
    isEmpty?: boolean;

}

export interface DateInfo {
    date : Date;
    yyyyMMdd : string;
}

export interface DateSelectionGridProps {
    isDateRangePickerMode : boolean
    selectedDate : DateInfo,
    didSetRangeOfDates : boolean,
    selectedDateRange? : DateInfo[]
}

export interface CalendarGridProps {
    hasTransition : boolean;
    calendarData : CalendarDay[][][];
    translateX : number;
    onTransitionEnd : ()=>void;
    onDateClick? : (yyyyMMdd:string) => void;

    dateSelectionGridProps? : DateSelectionGridProps
}