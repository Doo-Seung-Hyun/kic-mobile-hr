import {useState} from 'react';
import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import type {LeaveType, SelectedLeaveProps} from "../types/leave.ts";
import {addDays, format, nextSunday, previousSunday} from "date-fns";
import {ko} from "date-fns/locale";
import LeaveSelectionBottomSheetContent
    from "../features/mainpage/leaveApplication/components/LeaveSelectionBottomSheetContent.tsx";
import LeavePeriodBottomSheet from "../features/mainpage/leaveApplication/components/LeavePeriodBottomSheet.tsx";
import {useBottomSheetToggle} from "../stores/bottomSheetStore.ts";

const myLeaveDays : LeaveType[] = [
    {leaveTypeCode: '001', leaveTypeName: '연차휴가', leftLeaveDays: 10},
    {leaveTypeCode: '002', leaveTypeName: '저축휴가', leftLeaveDays: 2},
    {leaveTypeCode: '003', leaveTypeName: '자녀돌봄', leftLeaveDays: 1},
    {leaveTypeCode: '004', leaveTypeName: '배우자 출산', leftLeaveDays: 2},
    {leaveTypeCode: '005', leaveTypeName: '배우자 출산', leftLeaveDays: 20},
    {leaveTypeCode: '006', leaveTypeName: '입양', leftLeaveDays: 20},
    {leaveTypeCode: '007', leaveTypeName: '가족돌봄', leftLeaveDays: 10},
    {leaveTypeCode: '008', leaveTypeName: '본인결혼', leftLeaveDays: 5},
    {leaveTypeCode: '009', leaveTypeName: '배우자사망', leftLeaveDays: 5},
    {leaveTypeCode: '010', leaveTypeName: '본인 및 배우자 부모의 사망', leftLeaveDays: 5},
    {leaveTypeCode: '011', leaveTypeName: '본인 및 배우자 형제자매 사망', leftLeaveDays: 1},
    {leaveTypeCode: '012', leaveTypeName: '본인 및 배우자 조부모 사망', leftLeaveDays: 3},
    {leaveTypeCode: '013', leaveTypeName: '자녀결혼', leftLeaveDays: 1},
    {leaveTypeCode: '014', leaveTypeName: '백신접종', leftLeaveDays: 1},
    {leaveTypeCode: '015', leaveTypeName: '건강검진', leftLeaveDays: 1},
    {leaveTypeCode: '016', leaveTypeName: '예비군', leftLeaveDays: 1},
    {leaveTypeCode: '017', leaveTypeName: '보상휴가', leftLeaveDays: 0},
    {leaveTypeCode: '018', leaveTypeName: '대체휴가', leftLeaveDays: 0},
    // {leaveTypeCode: '004', leaveTypeName: '공가', leftLeaveDays: 1}
];

const datePickerSvg = <svg className="w-5 text-gray-500"
                           aria-hidden="true" viewBox="0 0 24 24">
    <path
        d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
        fill={"currentColor"}></path>
</svg>;


function LeaveApplicationPage() {
    const [selectedLeave, setSelectedLeave] = useState<LeaveType>(myLeaveDays.find(leave => leave.leaveTypeCode === '001'));

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {openBottomSheet, closeBottomSheet} = useBottomSheetToggle<SelectedLeaveProps>();

    // 휴가종류 선택 핸들러
    const handleLeaveTypeClick = () =>{
        const content =
            <LeaveSelectionBottomSheetContent
                selectedLeave={selectedLeave}
                onLeaveSelect={newSelectedLeave => {
                    if(newSelectedLeave) setSelectedLeave(newSelectedLeave)
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

    //1일 휴가여부 (false는 휴가기간 설정)
    const isOneDayLeave = selectedLeaveProps?.leaveDates.length==1;

    return (
        <div className={"flex flex-col gap-4"}>
            <div>
                <div className="font-bold text-xl pt-6 pb-4">휴가 종류를 선택해주세요</div>
                <Card>
                    <Card.Content>
                        <div>
                            <Button variant={"none"}
                                    className={`flex flex-row w-full justify-between px-1 text-gray-800`}
                                    onClick={handleLeaveTypeClick}>
                                <span>{selectedLeave.leaveTypeName}</span>
                                <div>
                                    <span>{selectedLeave.leftLeaveDays}</span>
                                    <span className="text-sm font-normal text-gray-500 pl-1">일</span>
                                </div>
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">언제 가시나요?</div>
                <Card>
                    <Card.Content className={"font-normal px-2"}>
                        <div className={"py-2"}
                             onClick={handleLeaveDateClick}
                        >
                            날짜를 선택해주세요
                        </div>
                        {selectedLeaveProps?.leaveDates.length==1 && <>
                            <div className={"flex items-center pb-4"}>
                                <span className={"flex-1"}>휴가일자</span>
                                <div>
                                    <div className={"relative"}>
                                        <input type={"text"}
                                               readOnly={true}
                                               className={"border rounded-md p-1 px-2 w-32 text-sm font-semibold"}
                                               value={format(selectedLeaveProps?.leaveDates[0].dateInfo.date, 'yyyy.M.d(EE)', {locale: ko})}
                                        />
                                        <button className={"absolute right-1 top-1/2 transform -translate-y-1/2"}
                                                onClick={openModal}
                                        >
                                            {datePickerSvg}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </>}

                    </Card.Content>
                </Card>
            </div>

            <div>
                <div className="font-bold text-xl pt-6 pb-4">휴가사유를 입력해주세요</div>
                <Card>
                    <Card.Header>휴가 사유</Card.Header>
                    <Card.Content>
                        <textarea className={"appearance-none border w-full h-40 " +
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