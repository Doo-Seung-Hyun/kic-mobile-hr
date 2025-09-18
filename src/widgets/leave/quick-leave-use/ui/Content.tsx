import {LoadingSpinner} from "../../../../components/ui/LoadingSpinner.tsx";
import type {ChipText, DateChipProps} from "./QuickLeaveUseWidget.tsx";
import type {UserLeaveBalance} from "../../../../features/Leave/types/leave.ts";
import Chip from "../../../../components/ui/Chip.tsx";
import DropdownChip from "../../../../components/ui/DropdownChip.tsx";
import Button from "../../../../components/ui/Button.tsx";

interface ContentProps{
    dateChip? : DateChipProps;
    handleChangeDateChip : (chipText:ChipText, distanceFromToday:number)=>void;
    userLeaveBalance : UserLeaveBalance,
    onSubmit: ()=>void,
    isSubmitting?: boolean,
}

export const Content = ({
                     dateChip,
                     handleChangeDateChip,
                     userLeaveBalance,
                     onSubmit,
                     isSubmitting=false
                 }:ContentProps) => {
    const dayOfWeek = new Date().getDay();

    return <>
        <div className={"flex-1 flex flex-wrap gap-2 content-start"}>
            <button onClick={() => handleChangeDateChip('TODAY',0)}>
                <Chip color={dateChip?.chipText==='TODAY' ? 'primary' : 'default'}
                      outline={dateChip?.chipText!=='TODAY'}
                      classNames={'px-3 py-0.5'}
                >
                    오늘
                </Chip>
            </button>
            <button onClick={() => handleChangeDateChip('TOMORROW',1)}>
                <Chip color={dateChip?.chipText==='TOMORROW' ? 'primary' : 'default'}
                      outline={dateChip?.chipText!=='TOMORROW'}
                      classNames={'px-3 py-0.5'}>
                    내일
                </Chip>
            </button>
            <DropdownChip color={dateChip?.chipText==='CUSTOM' ? 'primary' : 'default'}
                          outline={dateChip?.chipText!=='CUSTOM'}
                          onChange={selectedItems => {
                              handleChangeDateChip('CUSTOM',
                                  (selectedItems[0].value as number)
                                  + (selectedItems[1].value as number));
                          }}
                          className={'px-3 py-0.5'}>
                <DropdownChip.DropdownMenu
                    items={[{label: '이번주', value: 0}, {label: '다음주', value: 7}]}
                    defaultIndex={0}/>
                <DropdownChip.DropdownMenu
                    items={[{label: '월', value: 1-dayOfWeek}
                        , {label: '화', value: 2-dayOfWeek}
                        , {label: '수', value: 3-dayOfWeek}
                        , {label: '목', value: 4-dayOfWeek}
                        , {label: '금', value: 5-dayOfWeek}
                    ]}
                    defaultIndex={0}/>
            </DropdownChip>
        </div>
        <div>
            <Button
                size={'sm'}
                variant={'primary'}
                className={`w-full py-2 bg-blue-700${userLeaveBalance ? ' text-white':''}`}
                onClick={onSubmit}
                disabled={isSubmitting}>
                {!isSubmitting ? '신청하기' : <div className={'text-center'}>
                    <LoadingSpinner className={'inline-block'}/>
                </div> }
            </Button>
        </div>
    </>
}