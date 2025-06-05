import React from "react";
import {format} from "date-fns";

interface CalendarHeaderProps {
    title?: string;
    onPrevClick: React.MouseEventHandler<HTMLButtonElement>;
    onNextClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CalendarHeader = ({
    title,
    onPrevClick,
    onNextClick
}:CalendarHeaderProps):React.ReactNode =>{
    console.log(title)
    if(!title){
        title = format(new Date(), 'yyyy년 M월');
    }
    return <div className={"flex items-center justify-between px-2.5 pb-5"}>
        <button onClick={onPrevClick}>
            <svg viewBox="0 0 24 24" width={24}>
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                      fill={"rgba(0,0,0,0.54"}/>
            </svg>
        </button>
        <div className={"font-bold"}>{title}</div>
        <button onClick={onNextClick}>
            <svg viewBox="0 0 24 24" width={24}>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                      fill={"rgba(0,0,0,0.54"}/>
            </svg>
        </button>
    </div>
};

export default CalendarHeader;