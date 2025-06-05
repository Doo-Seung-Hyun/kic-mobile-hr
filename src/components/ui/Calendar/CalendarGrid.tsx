import React from "react";
import type {CalendarDay} from "../../../types/calendar.ts";

interface CalendarGridProps {
    yyyymm? : string;
    calendarData : CalendarDay[][];
}

const DEFAULT_DATE = new Date();

const DaysHeader: React.FC = () =>
    <div className="flex flex-row h-8 text-gray-600">
        {['S', 'M', "T", 'W', 'T', 'F', 'S'].map((day, index) =>
            <div className={`flex-1 ${(index == 0 || index == 6) && 'text-gray-400'}`}>{day}</div>
        )}
    </div>;

const Grid = ({
    yyyymm,
    calendarData
}:CalendarGridProps) => {
    const month = Number(yyyymm ? yyyymm.slice(4,6) : DEFAULT_DATE.getMonth()+1);
    const isOffDay = (index:number) =>
        index===0 || index===6 ;
    return <> {
        calendarData.map(row =>
            <div className={"flex flex-row h-9"}>
                {row.map((calendarDay, index) => {
                    const {date, hasLeave, hasFamilyTime} = calendarDay;
                    return <div className={`flex-1 ${isOffDay(index, date)
                                                    && 'text-gray-400'}`}>
                        {date && date.getDate()}
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
        )
    } </>;
}

const CalendarGrid = (props: CalendarGridProps) =>
    <div className={"font-normal text-sm text-center"}>
        <DaysHeader />
        <Grid {...props} />
    </div>

export default CalendarGrid;