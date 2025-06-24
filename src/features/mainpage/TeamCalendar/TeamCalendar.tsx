import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";
import useDailyAttendance from "./useDailyAttendance.ts";
import TeamDailyAttendanceList from "./TeamDailyAttendanceList.tsx";
import {parse} from "date-fns";
import {useDateSelection} from "./useDateSelection.ts";
import type {DateInfo, DateSelectionGridProps} from "../../../types/calendar.ts";

interface TeamCalendarProps {
    className? : string;
    onDateChange? : (selectedDate:DateInfo, selectedDateRange?:DateInfo[])=>void;
    dateRangePickerMode? : boolean;
}

const orgId = '95';

const TeamCalendar = ({
    className = '',
    onDateChange: onDateChangeCallback,
    dateRangePickerMode = false
}:TeamCalendarProps) => {
    const {
        currentYear,
        currentMonth,
        goToNextMonth,
        goToPrevMonth,
        calendarData,
        translateX,
        hasTransition,
        onTransitionEnd,
    } = useCalendarData();

    const {
        selectedDate,
        handleDateSelect,
        didSetRangeOfDates,
        selectedDateRange
    } = useDateSelection(dateRangePickerMode,onDateChangeCallback);

    const attendanceList = useDailyAttendance(selectedDate.yyyyMMdd, orgId);

    const dateSelectionGridProps:DateSelectionGridProps = {
        isDateRangePickerMode : dateRangePickerMode,
        selectedDate,
        didSetRangeOfDates,
        selectedDateRange
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
                          dateSelectionGridProps={dateSelectionGridProps}
                          onDateClick={yyyyMMdd => {
                              handleDateSelect(yyyyMMdd);
                          }}
            />
            <TeamDailyAttendanceList date={selectedDate.date}
                                     attendanceList={attendanceList}
            />
        </div>
    );
};

export default TeamCalendar;