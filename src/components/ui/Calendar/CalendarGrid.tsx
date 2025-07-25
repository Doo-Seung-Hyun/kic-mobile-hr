import React from "react";
import type {CalendarGridProps} from "../../../types/calendar.ts";
import {format} from "date-fns";

const DaysHeader: React.FC = () =>
    <div className="flex flex-row h-8 text-gray-600">
        {['S', 'M', "T", 'W', 'T', 'F', 'S'].map((day, index) =>
            <div key={index}
                 className={`flex-1 ${(index == 0 || index == 6) && 'text-gray-400'}`}>{day}</div>
        )}
    </div>;

const today = new Date();
const todayYyyyMMdd = format(today, 'yyyyMMdd');

const Grid = ({
    hasTransition,
    calendarData,
    holidays,
    translateX,
    onTransitionEnd,
    dateSelectionGridProps,
    onDateClick
}:CalendarGridProps) => {

    //휴무일 여부
    const isOffDay = (fullDate:string|undefined, index:number) =>
        holidays.some(holiday => holiday.date === fullDate) || //공휴일
        index===0 || //일요일
        index===6 ; //토요일

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

    return <div className={`flex w-[300%] ${hasTransition&&'transition-transform duration-300'}`}
                style={{transform : `translateX(${translateX}%)`}}
                onTransitionEnd={onTransitionEnd}>
        {calendarData.map(month=>
            <div className={"flex-1 flex flex-col gap-0.5"}>
                {month.map((week, weekIndex) =>
                    <div className={"flex flex-row h-9"}
                         key={weekIndex}
                    >
                        {week.map((calendarDay, dayIndex) => {
                            const {date, fullDate, hasLeave, hasFamilyTime, isEmpty} = calendarDay;

                            //날짜가 없는 경우 (다른 달인 경우)
                            if(isEmpty)
                                return <div className={"flex-1"} key={dayIndex} />;

                            //정상
                            return <button className={'flex-1 relative'
                                                   + `${isOffDay(fullDate, dayIndex)? ' text-gray-400':''}`}
                                           key={dayIndex}
                                           onClick={()=> {
                                               if(onDateClick && fullDate)
                                                onDateClick(fullDate);
                                           }}
                            >
                                <div className={"flex flex-col justify-center items-center h-full relative z-10"}>
                                    <span className={isDateToRenderCircle(fullDate) ? 'text-white' : ''}
                                    >{date}</span>
                                    <div className={"flex h-1.5 justify-center gap-1"}>
                                        {(hasLeave || date=='15') &&
                                            <div className={"w-1.5 h-1.5 bg-blue-500 rounded-full"}/>}
                                        {!hasFamilyTime && Number(date)%3==0 &&
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
        )}
    </div>

}

const CalendarGrid = (props: CalendarGridProps) =>
    <div className={"font-normal text-sm text-center overflow-hidden"}>
        <DaysHeader />
        <Grid {...props} />
    </div>

export default CalendarGrid;