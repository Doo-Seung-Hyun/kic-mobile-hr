import {useEffect, useRef, useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {
    LeaveApplicationHistoryItem,
    LeaveDate,
    LeaveType,
    SelectedLeaveProps
} from "../features/Leave/types/leave.ts";
import {format} from "date-fns";
import {ko} from "date-fns/locale";
import LeaveSelectionBottomSheetContent
    from "../features/mainpage/leaveApplication/components/LeaveSelectionBottomSheetContent.tsx";
import LeavePeriodBottomSheet from "../features/mainpage/leaveApplication/components/LeavePeriodBottomSheet.tsx";
import {useBottomSheetToggle} from "../stores/bottomSheetStore.ts";
import useSubmitFooterStore from "../stores/submitFooterStore.ts";
import {useShallow} from "zustand/react/shallow";
import Chip from "../components/ui/Chip.tsx";
import useSubmitLeaveApplication from "../features/Leave/hooks/useLeaveApplication.tsx";
import {useLocation} from "react-router-dom";


function LeaveApplicationPage() {

    //[휴가 변경]으로 화면을 연 경우
    const location = useLocation();
    const passedLeaveData:{
        leaveApplicationHistoryItem: LeaveApplicationHistoryItem;
        leftLeaveDays: number;
    } = location.state;
    const isEditMode = !!passedLeaveData;

    const [selectedLeaveKind, setSelectedLeaveKind] = useState<LeaveType|undefined>(undefined);
    const [selectedLeaveBalance, setSelectedLeaveBalance] = useState<number>(0);

    const {setValidation, setSubmitHandler, setIsSubmitting} = useSubmitFooterStore(useShallow(state => ({
        setValidation : state.setValidation,
        setSubmitHandler : state.setSubmitHandler,
        setIsSubmitting : state.setIsSubmitting
    })));

    const {openBottomSheet, closeBottomSheet} = useBottomSheetToggle<SelectedLeaveProps>();

    const setFooterButtonText = useSubmitFooterStore(state =>
        state.setFooterButtonText
    );


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
        openBottomSheet(content, 'basic', null, 'h-[80%]');
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
        leavePeriodProps : selectedLeaveProps!,
        isModificationRequested : isEditMode,
    });

    // validation & submit Handler 처리
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

    //[휴가변경]으로 화면 연 경우 state update
    useEffect(() => {
        if(isEditMode){
            const {leaveType, leavePeriodProps, rmk, empNo} = passedLeaveData.leaveApplicationHistoryItem;
            const {leftLeaveDays} = passedLeaveData;

            setSelectedLeaveProps(leavePeriodProps);
            setSelectedLeaveKind(leaveType);
            setSelectedLeaveBalance(leftLeaveDays + (leavePeriodProps.leaveDays?? 0));
            if(rmkRef.current)
                rmkRef.current.value = rmk ?? '';

            setFooterButtonText('휴가 변경하기');
        }
    }, [passedLeaveData, isEditMode]);


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