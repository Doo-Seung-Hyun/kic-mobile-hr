import React from 'react';
import Card from "../../../components/ui/Card.tsx";
import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";

const TeamCalendar:React.FC = () => {
    const {
        currentYear,
        currentMonth,
        goToNextMonth,
        goToPrevMonth,
        calendarData,
        translateX,
        hasTransition,
        onTransitionEnd
    } = useCalendarData();

    return (
        <Card>
            <Card.Content>
                <CalendarHeader onPrevClick={goToPrevMonth}
                                onNextClick={goToNextMonth}
                                title={`${currentYear}년 ${currentMonth}월`}
                />
                <CalendarGrid calendarData={calendarData}
                              hasTransition={hasTransition}
                              translateX={translateX}
                              onTransitionEnd={onTransitionEnd}
                />
            </Card.Content>
        </Card>
    );
};

export default TeamCalendar;