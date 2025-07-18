import {type AttendanceData, isLeaveAttendance} from "../../../types/attendanceData.ts";
import {format} from "date-fns";
import {getDisplayInfoOfAttendanceData} from "../../../utils/attendanceFormmater.ts";
import {ko} from "date-fns/locale";
import Chip from '../../../components/ui/Chip.tsx';

interface TeamDailyAttendanceListProps {
    date: Date;
    attendanceList: AttendanceData[];
    fixedHeightOfAttendanceList?: boolean;
}

const TeamDailyAttendanceList = ({
    date,
    attendanceList,
    fixedHeightOfAttendanceList = true
}:TeamDailyAttendanceListProps) => {

    //높이 계산
    const heightClass = fixedHeightOfAttendanceList ? 'h-28' : 'max-h-28';

    return (
        <>
            <div className={"pb-3"}>
                {format(date,'M월 d일 EEEE', {locale: ko})}
            </div>
            <div className={`font-normal text-sm overflow-auto ${heightClass}`.trim()}>
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
                    <div key={`${attendanceData.empNo}-${attendanceType}-${attendanceName}`}
                         className={"flex text-gray-800 font-normal justify-between py-1 items-center"}>
                        <div className={"flex gap-2 text-sm items-center"}>
                            <span className={"text-lg mr-1"}>{icon}</span>
                            <span>{attendanceData.empNm}</span>
                            <span>{attendanceData.posGrdNm}</span>
                        </div>
                        <div className={"flex gap-1"}>
                            <Chip color={attendanceType==='Leave' ? "primary" : "secondary"}>
                                {attendanceName}
                            </Chip>
                            <Chip>
                                {attendanceDuration}
                            </Chip>
                        </div>
                    </div>);
                })
            }</div>
        </>
    );
};

export default TeamDailyAttendanceList;