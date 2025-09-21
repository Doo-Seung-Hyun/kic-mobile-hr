import Card from "../../../../components/ui/Card.tsx";
import stopWatchIcon from "/src/assets/images/stopWatchIcon.png";

export function OverTimeHoursWidget() {


    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1 items-center'}>
                <img src={stopWatchIcon} alt={'타이머 아이콘'} width={14} height={14} />
                사용 가능시간
            </div>
        </Card.Header>
        <Card.Content className={'flex-1 flex flex-col text-sm text-gray-500 gap-1'}>
            <div className={'flex-1 flex flex-col justify-center gap-2'}>
                <div className="text-xl text-center text-gray-700">1시간 10분</div>
                <div className="h-3 bg-gray-200 rounded-2xl">
                    <div className={`h-full bg-green-500 rounded-2xl`}
                         style={{
                             width: Math.ceil(Math.min(70, 120) / 120 * 100) + '%'
                         }}
                    />
                </div>
            </div>
            <div className={'flex font-medium justify-between'}>
                <div className={'text-center'}>
                    <div className={'flex-1'}>추가근무</div>
                    <div>6:10</div>
                </div>
                <div className={'text-center'}>
                    <div className={'flex-1'}>사용시간</div>
                    <div>4:50</div>
                </div>
            </div>
        </Card.Content>
    </Card>;
}