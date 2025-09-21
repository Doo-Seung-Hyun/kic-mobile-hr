import {OverTimeHoursWidget} from "./OverTimeHoursWidget.tsx";
import {UpcomingFamilyDayWidget} from "./UpcomingFamilyDayWidget.tsx";

export function FamilyDayDashboardWidget() {
    return <div className={'flex justify-between gap-4'}>
            <OverTimeHoursWidget />
            <UpcomingFamilyDayWidget />
        </div>
}