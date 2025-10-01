export interface OverTimeHoursResponse {
    overTimeHours : number;
    overTimeMinutes : number;
    totalOverTimeHours : number;
    totalOverTimeMinutes : number;
    totalFamilyDaysUseHours : number;
    totalFamilyDaysUseMinutes : number;
}

export interface MyFamilyDaysResponse {
    myFamilyDays : FamilyDay[] | null;
}

export interface FamilyDay {
    count: number;
    date: string;
    familyTimeTypeCd : '20'|'30';
    familyTimeTypeNm : '오전'|'오후';
}

