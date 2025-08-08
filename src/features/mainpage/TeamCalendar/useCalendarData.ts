import {useEffect, useState} from "react";
import {
    addMonths,
    endOfMonth,
    format,
    parse, startOfMonth,
} from "date-fns";
import type {CalendarDay} from "../../../types/calendar.ts";
import {useHolidaysByPeriod} from "../../Calendar/hooks/useHolidays.ts";
import type {Holiday} from "../../../types/holiday.ts";
import {clearCalendarCache} from "../../../components/ui/Calendar/CalendarGrid.tsx";

interface yyyyMMProps {
    year: number;
    month: number;
    parseDate: ()=>Date;
}

const TODAY = new Date();

const getCalendarGrid = (yyyyMM : string, holidays: Holiday[])=>{
    const startDateOfMonth = parse(yyyyMM+'01','yyyyMMdd',new Date());
    const endDateOfMonth = endOfMonth(parse(yyyyMM,'yyyyMM',new Date()));

    const startDayOfMonth = startDateOfMonth.getDay();
    const calendarGrid:CalendarDay[][] = [];

    const toEmptyCalendarDay = () => {
        return {isEmpty: true};
    };

    const holidaySetOfMonth = new Set<string>(
        holidays
            .filter(holiday => holiday.yyyyMMdd.startsWith(yyyyMM))
            .map(holiday => holiday.yyyyMMdd)
    );

    const _isOffDay = (date: string, day: number)=>{
        return day===0 || day===6 || holidaySetOfMonth.has(date);
    }

    const toCalendarDay = (date:number,
                           day:number,
                           hasFamilyTime: boolean = false,
                           hasLeave: boolean = false) => {
        const fullDate = `${yyyyMM}${date<10? '0':''}${date}`;
        const isOffDay = _isOffDay(fullDate,day);

        return {
            date: String(date),
            fullDate,
            hasFamilyTime: hasFamilyTime,
            hasLeave: hasLeave,
            isEmpty : false,
            isOffDay,
        }
    };

    //첫째주 날짜 채우기
    calendarGrid.push([...Array(7).keys()].map(day=>
        day<startDayOfMonth ?
            toEmptyCalendarDay() :toCalendarDay(day-startDayOfMonth+1,day)
        )
    );

    //2주차~마지막주차 날짜 채우기
    for(let date = Number(calendarGrid[0][6].date)+1, count=0; date<=endDateOfMonth.getDate(); date++, count++){
        if(count%7===0)
            calendarGrid.push([]);
        const day = count%7;
        calendarGrid[calendarGrid.length-1].push(toCalendarDay(date, day));
    }

    // 마지막 날짜가 있는 주 빈칸 채우기
    for(let i=calendarGrid[calendarGrid.length-1].length; i<7; i++)
        calendarGrid[calendarGrid.length-1].push(toEmptyCalendarDay());

    // 6주 높이로 통일
    while(calendarGrid.length < 6) {
        calendarGrid.push([...Array(7).keys()].map(()=>toEmptyCalendarDay()));
    }

    return calendarGrid;
};

const useCalendarData = () =>{
    const [yyyyMM, setYyyyMM] = useState<yyyyMMProps>({
        year:TODAY.getFullYear(),
        month:TODAY.getMonth()+1,
        parseDate: ()=>startOfMonth(TODAY)
    });

    const {data : holidays, holidaysByMonth, isLoading} = useHolidaysByPeriod({
        startDate:`${yyyyMM.year}0101`,
        endDate:`${yyyyMM.year}1231`,
    });

    const [calendarGrids, setCalendarGrids] = useState<CalendarDay[][][]>(() => {
        const initialHolidays: Holiday[] = [];
        return [
            getCalendarGrid(format(addMonths(TODAY, -1), 'yyyyMM'), initialHolidays),
            getCalendarGrid(format(TODAY, 'yyyyMM'), initialHolidays),
            getCalendarGrid(format(addMonths(TODAY, +1), 'yyyyMM'), initialHolidays)
        ];
    });

    const [mountId] = useState(Date.now());

    useEffect(() => {
        const prevYyyyMM = format(addMonths(TODAY, -1), 'yyyyMM');
        const currYyyyMM = format(TODAY, 'yyyyMM');
        const nextYyyyMM = format(addMonths(TODAY, +1), 'yyyyMM');

        if(holidays && holidays.length>0) {
            clearCalendarCache();
            setCalendarGrids([
                getCalendarGrid(prevYyyyMM, holidaysByMonth.get(prevYyyyMM) || []),
                getCalendarGrid(currYyyyMM, holidaysByMonth.get(currYyyyMM) || []),
                getCalendarGrid(nextYyyyMM, holidaysByMonth.get(nextYyyyMM) || [])
            ])
        }
    }, [holidays, isLoading]);

    const [monthIndex, setMonthIndex] = useState<number>(1);

    const [hasTransition, setHasTransition] = useState(false);

    const refreshYyyyMm = (newMonthIndex:number) => {
        setYyyyMM(prev => {
            const nextMonth = addMonths(prev.parseDate(), newMonthIndex===2? 1:-1);
            return {
                year: nextMonth.getFullYear(),
                month: nextMonth.getMonth()+1,
                parseDate: ()=>nextMonth
            }
        });
    }

    const goToNextMonth = () => {
        setHasTransition(true);
        setMonthIndex(2);
        refreshYyyyMm(2);
    }

    const goToPrevMonth = () => {
        setHasTransition(true);
        setMonthIndex(0);
        refreshYyyyMm(0);
    }

    const onTransitionEnd = () => {

        setCalendarGrids(prev=> {
            if(monthIndex===2) {
                const after2Months = format(addMonths(yyyyMM.parseDate(), 1), 'yyyyMM');
                if(!prev)
                    return [];
                return [
                    ...prev.slice(1,3),
                    getCalendarGrid(after2Months, holidaysByMonth.get(after2Months) || []),
                ]
            } else {
                const before2Months = format(addMonths(yyyyMM.parseDate(), -1), 'yyyyMM');
                if(!prev)
                    return [];
                return [
                    getCalendarGrid(before2Months, holidaysByMonth.get(before2Months) || []),
                    ...prev.slice(0,2),
                ]
            }
        });

        setHasTransition(false);
        setMonthIndex(1);
    }

    return {
        currentYear : yyyyMM.year,
        currentMonth : yyyyMM.month,
        goToNextMonth,
        goToPrevMonth,
        calendarData : calendarGrids,
        translateX : monthIndex * -33.333,
        hasTransition,
        onTransitionEnd,
        holidaysByMonth,
        mountId
    }
}

export default useCalendarData;