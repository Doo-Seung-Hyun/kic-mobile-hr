import React from "react";
import type {CalendarDay} from "../../../types/calendar.ts";
import {format} from "date-fns";

interface CalendarGridProps {
    hasTransition : boolean;
    calendarData : CalendarDay[][][];
    translateX : number;
    onTransitionEnd : ()=>void;
    selectedDate? : string;
    onDateClick? : (date?:string) => void;
}

const DaysHeader: React.FC = () =>
    <div className="flex flex-row h-8 text-gray-600">
        {['S', 'M', "T", 'W', 'T', 'F', 'S'].map((day, index) =>
            <div className={`flex-1 ${(index == 0 || index == 6) && 'text-gray-400'}`}>{day}</div>
        )}
    </div>;

const yyyyMMdd = format(new Date(), 'yyyyMMdd');

const Grid = ({
    hasTransition,
    calendarData,
    translateX,
    onTransitionEnd,
    selectedDate = yyyyMMdd,
    onDateClick
}:CalendarGridProps) => {
    const isOffDay = (index:number) =>
        index===0 || index===6 ;
    return <div className={`flex w-[300%] ${hasTransition&&'transition-transform duration-300'}`}
                style={{transform : `translateX(${translateX}%)`}}
                onTransitionEnd={onTransitionEnd}>
        {calendarData.map(month=>
            <div className={"flex-1"}>
                {month.map((week, weekIndex) =>
                    <div className={"flex flex-row h-9"}
                         key={weekIndex}
                    >
                        {week.map((calendarDay, dayIndex) => {
                            const {date, fullDate, hasLeave, hasFamilyTime, isEmpty} = calendarDay;
                            if(isEmpty)
                                return <div className={"flex-1"} />;
                            return <button className={'flex-1 relative'
                                                   + `${isOffDay(dayIndex)? ' text-gray-400':''}`}
                                           key={dayIndex}
                                           onClick={()=> {
                                               if(onDateClick)
                                                onDateClick(fullDate);
                                           }}
                            >
                                <div className={"flex flex-col justify-center items-center h-full relative z-10"}>
                                    <span className={fullDate===selectedDate && 'text-white'}>{date}</span>
                                    <div className={"flex h-1.5 justify-center gap-1"}>
                                        {(hasLeave || date=='15') &&
                                            <div className={"w-1.5 h-1.5 bg-blue-500 rounded-full"}/>}
                                        {!hasFamilyTime && Number(date)%3==0 &&
                                            <div className={"w-1.5 h-1.5 bg-lime-500 rounded-full"}/>}
                                    </div>
                                </div>
                                <div className={"absolute h-full aspect-square top-0 " +
                                    "left-1/2 transform -translate-x-1/2 rounded-full" +
                                    `${fullDate===selectedDate ? " bg-blue-700" : ''}`}>
                                </div>
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