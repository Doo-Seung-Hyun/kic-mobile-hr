import Card from "../../../../components/ui/Card.tsx";
import wavingIcon from "/src/assets/images/wavingIcon.png";
import {CalendarDays, Moon} from "lucide-react";

export function UpcomingFamilyDayWidget() {
    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1'}>
                <div className={'flex-1 flex gap-1 items-center'}>
                    <img src={wavingIcon} alt={'손흔드는 아이콘'} width={14} height={14} />
                    <span className={'truncate'}>예정일자</span>
                </div>
                <div className={'flex gap-1 items-center'}>
                    <span className={'w-2 h-2 rounded-full bg-green-200'} />
                    <span className={'w-2 h-2 rounded-full bg-green-200'} />
                    <span className={'w-2 h-2 rounded-full bg-green-500'} />
                    <span className={'w-2 h-2 rounded-full bg-gray-300'} />
                </div>
            </div>
        </Card.Header>
        <Card.Content className={'flex-1 flex flex-col text-sm text-gray-500 gap-0.5'}>
            <div className="flex-1 flex items-center justify-center text-xl text-gray-700">다음주 월</div>
            <div className={'font-medium flex items-center gap-1'}>
                <Moon size={14}/>
                <span>오후</span>
            </div>
            <div className={'font-medium flex items-center gap-1'}>
                <CalendarDays size={14}/>
                <span>9월 29일</span>
            </div>
        </Card.Content>
    </Card>;
}