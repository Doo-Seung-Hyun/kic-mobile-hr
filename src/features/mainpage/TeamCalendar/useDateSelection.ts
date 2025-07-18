import {useEffect, useState} from "react";
import {format, isAfter, parse} from "date-fns";
import type {DateInfo, DateSelectionGridProps} from "../../../types/calendar.ts";

interface DateSelectionResult extends DateSelectionGridProps{
    handleDateSelect : (selectedDate: Date|string) => void,
}

const TODAY = new Date();

const initializeSelectedDate = (
    initialSelectedDate?: DateInfo|Date|string|null,
    initialSelectedDateRange?: DateInfo[]|Date[]|string[]|null
) => {
    if(initialSelectedDateRange && initialSelectedDateRange.length==2){
        return initialSelectedDateRange.map(inputDate => {
            let dateInfo:DateInfo;
            if(typeof inputDate ==='string'){
                dateInfo = {
                    date : parse(inputDate,'yyyyMMdd',TODAY),
                    yyyyMMdd : inputDate
                }
            }else if(inputDate instanceof Date){
                dateInfo = {
                    date : inputDate,
                    yyyyMMdd : format(inputDate,'yyyyMMdd')
                }
            }else{
                dateInfo = inputDate
            }
            return dateInfo;
        })
    }else if(initialSelectedDate){
        let dateInfo:DateInfo;
        if(typeof initialSelectedDate ==='string'){
            dateInfo = {
                date : parse(initialSelectedDate,'yyyyMMdd',TODAY),
                yyyyMMdd : initialSelectedDate
            }
        }else if(initialSelectedDate instanceof Date){
            dateInfo = {
                date : initialSelectedDate,
                yyyyMMdd : format(initialSelectedDate,'yyyyMMdd')
            }
        }else{
            dateInfo = initialSelectedDate
        }
        return [dateInfo];
    }
    return null;
}

/**
 * 날짜 선택 로직 관리 훅
 *
 * @param initialSelectedDate - 캘린더 초기 선택된 날짜
 * @param initialSelectedDateRange - 캘린더 초기 선택된 날짜범위(DateRange)
 * @param isDateRangePickerMode - true면 날짜범위선택 / false면 단일날짜선택
 * @param onDateSelect - 날짜 선택 시 콜백함수
 * @example
 * // 단일날짜 선택
 * const {handleDateSelect, selectedDate} = useDateSelection
 *
 * // 날짜범위 선택
 * const {handleDateSelect, selectedDateRange} = useDateSelection(true)
 */
const useDateSelection = (
    isDateRangePickerMode: boolean = false,
    onDateSelect?: (selectedDate:DateInfo, selectedDateRange?:DateInfo[])=>void,
    initialSelectedDate?: Date|string|null,
    initialSelectedDateRange?: DateInfo[]|Date[]|string[]|null,
) => {

    const [selectedDates, setSelectedDates] = useState<DateInfo[]|null>(
        initializeSelectedDate(initialSelectedDate, initialSelectedDateRange)
    );

    //false : 첫번째 날짜 선택차례 / true: 두번째 날짜 선택차례
    const [isSelectingRange, setIsSelectingRange] = useState(false);

    useEffect(() => {
        if(onDateSelect && selectedDates){
            //데이트레인지 모드가 아니거나 데이트레인지 날짜가 하나만 선택된 경우
            if(!isDateRangePickerMode || selectedDates?.length==1)
                onDateSelect(selectedDates[0])
            else
                onDateSelect(selectedDates[1], selectedDates)
        }
    }, [selectedDates]);

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
            if (selectedDates && isSelectingRange && isAfter(selectedDate, selectedDates[0].date)) {
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
        didSetRangeOfDates : selectedDates?.length==2,
    }

    //선택된 날짜가 없는경우 날짜&날짜범위 없이 리턴
    if(!selectedDates)
        return result;

    //날짜가 선택된경우 선택날짜 리턴
    result.selectedDate = {...selectedDates[selectedDates.length-1]};

    //날짜범위선택이 완료된 경우 날짜범위 리턴
    if(result.didSetRangeOfDates)
        result.selectedDateRange = [...selectedDates];

    return result;
}

export {useDateSelection};