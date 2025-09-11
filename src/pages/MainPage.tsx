import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import TeamCalendar from "../features/mainpage/TeamCalendar/TeamCalendar.tsx";
import familyDayIcon from "../assets/images/familyDayIcon.png"
import scheduleIcon from "../assets/images/scheduleIcon.png"
import LeaveDashboardWidget from "../widgets/leave/LeaveDashboard/ui.tsx";
import FamilyDayWidget from "../widgets/familyDay/FamilyDayWidget/ui.tsx";


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
            <FamilyDayWidget />
            <Card className="pb-5">
                <Card.Content>
                    <div className="flex flex-row justify-between">
                        <Card className="min-w-[47%] py-1">
                            <Card.Header>잔여횟수</Card.Header>
                            <Card.Content className="flex flex-col gap-1">
                                <div className="text-xl">2회</div>
                                <span className="text-sm mt-1">2/4회</span>
                                <div>
                                    <div className="h-3 bg-gray-200 rounded-2xl">
                                        <div className="h-full bg-blue-500 rounded-2xl w-2/4"></div>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card className="min-w-[47%] py-1">
                            <Card.Header>사용가능시간</Card.Header>
                            <Card.Content className="flex flex-col gap-1">
                                <div className="text-xl">2시간20분</div>
                                <span className="text-sm mt-1">4:00/6:20</span>
                                <div>
                                    <div className="h-3 bg-gray-200 rounded-2xl">
                                        <div className={`h-full bg-blue-500 rounded-2xl`}
                                             style={{
                                                 width: Math.ceil((60 * 4) / (60 * 6 + 20) * 100) + '%'
                                             }}
                                        />
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>
                </Card.Content>
            </Card>

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