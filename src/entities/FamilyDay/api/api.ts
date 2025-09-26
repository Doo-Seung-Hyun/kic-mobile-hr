import type {ApiResponse} from "../../../types/common.ts";
import type {OverTimeHoursResponse} from "../model/types.ts";

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

export const getUpcomingFamilyDay = async (empNo: number):Promise<ApiResponse<UpcomingFamilyDayResponse>> => {

}