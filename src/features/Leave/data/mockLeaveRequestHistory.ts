import type {LeaveApplicationHistoryItem} from "../types/leave.ts";
import {parse} from "date-fns";
/*
    {leaveType: {leaveTypeCode: '001', leaveTypeName: '연차휴가'}, leftLeaveDays: 10, totalLeaveDays: 15},
    {leaveType: {leaveTypeCode: '002', leaveTypeName: '저축휴가'}, leftLeaveDays: 2, totalLeaveDays: 4},
    {leaveType: {leaveTypeCode: '003', leaveTypeName: '자녀돌봄'}, leftLeaveDays: 1, totalLeaveDays: 2},
    {leaveType: {leaveTypeCode: '004', leaveTypeName: '배우자 출산'}, leftLeaveDays: 2, totalLeaveDays: 2},
    {leaveType: {leaveTypeCode: '005', leaveTypeName: '배우자 유,사산'}, leftLeaveDays: 3, totalLeaveDays: 3},
    {leaveType: {leaveTypeCode: '006', leaveTypeName: '입양'}, leftLeaveDays: 20, totalLeaveDays: 20},
    {leaveType: {leaveTypeCode: '007', leaveTypeName: '가족돌봄'}, leftLeaveDays: 10, totalLeaveDays: 10},
    {leaveType: {leaveTypeCode: '008', leaveTypeName: '본인결혼'}, leftLeaveDays: 5, totalLeaveDays: 5},
    {leaveType: {leaveTypeCode: '009', leaveTypeName: '배우자사망'}, leftLeaveDays: 5, totalLeaveDays: 5},
    {leaveType: {leaveTypeCode: '010', leaveTypeName: '본인 및 배우자 부모의 사망'}, leftLeaveDays: 5, totalLeaveDays: 5},
    {leaveType: {leaveTypeCode: '011', leaveTypeName: '본인 및 배우자 형제자매 사망'}, leftLeaveDays: 1, totalLeaveDays: 1},
    {leaveType: {leaveTypeCode: '012', leaveTypeName: '본인 및 배우자 조부모 사망'}, leftLeaveDays: 3, totalLeaveDays: 3},
    {leaveType: {leaveTypeCode: '013', leaveTypeName: '자녀결혼'}, leftLeaveDays: 1, totalLeaveDays: 1},
    {leaveType: {leaveTypeCode: '014', leaveTypeName: '백신접종'}, leftLeaveDays: 1, totalLeaveDays: 1},
    {leaveType: {leaveTypeCode: '015', leaveTypeName: '건강검진'}, leftLeaveDays: 1, totalLeaveDays: 1},
    {leaveType: {leaveTypeCode: '016', leaveTypeName: '예비군'}, leftLeaveDays: 1, totalLeaveDays: 1},
    {leaveType: {leaveTypeCode: '017', leaveTypeName: '보상휴가'}, leftLeaveDays: 0, totalLeaveDays: 2},
    {leaveType: {leaveTypeCode: '018', leaveTypeName: '대체휴가'}, leftLeaveDays: 0, totalLeaveDays: 2},
 */

/*
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'M', halfLeaveTypeCdName: '오전반차'},
    {dayOffTypeCd: 'P', dayOffTypeCdName: '반반차', halfLeaveTypeCd: 'M', halfLeaveTypeCdName: '오전반반차'},
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'A', halfLeaveTypeCdName: '오후반차'},
    {dayOffTypeCd: 'P', dayOffTypeCdName: '반반차', halfLeaveTypeCd: 'A', halfLeaveTypeCdName: '오후반반차'},
    {dayOffTypeCd: 'H', dayOffTypeCdName: '반차', halfLeaveTypeCd: 'E', halfLeaveTypeCdName: '8:00 출근 (12:00 퇴근)'},
 */

const TODAY = new Date();

const MOCK_LEAVE_REQUEST_HISTORY:LeaveApplicationHistoryItem[] = [
    {empNo: 2230103,
        leaveType: {leaveTypeName:'연차휴가', leaveTypeCode:'001'},
        leavePeriodProps: {leaveDays:0.5,
            leaveDates:[
                {halfLeaveType:{halfLeaveTypeCd:'E', halfLeaveTypeCdName: '8:00 출근 (12:00 퇴근)', dayOffTypeCd:'H', dayOffTypeCdName:'반차'},
                    dateInfo:{date:parse('20250210','yyyyMMdd', TODAY), yyyyMMdd: '20250210'}
                },
            ],
            dateComponentType:'datePicker'
        },
        statusCd: '130', //결재취소
        appliedAt: '20250210 13:55:10',
    },
    {empNo: 2230103,
        leaveType: {leaveTypeName:'연차휴가', leaveTypeCode:'001'},
        leavePeriodProps: {leaveDays:3,
            leaveDates:[
                {
                    dateInfo:{date:parse('20250703','yyyyMMdd', TODAY), yyyyMMdd: '20250703'}
                },
                {
                    dateInfo:{date:parse('20250707','yyyyMMdd', TODAY), yyyyMMdd: '20250707'}
                },
            ],
            dateComponentType:'datePicker'
        },
        statusCd: '132', //결재완료
        appliedAt: '20250628 14:05:00',
        approvedAt: '20250701 10:45:10',
    },
    {empNo: 2230103,
        leaveType: {leaveTypeName:'대체휴가', leaveTypeCode:'018'},
        leavePeriodProps: {leaveDays:1,
            leaveDates:[
                {
                    dateInfo:{date:parse('20250729','yyyyMMdd', TODAY), yyyyMMdd: '20250729'}
                },
            ],
            dateComponentType:'datePicker'
        },
        statusCd: '132', //결재완료
        appliedAt: '20250724 14:05:00',
        approvedAt: '20250725 10:45:10',
    },
    {empNo: 2230103,
        leaveType: {leaveTypeName:'연차휴가', leaveTypeCode:'001'},
        leavePeriodProps: {leaveDays:1,
            leaveDates:[
                {
                    dateInfo:{date:parse('20250811','yyyyMMdd', TODAY), yyyyMMdd: '20250811'}
                },
            ],
            dateComponentType:'datePicker'
        },
        statusCd: '132', //결재완료
        appliedAt: '20250801 10:45:10',
        approvedAt: '20250805 16:14:22',
    },
];

export default MOCK_LEAVE_REQUEST_HISTORY;