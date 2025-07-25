import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";
import useDailyAttendance from "./useDailyAttendance.ts";
import TeamDailyAttendanceList from "./TeamDailyAttendanceList.tsx";
import {useDateSelection} from "./useDateSelection.ts";
import type {DateInfo, DateSelectionGridProps} from "../../../types/calendar.ts";
import {useHolidaysByPeriod} from "../../Calendar/hooks/useHolidays.ts";

interface TeamCalendarProps {
    initialSelectedDate? : Date|string;
    initialSelectedDateRange? : DateInfo[]|Date[]|string[];
    className? : string;
    onDateChange? : (selectedDate:DateInfo, selectedDateRange?:DateInfo[])=>void;
    dateRangePickerMode? : boolean;

    hideAttendanceList? : boolean;
    fixedHeightOfAttendanceList? : boolean;
}

const orgId = '95';

const TeamCalendar = ({
    initialSelectedDate,
    initialSelectedDateRange,
    className = '',
    onDateChange: onDateChangeCallback,
    dateRangePickerMode = false,
    hideAttendanceList = false,
    fixedHeightOfAttendanceList = true
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
    } = useDateSelection(dateRangePickerMode,onDateChangeCallback, initialSelectedDate, initialSelectedDateRange);

    const {data: holidays=[]} = useHolidaysByPeriod({startDate: `${currentYear}0101`, endDate: `${currentYear}1231`});

    const attendanceList = useDailyAttendance(selectedDate? selectedDate.yyyyMMdd : '', orgId);

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
                          holidays={holidays}
                          hasTransition={hasTransition}
                          translateX={translateX}
                          onTransitionEnd={onTransitionEnd}
                          dateSelectionGridProps={dateSelectionGridProps}
                          onDateClick={yyyyMMdd => {
                              handleDateSelect(yyyyMMdd);
                          }}
            />
            {!hideAttendanceList && (
                <div className={"pt-3 border-t"}>
                    {selectedDate ?
                    <TeamDailyAttendanceList date={selectedDate.date}
                                             attendanceList={attendanceList}
                                             fixedHeightOfAttendanceList={fixedHeightOfAttendanceList}
                    /> :
                    <div className={"py-3 text-center"}>
                        팀원 근태를 확인하려면 날짜를 선택해주세요
                    </div>}
                </div>
            )}
        </div>
    );
};

export default TeamCalendar;