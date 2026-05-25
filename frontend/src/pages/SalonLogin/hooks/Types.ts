import type { HttpResponse } from "@/APis/AxiosWrapper";
import type { AuthMethod, SendOtpData, SendOtpRequest, VerifyOtpData, VerifyOtpRequest } from "@/APis/Types";

export type { SendOtpRequest, VerifyOtpRequest };

export type SendOtpResponse = {
    data: HttpResponse<SendOtpData> | null;
    error: string | null;
};

export type VerifyOtpResponse = {
    data: HttpResponse<VerifyOtpData> | null;
    error: string | null;
};

export type UseSalonLoginResult = {
    data: SendOtpData | null;
    isSendingOtp: boolean;
    isVerifyingOtp: boolean;
    sendError: string | null;
    verifyError: string | null;
    sendOtp: (payload: SendOtpRequest) => Promise<HttpResponse<SendOtpData>>;
    verifyOtp: (payload: VerifyOtpRequest) => Promise<HttpResponse<VerifyOtpData>>;
    reset: () => void;
};