import {OverTimeHoursWidget} from "./OverTimeHoursWidget.tsx";
import {UpcomingFamilyDayWidget} from "./UpcomingFamilyDayWidget.tsx";
import {useOverTimeHoursQuery} from "../../../../entities/FamilyDay";

export function FamilyDayDashboardWidget() {

    const EMP_NO = 2230103;
    //가족과 함께하는날 사용/잔여시간 조회
    const {overTimeHoursResponse, isLoading} = useOverTimeHoursQuery(EMP_NO);
    //가족과 함께하는날 회차 및 날짜정보 조회
    // const {} = useUpcomingFamilyDayQuery(EMP_NO);

    return <div className={'flex justify-between gap-4'}>
            <OverTimeHoursWidget overTimeHours={overTimeHoursResponse?.overTimeHours ?? 0}
                                 overTimeMinutes={overTimeHoursResponse?.overTimeMinutes ?? 0}
                                 totalOverTimeHours={overTimeHoursResponse?.totalOverTimeHours ?? 0}
                                 totalOverTimeMinutes={overTimeHoursResponse?.totalOverTimeMinutes ?? 0}
                                 totalFamilyDaysUseHours={overTimeHoursResponse?.totalFamilyDaysUseHours ?? 0}
                                 totalFamilyDaysUseMinutes={overTimeHoursResponse?.totalFamilyDaysUseMinutes ?? 0}
                                 isLoading = {isLoading} />
            <UpcomingFamilyDayWidget />
        </div>
}