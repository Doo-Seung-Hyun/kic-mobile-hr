import {useState} from "react";
import {format, isAfter, parse} from "date-fns";
import type {DateInfo, DateSelectionGridProps} from "../../../types/calendar.ts";

interface DateSelectionResult extends DateSelectionGridProps{
    handleDateSelect : (selectedDate: Date|string) => void,
}

const TODAY = new Date();

/**
 * 날짜 선택 로직 관리 훅
 *
 * @param isDateRangePickerMode - true면 날짜범위선택 / false면 단일날짜선택
 * @example
 * // 단일날짜 선택
 * const {handleDateSelect, selectedDate} = useDateSelection
 *
 * // 날짜범위 선택
 * const {handleDateSelect, selectedDateRange} = useDateSelection(true)
 */
const useDateSelection = (isDateRangePickerMode: boolean = false) => {

    const [selectedDates, setSelectedDates] = useState<DateInfo[]>([{
        date : TODAY,
        yyyyMMdd : format(TODAY,'yyyyMMdd')
    }]);

    //false : 첫번째 날짜 선택차례 / true: 두번째 날짜 선택차례
    const [isSelectingRange, setIsSelectingRange] = useState(false);

    /**
     * 캘린더(데이트피커)에서 날짜가 선택될때 실행해야 할 콜백함수
     *
     * @param selectedDate - 선택된 날짜 (Date 타입 또는 yyyyMMdd 형식의 String 타입)
     */
    const handleDateSelect = (selectedDate: Date|string)=> {
        if(typeof selectedDate =='string')
            selectedDate = parse(selectedDate, 'yyyyMMdd', TODAY);

        const newSelectDate:DateInfo = {
            date : selectedDate,
            yyyyMMdd : format(selectedDate,'yyyyMMdd')
        }

        const newSelectedDates:DateInfo[] = [];

        if(isDateRangePickerMode) {
            //날짜범위선택 모드이고 두번째 날짜선택이 첫번째보다 이후인 경우
            if (isSelectingRange && isAfter(selectedDate, selectedDates[0].date)) {
                newSelectedDates.push(selectedDates[0]);
                setIsSelectingRange(false);
            } else {
                setIsSelectingRange(true);
            }
        }
        newSelectedDates.push(newSelectDate);
        setSelectedDates(newSelectedDates);
    }
    
    const result:DateSelectionResult = {
        isDateRangePickerMode,
        handleDateSelect,
        //날짜범위선택 완료 여부
        didSetRangeOfDates : selectedDates.length==2,
        selectedDate : {...selectedDates[selectedDates.length-1]},
    }
    //날짜범위선택이 완료된 경우 날짜범위 리턴
    if(result.didSetRangeOfDates)
        result.selectedDateRange = [...selectedDates];

    return result;
}

export {useDateSelection};