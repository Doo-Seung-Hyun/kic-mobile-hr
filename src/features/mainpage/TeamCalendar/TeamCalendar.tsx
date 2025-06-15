import React from 'react';
import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";
import useDailyAttendance from "./useDailyAttendance.ts";
import TeamDailyAttendanceList from "./TeamDailyAttendanceList.tsx";

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

    const attendanceList = useDailyAttendance(selectedDate, orgId);

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
                          selectedDate={selectedDate}
                          onDateClick={date => {
                              setSelectedDate(date);
                          }}
            />
            <TeamDailyAttendanceList selectedDate={selectedDate}
                                     attendanceList={attendanceList}
            />
        </div>
    );
};

export default TeamCalendar;