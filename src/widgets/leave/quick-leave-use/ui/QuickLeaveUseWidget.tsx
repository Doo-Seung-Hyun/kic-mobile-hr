import type {UserLeaveBalance} from "../../../../features/Leave/types/leave.ts";
import Card from "../../../../components/ui/Card.tsx";
import Chip from "../../../../components/ui/Chip.tsx";
import DropdownChip from "../../../../components/ui/DropdownChip.tsx";
import Button from "../../../../components/ui/Button.tsx";
import {useMemo, useState} from "react";
import lightningIcon from '/src/assets/images/lightningIcon.png'
import {Alert} from "../../../../shared/ui/Alert";

interface QuickLeaveUseWidgetProps {
    myLeaveBalances: UserLeaveBalance[]
}

export const QuickLeaveUseWidget = ({
    myLeaveBalances
}: QuickLeaveUseWidgetProps) => {

    const [selectedChip, setSelectedChip] = useState<'TODAY' | 'TOMORROW' | 'CUSTOM'>('TODAY');

    const canUseLeaveTypeCodes = ['018','017','001']; //대체-보상-연차
    //대체-보상-연차 순으로 잔여일수가 있는 휴가를 찾고, 찾으면 break
    const userLeaveBalance = useMemo(()=>{
        for(const code of canUseLeaveTypeCodes) {
            const found = myLeaveBalances.find(balance =>
                balance.leaveType.leaveTypeCode===code && balance.leftLeaveDays > 0
            );
            if(found)
                return found;
        }
    },[myLeaveBalances])

    return <Card className={'flex-1 aspect-square max-w-48'}>
        <Card.Header>
            <div className={'flex gap-1 items-center'}>
                <img src={lightningIcon} alt={'번개 아이콘'} width={14} height={14} />
                빠른 휴가사용
            </div>
        </Card.Header>
        <Card.Content className={'flex-1 flex flex-col'}>
            <div className={'flex-1'}>
                <button onClick={() => setSelectedChip('TODAY')}>
                    <Chip color={selectedChip==='TODAY' ? 'primary' : 'default'}
                          outline={selectedChip!=='TODAY'}
                          classNames={'px-3 py-0.5 mr-2 mb-1'}
                    >
                        오늘
                    </Chip>
                </button>
                <button onClick={() => setSelectedChip('TOMORROW')}>
                    <Chip color={selectedChip==='TOMORROW' ? 'primary' : 'default'}
                          outline={selectedChip!=='TOMORROW'}
                          classNames={'px-3 py-0.5 mr-2 mb-1'}>
                        내일
                    </Chip>
                </button>
                <DropdownChip color={selectedChip==='CUSTOM' ? 'primary' : 'default'}
                              outline={selectedChip!=='CUSTOM'}
                              onChange={() => setSelectedChip('CUSTOM')}
                              className={'px-3 py-0.5 mb-1'}>
                    <DropdownChip.DropdownMenu
                        items={[{label: '이번주', value: 0}, {label: '다음주', value: 1}]}
                        defaultIndex={0}/>
                    <DropdownChip.DropdownMenu
                        items={[{label: '월', value: 0}
                            , {label: '화', value: 1}
                            , {label: '수', value: 2}
                            , {label: '목', value: 3}
                            , {label: '금', value: 4}
                        ]}
                        defaultIndex={0}/>
                </DropdownChip>
            </div>
            <div>
                <Button
                    disabled={!userLeaveBalance}
                    size={'sm'}
                    variant={'primary'}
                    className={`w-full py-2 bg-blue-700${userLeaveBalance ? ' text-white':''} relative`}>
                    신청하기
                    <div className={'absolute -left-4 -right-4 top-[110%]'}>
                        <Alert type={'error'}>
                            잔여 휴가가 없습니다
                        </Alert>
                    </div>

                </Button>
            </div>
        </Card.Content>
    </Card>;
}