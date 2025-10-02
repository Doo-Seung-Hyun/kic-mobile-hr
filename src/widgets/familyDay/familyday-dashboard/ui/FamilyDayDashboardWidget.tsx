import {OverTimeHoursWidget} from "./OverTimeHoursWidget.tsx";
import {UpcomingFamilyDayWidget} from "./UpcomingFamilyDayWidget.tsx";
import {useMyFamilyDaysQuery, useOverTimeHoursQuery} from "../../../../entities/FamilyDay";
import {format} from "date-fns";
import {dDayformatter} from "../../../../utils/attendanceFormmater.ts";

export function FamilyDayDashboardWidget() {

    const EMP_NO = 2230103;
    //가족과 함께하는날 사용/잔여시간 조회
    const {overTimeHoursResponse, isLoading: isOverTimeHoursLoading} = useOverTimeHoursQuery(EMP_NO);
    //가족과 함께하는 날 이번달 신청목록 조회
    const TODAY = new Date();
    const yyyyMMdd = format(TODAY, "yyyyMMdd");
    const {myFamilyDaysResponse, isLoading: isMyFamilyDaysLoading} = useMyFamilyDaysQuery(EMP_NO, format(TODAY, 'yyyyMM'));

    const canRequestCount = 4;
    const requestedCount = myFamilyDaysResponse?.myFamilyDays?.length ?? 0;
    const notRequestedCount = canRequestCount - requestedCount;

    const usedCount = myFamilyDaysResponse?.myFamilyDays
        ?.filter(familyDay=>familyDay.date<yyyyMMdd).length ?? 0;
    const notUsedCount = requestedCount - usedCount;

    const upcomingCount = usedCount == requestedCount ? 0 :  usedCount+1;
    const upcomingMyFamilyDay = upcomingCount>0 ? myFamilyDaysResponse?.myFamilyDays?.[upcomingCount-1] : null;

    return <div className={'flex justify-between gap-4'}>
            <OverTimeHoursWidget overTimeHours={overTimeHoursResponse?.overTimeHours ?? 0}
                                 overTimeMinutes={overTimeHoursResponse?.overTimeMinutes ?? 0}
                                 totalOverTimeHours={overTimeHoursResponse?.totalOverTimeHours ?? 0}
                                 totalOverTimeMinutes={overTimeHoursResponse?.totalOverTimeMinutes ?? 0}
                                 totalFamilyDaysUseHours={overTimeHoursResponse?.totalFamilyDaysUseHours ?? 0}
                                 totalFamilyDaysUseMinutes={overTimeHoursResponse?.totalFamilyDaysUseMinutes ?? 0}
                                 isLoading = {isOverTimeHoursLoading} />
            <UpcomingFamilyDayWidget requestedNumberInfo={{notRequestedCount, usedCount, notUsedCount}}
                                     date={upcomingMyFamilyDay?.date ?? ''}
                                     dDayText={upcomingMyFamilyDay ? dDayformatter(upcomingMyFamilyDay.date) : ''}
                                     typeName={upcomingMyFamilyDay?.familyTimeTypeNm ?? ''}/>
        </div>
}