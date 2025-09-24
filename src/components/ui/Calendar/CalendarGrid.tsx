import React, {memo, type ReactElement} from "react";
import type {CalendarDay, CalendarGridProps, DateSelectionGridProps} from "../../../types/calendar.ts";
import {differenceInMonths, format, parse} from "date-fns";

interface MonthGridProps {
    calendarMonthData : CalendarDay[][];
    dateSelectionGridProps? : DateSelectionGridProps;
    onDateClick? : (yyyyMMdd:string) => void;
    canSelectOffDay? : boolean;
    monthKey : string;
}

type CachedMonthGridProps = MonthGridProps & {mountId : number}

const DaysHeader: React.FC = memo(() =>
    <div className="flex flex-row h-8 text-gray-600">
        {['S', 'M', "T", 'W', 'T', 'F', 'S'].map((day, index) =>
            <div key={index}
                 className={`flex-1 ${(index == 0 || index == 6) && 'text-gray-400'}`}>{day}</div>
        )}
    </div>);

const today = new Date();
const todayYyyyMMdd = format(today, 'yyyyMMdd');

const monthGridCache = new Map<string, ReactElement>();

const MonthGrid = ({
    calendarMonthData,
    dateSelectionGridProps,
    onDateClick,
    canSelectOffDay = true,
    monthKey
}:MonthGridProps)=>{
    //선택된 날짜 그리드 정보
    const {
        selectedDate,
        didSetRangeOfDates = false,
        selectedDateRange
    } = dateSelectionGridProps || {};

    let rangeStart='', rangeEnd='';
    if(selectedDateRange) {
        rangeStart = selectedDateRange[0].yyyyMMdd;
        rangeEnd = selectedDateRange[1].yyyyMMdd;
    }

    const isDateToRenderCircle = (yyyyMMdd:string|undefined) =>
        yyyyMMdd && (
            (!didSetRangeOfDates && selectedDate?.yyyyMMdd === yyyyMMdd) ||
            (didSetRangeOfDates && rangeStart === yyyyMMdd) ||
            (didSetRangeOfDates && rangeEnd === yyyyMMdd)
        );

    return <div className={"flex-1 flex flex-col gap-0.5"}
                key={monthKey}>
        {calendarMonthData.map((week, weekIndex) =>
            <div className={"flex flex-row h-9"}
                 key={weekIndex}
            >
                {week.map((calendarDay, dayIndex) => {
                    const {date, fullDate, hasLeave, hasFamilyTime, isEmpty, isOffDay} = calendarDay;

                    //날짜가 없는 경우 (다른 달인 경우)
                    if(isEmpty)
                        return <div className={"flex-1"} key={dayIndex} />;

                    //정상
                    return <button className={'flex-1 relative'
                        + `${isOffDay? ' text-gray-400':''}`}
                                   key={dayIndex}
                                   disabled={!canSelectOffDay && isOffDay}
                                   onClick={()=> {
                                       if(onDateClick && fullDate)
                                           onDateClick(fullDate);
                                   }}
                    >
                        <div className={"flex flex-col justify-center items-center h-full relative z-10"}>
                                    <span className={isDateToRenderCircle(fullDate) ? 'text-white' : ''}
                                    >{date}</span>
                            <div className={"flex h-1.5 justify-center gap-1"}>
                                {(hasLeave || date=='15' || date=='22' || date=='23' || date=='29' || date=='30') &&
                                    <div className={"w-1.5 h-1.5 bg-blue-500 rounded-full"}/>}
                                {(!hasFamilyTime && Number(date)%3==0 || date=='25' || date=='26') &&
                                    <div className={"w-1.5 h-1.5 bg-lime-500 rounded-full"}/>}
                            </div>
                        </div>
                        {isDateToRenderCircle(fullDate) &&
                            < div className={["absolute h-full top-0 z-[5] ",
                                "left-1/2 transform -translate-x-1/2 aspect-square rounded-full",
                                'bg-blue-700',
                            ].filter(Boolean).join(' ')}>

                            </div>
                        }
                        {
                            !isDateToRenderCircle(fullDate) &&
                            todayYyyyMMdd===fullDate &&
                            <div className={"absolute h-full top-0 z-[4] " +
                                "left-1/2 transform -translate-x-1/2 aspect-square rounded-full " +
                                "border border-gray-500"}>
                            </div>
                        }
                        {didSetRangeOfDates && fullDate && fullDate >= rangeStart && fullDate <= rangeEnd &&
                            <div className={["absolute h-full top-0 bg-blue-700/20",
                                'left-0 right-0',
                                didSetRangeOfDates && fullDate === rangeStart &&
                                "rounded-l-full",
                                didSetRangeOfDates && fullDate === rangeEnd &&
                                "rounded-r-full",
                            ].filter(Boolean).join(' ')}>
                            </div>}
                    </button>
                })
                }
            </div>
        )}
    </div>
}

const CachedMonthGrid = (cachedMonthGridProps:CachedMonthGridProps)=>{
    const {
        dateSelectionGridProps,
        monthKey,
        mountId,
    } = cachedMonthGridProps;

    const getCacheKey = () => {
        const selectedDate = dateSelectionGridProps?.selectedDate?.yyyyMMdd;
        const [rangeStart=selectedDate?selectedDate:'', rangeEnd=''] = dateSelectionGridProps?.selectedDateRange?.map(
            date=>date.yyyyMMdd
        ) || [];

        const hasDateSelection = (!!rangeStart && rangeStart.substring(0,6)===monthKey) ||
            (!!rangeEnd && rangeEnd.substring(0,6)===monthKey);

        return `${mountId}-${monthKey}-${hasDateSelection ? rangeStart:''}-${hasDateSelection ? rangeEnd:''}`;
    }

    const cacheKey = getCacheKey();

    //캐시에 존재하면 캐시에서 MonthGrid 리턴
    if(monthGridCache.has(cacheKey))
        return monthGridCache.get(cacheKey);

    //캐시에 없으면 새로 생성
    const monthGrid = <MonthGrid {...cachedMonthGridProps} />;

    [...monthGridCache.keys()].filter(cachedKey => {
        const currentMonthKey = monthKey;
        const cachedMonthKey = cachedKey.split("-")[1];

        // 같은 년월이 존재하는 경우 삭제
        if(currentMonthKey == cachedMonthKey)
            return true;
        // 현재월로부터 3개월 이상 차이는 삭제
        const date = new Date();
        const currentDate = parse(currentMonthKey, 'yyyyMM', date);
        const cachedDate = parse(cachedMonthKey, 'yyyyMM', date);
        return Math.abs(differenceInMonths(currentDate, cachedDate)) > 2;
    }).forEach(toDelete=>monthGridCache.delete(toDelete));

    monthGridCache.set(cacheKey, monthGrid);

    return monthGrid;
}

const Grid = ({
    hasTransition,
    calendarData,
    translateX,
    onTransitionEnd,
    dateSelectionGridProps,
    onDateClick,
    canSelectOffDay = true,
    mountId = 0,
}:CalendarGridProps) => {

    return <div className={`flex w-[300%] ${hasTransition&&'transition-transform duration-300'}`}
                style={{transform : `translateX(${translateX}%)`}}
                onTransitionEnd={onTransitionEnd}>
        {calendarData.map((calendarMonthData)=> {
            const monthKey = calendarMonthData[0][6]?.fullDate?.substring(0, 6)||'';
            return (
                <CachedMonthGrid calendarMonthData = {calendarMonthData}
                                 dateSelectionGridProps = {dateSelectionGridProps}
                                 onDateClick = {onDateClick}
                                 canSelectOffDay = {canSelectOffDay}
                                 key = {monthKey}
                                 monthKey = {monthKey}
                                 mountId = {mountId}
            />);
        })}
    </div>

}

export const clearCalendarCache = () => {
    monthGridCache.clear();
};

const CalendarGrid = (props: CalendarGridProps) =>
    <div className={"font-normal text-sm text-center overflow-hidden"}>
        <DaysHeader />
        <Grid {...props} />
    </div>

export default CalendarGrid;