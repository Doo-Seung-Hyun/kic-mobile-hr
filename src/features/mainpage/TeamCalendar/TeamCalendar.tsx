import React from 'react';
import Card from "../../../components/ui/Card.tsx";
import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";
import {format} from "date-fns";

const TeamCalendar:React.FC = () => {
    const {
        date,
        goToNextMonth,
        goToPrevMonth,
        calendarData
    } = useCalendarData();

    return (
        <Card>
            <Card.Content>
                <CalendarHeader onPrevClick={goToPrevMonth}
                                onNextClick={goToNextMonth}
                                title={format(date,'yyyy년 MM월')}
                />
                <CalendarGrid calendarData={calendarData}
                              yyyymm={format(date,'yyyyMM')}
                />
            </Card.Content>
        </Card>
    );
};

export default TeamCalendar;