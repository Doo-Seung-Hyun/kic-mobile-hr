import {useEffect, useRef, useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {LeaveDate, LeaveType, SelectedLeaveProps} from "../features/Leave/types/leave.ts";
import {addDays, format} from "date-fns";
import {ko} from "date-fns/locale";
import LeaveSelectionBottomSheetContent
    from "../features/mainpage/leaveApplication/components/LeaveSelectionBottomSheetContent.tsx";
import LeavePeriodBottomSheet from "../features/mainpage/leaveApplication/components/LeavePeriodBottomSheet.tsx";
import {useBottomSheetToggle} from "../stores/bottomSheetStore.ts";
import useSubmitFooterStore from "../stores/submitFooterStore.ts";
import {useShallow} from "zustand/react/shallow";
import Chip from "../components/ui/Chip.tsx";
import useSubmitLeaveApplication from "../features/Leave/hooks/useLeaveApplication.tsx";

const datePickerSvg = <svg className="w-5 text-gray-500"
                           aria-hidden="true" viewBox="0 0 24 24">
    <path
        d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
        fill={"currentColor"}></path>
</svg>;


function LeaveApplicationPage() {
    const [selectedLeaveKind, setSelectedLeaveKind] = useState<LeaveType|undefined>(undefined);
    const [selectedLeaveBalance, setSelectedLeaveBalance] = useState<number>(0);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {setValidation, setSubmitHandler, setIsSubmitting} = useSubmitFooterStore(useShallow(state => ({
        setValidation : state.setValidation,
        setSubmitHandler : state.setSubmitHandler,
        setIsSubmitting : state.setIsSubmitting
    })));

    const {openBottomSheet, closeBottomSheet} = useBottomSheetToggle<SelectedLeaveProps>();

    // 휴가종류 선택 핸들러
    const handleLeaveTypeClick = () =>{
        const content =
            <LeaveSelectionBottomSheetContent
                selectedLeave={selectedLeaveKind}
                onLeaveSelect={(newSelectedLeave, leaveBalance) => {
                    if(newSelectedLeave) {
                        setSelectedLeaveKind(newSelectedLeave)
                        setSelectedLeaveBalance(leaveBalance)
                    }
                }}
                closeBottomSheet={closeBottomSheet}
            />
        openBottomSheet(content);
    }

    // 휴가기간정보
    const [selectedLeaveProps, setSelectedLeaveProps] = useState<SelectedLeaveProps | null>(null);

    // 휴가기간 선택 핸들러
    const handleLeaveDateClick = () => {
        openBottomSheet(
            setContentState =>
                <LeavePeriodBottomSheet
                    selectedLeaveProps={selectedLeaveProps}
                    setBottomSheetContentState={setContentState}
                />,
            'withButton',
            {
                buttonText: '휴가날짜 선택',
                onButtonClick : leavePeriodProps=> {
                    setSelectedLeaveProps(leavePeriodProps);
                },
            },
            'h-[90%]'
        );
    }

    const validate = () => {
        //휴가종류 선택여부 확인
        if(!selectedLeaveKind)
            return false;

        //휴가기간 선택여부 확인
        if(!selectedLeaveProps)
            return false;

        return true;
    }


    //휴가신청사유 ref
    const rmkRef = useRef<HTMLTextAreaElement>(null);

    //휴가신청 api 훅
    const leaveApplicationMutation = useSubmitLeaveApplication({
        leaveType : selectedLeaveKind!,
        leavePeriodProps : selectedLeaveProps!
    });

    useEffect(() => {
        setValidation(validate());

        //submit 처리
        if(selectedLeaveKind && selectedLeaveProps) {
            setSubmitHandler(async () => {
                await leaveApplicationMutation.mutateAsync({
                    empNo: 2230104,
                    leaveType: selectedLeaveKind,
                    leavePeriodProps : selectedLeaveProps,
                    rmk : rmkRef?.current?.value
                });

            })
        }

        //서브밋버튼 로딩스피너 설정
        setIsSubmitting(leaveApplicationMutation.isPending);

    }, [selectedLeaveKind, selectedLeaveProps, setValidation, leaveApplicationMutation.isPending]);


    const renderLeaveDate = (leaveDate : LeaveDate, leaveDateLength: number) => {
        const {
            halfLeaveType,
            dateInfo
        } = leaveDate;
        const {date} = dateInfo;
        const isMultipleLeaveDates = leaveDateLength>1;

        return (<div className={`flex ${isMultipleLeaveDates ? 'flex-col':''}`.trim()}>
            <span>
                {format(date, 'M월 d일(EE)', {locale: ko})}
            </span>
            <span className={"text-left"}>
                {halfLeaveType && <Chip classNames={"text-xs"}>
                    {(halfLeaveType.halfLeaveTypeCd === 'M' ? '오전' : '오후') +
                        halfLeaveType.dayOffTypeCdName}
                </Chip>}
                {halfLeaveType?.halfLeaveTypeCd==='E' && <Chip classNames={"text-xs"}>
                    8:00
                </Chip>}
            </span>
        </div>)
    };


    return (
        <div className={"flex flex-col gap-4"}>
            <div>
                <div className="font-bold text-xl pt-6 pb-4">휴가 종류를 선택해주세요</div>
                <Card>
                    <Card.Content>
                        <div>
                            <Button variant={"none"}
                                    size={"md"}
                                    className={`flex flex-row w-full justify-between text-gray-800`}
                                    style={{paddingTop: '0.375rem', paddingBottom: '0.375rem'}}
                                    onClick={handleLeaveTypeClick}>
                                {!selectedLeaveKind && <span className={"font-normal after:content-['*'] after:text-red-500 after:ml-1"}>
                                    휴가 종류를 선택해주세요
                                </span>}
                                {selectedLeaveKind && <>
                                    <span className={"font-normal"}>
                                        {selectedLeaveKind.leaveTypeName}
                                    </span>
                                    <div>
                                        <span>{selectedLeaveBalance}</span>
                                        <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                    </div>
                                </>}
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">언제 가시나요?</div>
                <Card>
                    <Card.Content className={""}>
                        <Button variant={"none"}
                                className={`flex flex-row w-full justify-between px-1 py-1.5 text-gray-800`}
                                style={{paddingTop: '0.375rem', paddingBottom: '0.375rem'}}
                                onClick={handleLeaveDateClick}>
                            {selectedLeaveProps===null &&
                                <span className={"font-normal after:content-['*'] after:text-red-500 after:ml-1"}>
                                    날짜를 선택해주세요
                                </span>}
                            {selectedLeaveProps?.leaveDates && selectedLeaveProps?.leaveDates.length>=1 && <>
                                <span className={"text-gray-600 font-normal"}>휴가일자</span>
                                <div className={"flex flex-row"}>
                                    {renderLeaveDate(selectedLeaveProps.leaveDates[0], selectedLeaveProps.leaveDates.length)}
                                    {selectedLeaveProps.leaveDates.length===2 && <>
                                        <span className={"px-2"}>-</span>
                                        {renderLeaveDate(selectedLeaveProps.leaveDates[1], selectedLeaveProps.leaveDates.length)}
                                    </>}
                                </div>
                            </>}
                        </Button>
                    </Card.Content>
                </Card>
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">휴가사유를 입력해주세요</div>
                <Card>
                    <Card.Content>
                        <textarea className={"appearance-none border w-full h-52 " +
                            "resize-none rounded-md " +
                            "p-2.5 font-normal " +
                            "focus: border"}
                                  ref={rmkRef}
                        />
                    </Card.Content>
                </Card>
            </div>

        </div>
    );
}

export default LeaveApplicationPage;