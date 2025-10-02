import Card from "../../../../components/ui/Card.tsx";
import wavingIcon from "/src/assets/images/wavingIcon.png";
import {CalendarDays, Moon} from "lucide-react";
import {parse, format} from "date-fns";

export interface RequestedNumberInfo {
    notRequestedCount: number;
    usedCount: number;
    notUsedCount: number;
}

interface UpcomingFamilyDayWidgetProps {
    requestedNumberInfo: RequestedNumberInfo;
    dDayText: string;
    date: string;
    typeName : string;
}

export function UpcomingFamilyDayWidget({
    requestedNumberInfo,
    dDayText,
    date,
    typeName,
}:UpcomingFamilyDayWidgetProps) {

    function FamilyDayStatusDots({
        requestedNumberInfo
    }: {requestedNumberInfo: RequestedNumberInfo}) {
        const {notRequestedCount, usedCount, notUsedCount} = requestedNumberInfo;

        return <div className={'flex gap-1 items-center'}>
            {/*완료 횟수*/}
            {[...new Array(usedCount)]
                .map(() => <span className={'w-2 h-2 rounded-full bg-green-200'} />)}

            {/*다가오는 회차*/}
            {notUsedCount && <span className={'w-2 h-2 rounded-full bg-green-500'} />}

            {/*남은 예정 회차*/}
            {notUsedCount-1>0 && [...new Array(notUsedCount-1)]
                .map(() => <span className={'w-2 h-2 rounded-full bg-green-200'} />)}

            {/*미등록 회차*/}
            {[...new Array(notRequestedCount)]
                .map(() => <span className={'w-2 h-2 rounded-full bg-gray-300'} />)}
        </div>
    }

    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1'}>
                <div className={'flex-1 flex gap-1 items-center'}>
                    <img src={wavingIcon} alt={'손흔드는 아이콘'} width={14} height={14} />
                    <span className={'truncate'}>예정일자</span>
                </div>
                <FamilyDayStatusDots requestedNumberInfo={requestedNumberInfo} />
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
                <span>{format(parse(date, 'yyyyMMdd', new Date()),'M월 d일')}</span>
            </div>
        </Card.Content>
    </Card>;
}