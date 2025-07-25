import type {Holiday} from "./holiday.ts";

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
    didSetRangeOfDates : boolean,
    selectedDate? : DateInfo,
    selectedDateRange? : DateInfo[]
}

export interface CalendarGridProps {
    hasTransition : boolean;
    calendarData : CalendarDay[][][];
    holidays : Holiday[];
    translateX : number;
    onTransitionEnd : ()=>void;
    onDateClick? : (yyyyMMdd:string) => void;

    dateSelectionGridProps? : DateSelectionGridProps
}