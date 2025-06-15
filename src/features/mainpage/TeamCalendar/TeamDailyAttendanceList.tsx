import {type AttendanceData, isLeaveAttendance, type LeaveAttendanceData} from "../../../types/attendanceData.ts";
import {format, parse} from "date-fns";
import {getDisplayInfoOfAttendanceData} from "../../../utils/attendanceFormmater.ts";
import {ko} from "date-fns/locale";
import Chip from '../../../components/ui/Chip.tsx';

interface TeamDailyAttendanceListProps {
    selectedDate: string;
    attendanceList: AttendanceData[];
}

const TeamDailyAttendanceList = ({
    selectedDate,
    attendanceList
}:TeamDailyAttendanceListProps) => {
    const date = parse(selectedDate,'yyyyMMdd',new Date());

    return (
        <div>
            <div className={"py-3 border-t mt-3"}>
                {format(date,'M월 d일 EEEE', {locale: ko})}
            </div>
            <div className={"h-28 font-normal text-sm overflow-auto"}>
                {attendanceList.length === 0 && '일정이 없습니다'}
                {attendanceList.sort((a,b)=>{
                    const isALeave = isLeaveAttendance(a);
                    const isBLeave = isLeaveAttendance(b);

                    if(isALeave && !isBLeave) return -1;
                    if(!isALeave && isBLeave) return 1;

                    return a._seq - b._seq;
                }).map(attendanceData=> {
                    const {
                        attendanceType,
                        icon,
                        displayTexts
                    } = getDisplayInfoOfAttendanceData(attendanceData);
                    const [attendanceName, attendanceDuration] = displayTexts;

                    return (
                    <div className={"flex text-gray-800 font-normal justify-between py-1 items-center"}>
                        <div className={"flex gap-2 text-sm items-center"}>
                            <span className={"text-lg mr-1"}>{icon}</span>
                            <span>{attendanceData.empNm}</span>
                            <span>{attendanceData.posGrdNm}</span>
                        </div>
                        <div className={"flex gap-1"}>
                            <Chip label={attendanceName} color={attendanceType==='Leave' ? "primary" : "secondary"}/>
                            <Chip label={attendanceDuration} />
                        </div>
                    </div>);
                })
            }</div>
        </div>
    );
};

export default TeamDailyAttendanceList;