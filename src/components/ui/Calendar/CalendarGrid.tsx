import React from "react";
import type {CalendarDay} from "../../../types/calendar.ts";

interface CalendarGridProps {
    hasTransition : boolean;
    calendarData : CalendarDay[][][];
    translateX : number;
    onTransitionEnd : ()=>void;
}

const DaysHeader: React.FC = () =>
    <div className="flex flex-row h-8 text-gray-600">
        {['S', 'M', "T", 'W', 'T', 'F', 'S'].map((day, index) =>
            <div className={`flex-1 ${(index == 0 || index == 6) && 'text-gray-400'}`}>{day}</div>
        )}
    </div>;

const Grid = ({
    hasTransition,
    calendarData,
    translateX,
    onTransitionEnd
}:CalendarGridProps) => {
    const isOffDay = (index:number) =>
        index===0 || index===6 ;
    return <div className={`flex w-[300%] ${hasTransition&&'transition-transform duration-300'}`}
                style={{transform : `translateX(${translateX}%)`}}
                onTransitionEnd={onTransitionEnd}>
        {calendarData.map(month=>
            <div className={"flex-1"}>
                {month.map(week =>
                    <div className={"flex flex-row h-9"}>
                        {week.map((calendarDay, index) => {
                            const {date, hasLeave, hasFamilyTime} = calendarDay;
                            return <div className={`flex-1 ${isOffDay(index) && 'text-gray-400'}`}>
                                {date}
                                {(hasLeave || hasFamilyTime) &&
                                    <div className={"flex align-middle justify-center gap-1"}>
                                        {hasLeave &&
                                            <div className={"w-1.5 h-1.5 bg-blue-500 rounded-full"}/>}
                                        {hasFamilyTime &&
                                            <div className={"w-1.5 h-1.5 bg-lime-500 rounded-full"}/>}
                                    </div>
                                }
                            </div>
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