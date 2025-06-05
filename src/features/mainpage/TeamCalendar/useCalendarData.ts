import {useState} from "react";
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isAfter,
    isBefore,
    parse,
    startOfWeek
} from "date-fns";
import type {CalendarDay} from "../../../types/calendar.ts";

const getCalendarGrid = (yyyyMM : string)=>{
    const startDateOfMonth = parse(yyyyMM+'01','yyyyMMdd',new Date());
    const endDateOfMonth = endOfMonth(parse(yyyyMM,'yyyyMM',new Date()));
    const calendarStart = startOfWeek(startDateOfMonth, {weekStartsOn: 0});
    const calendarEnd = endOfWeek(endDateOfMonth,{weekStartsOn: 0});

    const daysOfMonth = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd
    });

    const calendarGrid : (Date | null)[][] = [];
    daysOfMonth.forEach((day,index)=>{
        if(index%7===0){
            calendarGrid.push([]);
        }
        if(isBefore(day,startDateOfMonth) || isAfter(day,endDateOfMonth)){
            calendarGrid[calendarGrid.length-1].push(null);
        }else {
            calendarGrid[calendarGrid.length - 1].push(day);
        }

    });
    return calendarGrid;
};

const useCalendarData = () =>{
    const [date, setDate] = useState<Date>(new Date());

    const calendarGrid = getCalendarGrid(format(date,'yyyyMM'));

    const goToNextMonth = ()=>setDate(addMonths(date,1));
    const goToPrevMonth = ()=>setDate(addMonths(date,-1));

    const calendarData:CalendarDay[][] = calendarGrid.map(week =>
        week.map(date => ({
                date,
                hasLeave: false,
                hasFamilyTime: false
            })
        )
    );

    return {
        date,
        goToNextMonth,
        goToPrevMonth,
        calendarData
    }
}

export default useCalendarData;