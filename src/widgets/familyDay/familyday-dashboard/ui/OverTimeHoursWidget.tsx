import Card from "../../../../components/ui/Card.tsx";
import stopWatchIcon from "/src/assets/images/stopWatchIcon.png";
import {LoadingSpinner} from "../../../../components/ui/LoadingSpinner.tsx";

interface OverTimeHoursWidgetProps {
    overTimeHours: number;
    overTimeMinutes: number;
    totalOverTimeHours: number;
    totalOverTimeMinutes: number;
    totalFamilyDaysUseHours: number;
    totalFamilyDaysUseMinutes: number;
    isLoading: boolean;
}
export function OverTimeHoursWidget({
    overTimeHours,
    overTimeMinutes,
    totalOverTimeHours,
    totalOverTimeMinutes,
    totalFamilyDaysUseHours,
    totalFamilyDaysUseMinutes,
    isLoading,
}:OverTimeHoursWidgetProps) {

    function Loading() {
        return <div className={'flex flex-1 items-center justify-center'}>
            <LoadingSpinner/>
        </div>
    }

    const overTimeHourString = [
        overTimeHours && `${overTimeHours}시간`,
        overTimeMinutes && `${overTimeMinutes}분`
    ].filter(Boolean).join(' ');

    const totalOverTimeHoursString = `${totalOverTimeHours}:${totalOverTimeMinutes ? totalOverTimeMinutes:'00'}`;

    const totalFamilyDaysUseHoursString = `${totalFamilyDaysUseHours}:${totalFamilyDaysUseMinutes ? totalFamilyDaysUseMinutes:'00'}`;

    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1 items-center'}>
                <img src={stopWatchIcon} alt={'타이머 아이콘'} width={14} height={14} />
                사용 가능시간
            </div>
        </Card.Header>
        <Card.Content className={'flex-1 flex flex-col text-sm text-gray-500 gap-1'}>
            {isLoading ? <Loading /> : <>
                    <div className={'flex-1 flex flex-col justify-center gap-2'}>
                        <div className="text-xl text-center text-gray-700">{overTimeHourString}</div>
                        <div className="h-3 bg-gray-200 rounded-2xl">
                            <div className={`h-full bg-green-500 rounded-2xl`}
                                 style={{
                                     width: Math.ceil(Math.min(overTimeHours*60+overTimeMinutes, 120) / 120 * 100) + '%'
                                 }}
                            />
                        </div>
                    </div>
                    <div className={'flex font-medium justify-between'}>
                        <div className={'text-center'}>
                            <div className={'flex-1'}>추가근무</div>
                            <div>{totalOverTimeHoursString}</div>
                        </div>
                        <div className={'text-center'}>
                            <div className={'flex-1'}>사용시간</div>
                            <div>{totalFamilyDaysUseHoursString}</div>
                        </div>
                    </div>
                </>
            }
        </Card.Content>
    </Card>;
}