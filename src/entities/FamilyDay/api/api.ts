import type {ApiResponse} from "../../../types/common.ts";
import type {MyFamilyDaysResponse, OverTimeHoursResponse} from "../model/types.ts";
import {format} from "date-fns";

export const getOverTimeHours = async (empNo:number):Promise<ApiResponse<OverTimeHoursResponse>> => {
    return new Promise<ApiResponse<OverTimeHoursResponse>>(resolve => {
        const totalOverTimeHours = Math.floor(Math.random() * 8);
        const totalOverTimeMinutes = totalOverTimeHours==8? 0 : Math.floor(Math.random() * 5)*10;
        const totalFamilyDaysUseHours = Math.floor(Math.random() * totalOverTimeHours);
        const totalFamilyDaysUseMinutes = 0;

        setTimeout(()=>{
            resolve({
                isSuccess : true,
                message : '가족과 함께하는 날 잔여시간이 정상 조회되었습니다',
                result : {
                    totalOverTimeHours,
                    totalOverTimeMinutes,
                    totalFamilyDaysUseHours,
                    totalFamilyDaysUseMinutes,
                    overTimeHours : totalOverTimeHours - totalFamilyDaysUseHours,
                    overTimeMinutes : totalOverTimeMinutes - totalFamilyDaysUseMinutes,
                }
            })
        }, 1600);
    })
};

export const getMyFamilyDays =
    async (empNo: number, yyyyMm: string):Promise<ApiResponse<MyFamilyDaysResponse>> => {
        const today = new Date();
        const yyyyMM = format(today, 'yyyyMM');

        return new Promise<ApiResponse<MyFamilyDaysResponse>>(resolve => {
            setTimeout(()=>{
                resolve({
                    isSuccess : true,
                    message : `${yyyyMm} 가족과 함께하는 날 목록이 정상 조회되었습니다`,
                    result : {
                        myFamilyDays : [
                            {
                                count: 1,
                                date: `${yyyyMM}03`,
                                familyTimeTypeCd: '30',
                                familyTimeTypeNm: '오후'
                            },
                            {
                                count: 2,
                                date: `${yyyyMM}14`,
                                familyTimeTypeCd: '20',
                                familyTimeTypeNm: '오전'
                            },
                            {
                                count: 3,
                                date: `${yyyyMM}22`,
                                familyTimeTypeCd: '30',
                                familyTimeTypeNm: '오후'
                            },
                            {
                                count: 4,
                                date: `${yyyyMM}28`,
                                familyTimeTypeCd: '30',
                                familyTimeTypeNm: '오후'
                            },
                        ]
                    }
                })
            },1100)

        })
}