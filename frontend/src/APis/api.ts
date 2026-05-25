import { apiAgent, type HttpResponse } from "./AxiosWrapper";
import type { SendOtpData, SendOtpRequest, VerifyOtpData, VerifyOtpRequest } from "./Types";

export type { AuthMethod } from "./Types";

class Api {
	async sendOtp(payload: SendOtpRequest): Promise<SendOtpData | null> {
		const response = await apiAgent
			.path("/auth/send-otp")
			.method("POST")
			.json(payload)
			.execute<SendOtpData>();
		return response.data;
	}

	async sendOtpWithStatus(payload: SendOtpRequest): Promise<HttpResponse<SendOtpData>> {
		return apiAgent
			.path("/auth/send-otp")
			.method("POST")
			.json(payload)
			.execute<SendOtpData>();
	}

	async verifyOtpWithStatus(payload: VerifyOtpRequest): Promise<HttpResponse<VerifyOtpData>> {
		return apiAgent
			.path("/auth/verify-otp")
			.method("POST")
			.json(payload)
			.execute<VerifyOtpData>();
	}




















}

export const api = new Api();

export default api;