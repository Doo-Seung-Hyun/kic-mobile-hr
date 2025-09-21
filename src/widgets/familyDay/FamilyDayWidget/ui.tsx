import Card from "../../../components/ui/Card.tsx";
import {format, parse} from "date-fns";
import {Bell, Calendar, Check, Plus} from "lucide-react";
import Chip from "../../../components/ui/Chip.tsx";
import {dDayformatter} from "../../../utils/attendanceFormmater.ts";


const MAX_FAMILYDAY_COUNT = 4;

interface FamilyDayCardProps {
    familyDayStep: number;
    dateString: string;
    status?: 'done' | 'next' | 'upcoming' | 'notRegistered';
}

const FamilyDayCard = ({
    familyDayStep,
    dateString,
    status='notRegistered',
}:FamilyDayCardProps) => {
    const iconBackgroundColor = status === 'done' ? '#ababab'
        : status === 'upcoming' ? '#ffffff'
        : undefined;
    const familyDayStepColor = status==='next' ? '#fff' :
        status==='upcoming' ? '#666' :
            '#999';
    const dateStringColor = status==='next' ? '#fff' :
        status==='upcoming' ? '#666' :
            '#999';
    const cardClassesNames =
        status==='next' ? 'bg-gradient-to-br from-blue-400 to-blue-700' :
        status==='done' ? 'bg-gray-200' :
            `border border-gray-400${status==='notRegistered'?' border-2 border-dashed':''}`;

    const icon = {
        'done' : <Check size={10} strokeWidth={2} className={"text-white"}/>,
        'next' : <Bell size={10} strokeWidth={3} stroke={"#ffffff"} fill={'#ffffff'}/>,
        'upcoming' : <Calendar size={12} strokeWidth={3} stroke={"#666"} />,
        'notRegistered' : <Plus size={24} strokeWidth={2} stroke={"#999"} fill={'#999'}/>,
    }

    return <>
    {status==='next' &&
        <Chip color={"secondary"} classNames={'text-xs py-0 mb-0.5 min-w-0'} isSelected>
            {dDayformatter(dateString,'M.d')}
        </Chip>}
        <div className={[
            "flex flex-col items-center text-sm aspect-square justify-center",
            "gap text-center p-1.5 rounded-lg min-w-[72px]",
            cardClassesNames,
        ].filter(Boolean).join(" ")}
        >
            {status === 'notRegistered' ? icon[status] : <>
                <div className={"rounded-full bg-blue-600 p-0.5 self-end"}
                     style={{background : iconBackgroundColor}}
                >
                    {icon[status]}
                </div>
                <span className={"pt-0.5 text-base"}
                      style={{color: familyDayStepColor}}
                >{familyDayStep}회차</span>
                <span
                      style={{color: dateStringColor}}
                >{dateString}</span>
            </>}
        </div>
    </>;
}

const FamilyDayWidget = () => {
    const TODAY = new Date();
    const TODAY_YEAR = TODAY.getFullYear();
    const TODAY_MONTH = TODAY.getMonth() + 1;

    const familyDates = [
        parse(format(TODAY, 'yyyyMM02'),'yyyyMMdd',TODAY),
        parse(format(TODAY, 'yyyyMM12'),'yyyyMMdd',TODAY),
        parse(format(TODAY, 'yyyyMM15'),'yyyyMMdd',TODAY),
    ];

    const currentFamilyDayIndex = familyDates.filter(
        date=> date.getDate()<TODAY.getDate()
    ).length;

    const completedFamilyDays = [...familyDates].splice(0, currentFamilyDayIndex)
            .map(date =>format(date, 'M.d'));

    const currentFamilyDay = currentFamilyDayIndex<familyDates.length ?
        format(familyDates[currentFamilyDayIndex],'M.d')
        : null;

    const upComingFamilyDay = [...familyDates].splice(currentFamilyDayIndex+1)
            .map(date =>format(date, 'M.d'));

    const notRegisteredCountOfFamilyDay = MAX_FAMILYDAY_COUNT - familyDates.length;

    return <>
    <Card>
        <Card.Header>사용현황</Card.Header>
        <Card.Content>
            <h3 className={'font-semibold text-xl mb-4'}>{`${TODAY_YEAR}년 ${TODAY_MONTH}월`}</h3>
            <div className={'flex flex-row justify-between items-end gap-3 pt-0.5'}>
                {completedFamilyDays.map((date, index) =>
                    <div className={'flex-1'}>
                        <FamilyDayCard key={index+1}
                                       familyDayStep={index+1}
                                       dateString={date}
                                       status={'done'}
                        />
                    </div>
                )}

                {currentFamilyDay &&
                    <div className={'flex-1'}>
                        <FamilyDayCard familyDayStep={completedFamilyDays.length+1}
                                       dateString={currentFamilyDay}
                                       status={'next'}
                        />
                    </div>
                }
                {upComingFamilyDay.map((date, index) =>
                    <div className={'flex-1'}>
                        <FamilyDayCard familyDayStep={completedFamilyDays.length+2+index}
                                       dateString={date}
                                       status={'upcoming'}
                        />
                    </div>
                )}

                {new Array(notRegisteredCountOfFamilyDay).fill(0).map((_,index) => {
                    const currentIndex = familyDates.length + 1 + index;
                    const dateString = '-';
                    return (
                        <div className={'flex-1'}>
                            <FamilyDayCard familyDayStep={currentIndex}
                                           dateString={dateString}
                                           status={'notRegistered'}
                            />
                        </div>
                    );
                })}
            </div>
        </Card.Content>
    </Card>
    </>
}

export default FamilyDayWidget;