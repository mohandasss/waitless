export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse<T> = {
  success: false;
  message: string;
  data: T;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse<T>;

export type ApiEnvelope<T> = {
  statusCode: number;
  body: ApiResponse<T>;
};

export const apiResponse = <T = Record<string, never>>(
  statusCode: number,
  message: string,
  success: boolean,
  data: T = {} as T
): ApiEnvelope<T> => ({
  statusCode,
  body: {
    success,
    message,
    data,
  } as ApiResponse<T>,
});