import {useEffect, useState} from "react";
import {
    addMonths,
    endOfMonth,
    format,
    parse, startOfMonth,
} from "date-fns";
import type {CalendarDay} from "../../../types/calendar.ts";

interface yyyyMMProps {
    year: number;
    month: number;
    parseDate: ()=>Date;
}

const TODAY = new Date();

const getCalendarGrid = (yyyyMM : string)=>{
    const startDateOfMonth = parse(yyyyMM+'01','yyyyMMdd',new Date());
    const endDateOfMonth = endOfMonth(parse(yyyyMM,'yyyyMM',new Date()));

    const startDayOfMonth = startDateOfMonth.getDay();
    const calendarGrid:string[][] = [];

    calendarGrid.push([...Array(7).keys()].map(day=>
        day<startDayOfMonth ? '' : String(day-startDayOfMonth+1)));

    for(let date = Number(calendarGrid[0][6])+1, count=0; date<=endDateOfMonth.getDate(); date++, count++){
        if(count%7===0)
            calendarGrid.push([]);
        calendarGrid[calendarGrid.length-1].push(String(date));
    }
    for(let i=calendarGrid[calendarGrid.length-1].length; i<7; i++)
        calendarGrid[calendarGrid.length-1].push('');

    return calendarGrid;
};

const useCalendarData = () =>{
    const [yyyyMM, setYyyyMM] = useState<yyyyMMProps>({
        year:TODAY.getFullYear(),
        month:TODAY.getMonth()+1,
        parseDate: ()=>startOfMonth(TODAY)
    })
    const [calendarGrids, setCalendarGrids] = useState<string[][][]>([
        getCalendarGrid(format(addMonths(TODAY,-1),'yyyyMM')),
        getCalendarGrid(format(TODAY,'yyyyMM')),
        getCalendarGrid(format(addMonths(TODAY,+1),'yyyyMM'))
    ]);

    const [monthIndex, setMonthIndex] = useState<number>(1);

    const [hasTransition, setHasTransition] = useState(false);

    const goToNextMonth = () => {
        setHasTransition(true);
        setMonthIndex(2);
    }

    const goToPrevMonth = () => {
        setHasTransition(true);
        setMonthIndex(0);
    }

    const onTransitionEnd = () => {
        console.log('############')
        setYyyyMM(prev => {
            const nextMonth = addMonths(prev.parseDate(), monthIndex===2? 1:-1);
            return {
                year: nextMonth.getFullYear(),
                month: nextMonth.getMonth()+1,
                parseDate: ()=>nextMonth
            }
        });
        setCalendarGrids(prev=> {
            if(monthIndex===2) {
                const after2Months = addMonths(yyyyMM.parseDate(), 2);
                return [
                    ...prev.slice(1,3),
                    getCalendarGrid(format(after2Months, 'yyyyMM')),
                ]
            } else {
                const before2Months = addMonths(yyyyMM.parseDate(), -2);
                return [
                    getCalendarGrid(format(before2Months, 'yyyyMM')),
                    ...prev.slice(0,2),
                ]
            }
        });

        setHasTransition(false);
        setMonthIndex(1);
    }

    const calendarData:CalendarDay[][][] = calendarGrids.map(month=>
        month.map(week =>
            week.map(date => ({
                    date,
                    hasLeave: false,
                    hasFamilyTime: false
                })
            )
        )
    );

    return {
        TODAY,
        currentYear : yyyyMM.year,
        currentMonth : yyyyMM.month,
        goToNextMonth,
        goToPrevMonth,
        calendarData,
        translateX : monthIndex * -33.333,
        hasTransition,
        onTransitionEnd
    }
}

export default useCalendarData;