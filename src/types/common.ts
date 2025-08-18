export interface ApiResponse<ResultDataType> {
    isSuccess: boolean;
    result : ResultDataType;
    message?: string;
}