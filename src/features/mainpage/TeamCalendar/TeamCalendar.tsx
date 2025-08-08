import CalendarHeader from "../../../components/ui/Calendar/CalendarHeader.tsx";
import CalendarGrid from "../../../components/ui/Calendar/CalendarGrid.tsx";
import useCalendarData from "./useCalendarData.ts";
import useDailyAttendance from "./useDailyAttendance.ts";
import TeamDailyAttendanceList from "./TeamDailyAttendanceList.tsx";
import {useDateSelection} from "./useDateSelection.ts";
import type {DateInfo, DateSelectionGridProps} from "../../../types/calendar.ts";
import {memo} from "react";
import {isSameDay} from "date-fns";

interface TeamCalendarProps {
    initialSelectedDate? : Date|string;
    initialSelectedDateRange? : DateInfo[]|Date[]|string[];
    className? : string;
    onDateChange? : (selectedDate:DateInfo, selectedDateRange?:DateInfo[])=>void;
    dateRangePickerMode? : boolean;
    canSelectOffDay? : boolean;

    hideAttendanceList? : boolean;
    fixedHeightOfAttendanceList? : boolean;
}

const orgId = '95';

const TeamCalendar = memo(({
    initialSelectedDate,
    initialSelectedDateRange,
    className = '',
    onDateChange: onDateChangeCallback,
    dateRangePickerMode = false,
    canSelectOffDay = true,
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
        holidaysByMonth,
        mountId
    } = useCalendarData();

    const {
        selectedDate,
        handleDateSelect,
        didSetRangeOfDates,
        selectedDateRange
    } = useDateSelection(dateRangePickerMode,onDateChangeCallback, initialSelectedDate, initialSelectedDateRange);

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
                          hasTransition={hasTransition}
                          translateX={translateX}
                          onTransitionEnd={onTransitionEnd}
                          dateSelectionGridProps={dateSelectionGridProps}
                          canSelectOffDay={canSelectOffDay}
                          mountId={mountId}
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
}, (prevProps: TeamCalendarProps, nextProps: TeamCalendarProps): boolean => {
    // 🔥 커스텀 비교 함수: props가 실제로 변경되었을 때만 리렌더링

    // 기본 props 비교
    if (
        prevProps.className !== nextProps.className ||
        prevProps.dateRangePickerMode !== nextProps.dateRangePickerMode ||
        prevProps.canSelectOffDay !== nextProps.canSelectOffDay ||
        prevProps.hideAttendanceList !== nextProps.hideAttendanceList ||
        prevProps.fixedHeightOfAttendanceList !== nextProps.fixedHeightOfAttendanceList ||
        prevProps.onDateChange !== nextProps.onDateChange
    ) {
        return false; // 리렌더링 필요
    }

    // 🔥 initialSelectedDate 비교 (Date 객체 또는 string)
    if (prevProps.initialSelectedDate !== nextProps.initialSelectedDate) {
        const prevTypes = typeof prevProps.initialSelectedDate;
        const nextTypes = typeof nextProps.initialSelectedDate;

        // 두 타입이 다르면 false
        if(prevTypes!==nextTypes)
            return false;
        // Date 객체인 경우 날짜 비교
        if (prevProps.initialSelectedDate instanceof Date && nextProps.initialSelectedDate instanceof Date) {
            return isSameDay(prevProps.initialSelectedDate, nextProps.initialSelectedDate);
        }
        return false;
    }

    // 🔥 initialSelectedDateRange 비교
    if (prevProps.initialSelectedDateRange !== nextProps.initialSelectedDateRange) {
        // 배열 길이가 다른 경우
        if (
            (!prevProps.initialSelectedDateRange && nextProps.initialSelectedDateRange) ||
            (prevProps.initialSelectedDateRange && !nextProps.initialSelectedDateRange) ||
            (prevProps.initialSelectedDateRange?.length !== nextProps.initialSelectedDateRange?.length)
        ) {
            return false;
        }

        // 배열 내용 비교
        if (prevProps.initialSelectedDateRange && nextProps.initialSelectedDateRange) {
            for (let i = 0; i < prevProps.initialSelectedDateRange.length; i++) {
                const prev = prevProps.initialSelectedDateRange[i];
                const next = nextProps.initialSelectedDateRange[i];

                if (prev !== next) {
                    // DateInfo 객체인 경우 yyyyMMdd로 비교
                    if (typeof prev === 'object' && typeof next === 'object' && 'yyyyMMdd' in prev && 'yyyyMMdd' in next) {
                        if ((prev as DateInfo).yyyyMMdd !== (next as DateInfo).yyyyMMdd) {
                            return false;
                        }
                    } else if (prev instanceof Date && next instanceof Date) {
                        if (prev.getTime() !== next.getTime()) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    return true; // props가 같음, 리렌더링 불필요
});

export default TeamCalendar;