import {useEffect, useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {LeaveType, SelectedLeaveProps} from "../types/leave.ts";
import {addDays, format} from "date-fns";
import {ko} from "date-fns/locale";
import LeaveSelectionBottomSheetContent
    from "../features/mainpage/leaveApplication/components/LeaveSelectionBottomSheetContent.tsx";
import LeavePeriodBottomSheet from "../features/mainpage/leaveApplication/components/LeavePeriodBottomSheet.tsx";
import {useBottomSheetToggle} from "../stores/bottomSheetStore.ts";
import useSubmitFooterStore from "../stores/submitFooterStore.ts";
import {useShallow} from "zustand/react/shallow";

const datePickerSvg = <svg className="w-5 text-gray-500"
                           aria-hidden="true" viewBox="0 0 24 24">
    <path
        d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
        fill={"currentColor"}></path>
</svg>;


function LeaveApplicationPage() {
    const [selectedLeaveKind, setSelectedLeaveKind] = useState<LeaveType|undefined>(undefined);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {setValidation} = useSubmitFooterStore(useShallow(state => ({
        setValidation : state.setValidation,
    })));

    const {openBottomSheet, closeBottomSheet} = useBottomSheetToggle<SelectedLeaveProps>();

    // 휴가종류 선택 핸들러
    const handleLeaveTypeClick = () =>{
        const content =
            <LeaveSelectionBottomSheetContent
                selectedLeave={selectedLeaveKind}
                onLeaveSelect={newSelectedLeave => {
                    if(newSelectedLeave) setSelectedLeaveKind(newSelectedLeave)
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
                onButtonClick : leavePeriodProps=> setSelectedLeaveProps(leavePeriodProps),
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

    useEffect(() => {
        setValidation(validate());
    }, [setValidation]);

    useEffect(() => {
        setValidation(validate());
    }, [selectedLeaveKind, selectedLeaveProps]);

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
                                        <span>{selectedLeaveKind.leftLeaveDays}</span>
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
                                <div>
                                    <span>
                                        {format(selectedLeaveProps.leaveDates[0].dateInfo.date, 'M월 d일(EE)', {locale: ko})}
                                    </span>
                                    {selectedLeaveProps.leaveDates.length===2 && <span>
                                        {format(selectedLeaveProps.leaveDates[1].dateInfo.date, ' - M월 d일(EE)', {locale: ko})}
                                    </span>}
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
                            "focus: border"}/>
                    </Card.Content>
                </Card>
            </div>

        </div>
    );
}

export default LeaveApplicationPage;