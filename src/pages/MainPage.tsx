import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import TeamCalendar from "../features/mainpage/TeamCalendar/TeamCalendar.tsx";
import familyDayIcon from "../assets/images/familyDayIcon.png"
import scheduleIcon from "../assets/images/scheduleIcon.png"
import {LeaveDashboardWidget} from "../widgets/leave/leave-dashboard";
import {FamilyDayDashboardWidget} from "../widgets/familyDay/familyday-dashboard";


function MainPage() {

    return (
        <div className="flex flex-col gap-4 text-gray-800 pb-10">

            {/*휴가현황*/}
            <LeaveDashboardWidget />

            {/*가족과 함께하는 날*/}
            <div className="flex gap-3 items-center pt-6">
                <img src={familyDayIcon}
                     alt={'가족과 함께하는 날 아이콘'}
                     className={'inline-block w-[26px] h-[26px]'}
                />
                <h1 className={'font-bold text-2xl'}>가족과 함께하는 시간</h1>
            </div>

            {/*가족과 함께하는 날*/}
            <FamilyDayDashboardWidget />

            {/*가족과 함께하는날 신청 버튼*/}
            <Button className={"mb-2"}>
                가족과 함께하는 날 신청하기
            </Button>


            {/*캘린더*/}
            <div className="flex gap-3 items-center pt-6">
                <img src={scheduleIcon}
                     alt={'캘린더 아이콘'}
                     className={'inline-block w-[26px] h-[26px]'}
                />
                <h1 className={'font-bold text-2xl'}>캘린더</h1>
            </div>
            <Card className={'pt-6'}>
                <Card.Content>
                    <TeamCalendar initialSelectedDate={new Date()}
                    />
                </Card.Content>
            </Card>
        </div>
    );
}

export default MainPage;