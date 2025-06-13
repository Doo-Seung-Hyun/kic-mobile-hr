import React from 'react';
import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";
import useDailyAttendance from "./useDailyAttendance.ts";

interface TeamCalendarProps {
    className? : string;
}

const orgId = '95';

const TeamCalendar:React.FC = ({
    className = ''
}:TeamCalendarProps) => {
    const {
        selectedDate,
        currentYear,
        currentMonth,
        goToNextMonth,
        goToPrevMonth,
        calendarData,
        translateX,
        hasTransition,
        onTransitionEnd,
        setSelectedDate
    } = useCalendarData();

    const {
        getAttendanceList,
        attendanceList
    } = useDailyAttendance();

    const onChangeDate = (newDate: string) => {
        setSelectedDate(newDate);
        getAttendanceList(selectedDate, orgId);
    }

    return (
        <div className={`${className}`}>
            <CalendarHeader onPrevClick={goToPrevMonth}
                            onNextClick={goToNextMonth}
                            title={`${currentYear}년 ${currentMonth}월`}
            />
            <CalendarGrid calendarData={calendarData}
                          hasTransition={hasTransition}
                          translateX={translateX}
                          onTransitionEnd={onTransitionEnd}
            />
            <TeamDailyAttendanceList date={selectedDate}
                                     attendanceList={attendanceList}
            />
        </div>
    );
};

export default TeamCalendar;