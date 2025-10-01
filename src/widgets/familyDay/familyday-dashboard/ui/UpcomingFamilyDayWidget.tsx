import Card from "../../../../components/ui/Card.tsx";
import wavingIcon from "/src/assets/images/wavingIcon.png";
import {CalendarDays, Moon} from "lucide-react";

interface UpcomingFamilyDayWidgetProps {
    upcomingCount : number;
    dDayText: string;
    date: string;
    typeName : string;
}

export function UpcomingFamilyDayWidget({
    upcomingCount,
    dDayText,
    date,
    typeName,
}:UpcomingFamilyDayWidgetProps) {

    function FamilyDayStatusDots({
        completedCount,
        upcomingCount
    }: {
        completedCount: number;
        upcomingCount: number;
    }) {
        const totalAvailableFamilyDays = 4;

        return <div className={'flex gap-1 items-center'}>
            {[...new Array(totalAvailableFamilyDays)]
                .map((_, i) => i+1)
                .map((_, i) => {
                    const bgClass = i<upcomingCount ? 'bg-green-200'
                        : i==upcomingCount ? 'bg-green-500'
                            : 'bg-gray-300'
                    return <span className={'w-2 h-2 rounded-full '+bgClass}/>
                })}
        </div>
    }

    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1'}>
                <div className={'flex-1 flex gap-1 items-center'}>
                    <img src={wavingIcon} alt={'손흔드는 아이콘'} width={14} height={14} />
                    <span className={'truncate'}>예정일자</span>
                </div>
                <FamilyDayStatusDots upcomingCount={upcomingCount} />
            </div>
        </Card.Header>
        <Card.Content className={'flex-1 flex flex-col text-sm text-gray-500 gap-0.5'}>
            <div className="flex-1 flex items-center justify-center text-xl text-gray-700">{dDayText}</div>
            <div className={'font-medium flex items-center gap-1'}>
                <Moon size={14}/>
                <span>{typeName}</span>
            </div>
            <div className={'font-medium flex items-center gap-1'}>
                <CalendarDays size={14}/>
                <span>{date}</span>
            </div>
        </Card.Content>
    </Card>;
}