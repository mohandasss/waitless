import { useMutation } from "@tanstack/react-query";
import { api } from "@/APis/api";

import type {
	SendOtpRequest,
	VerifyOtpRequest,
} from "./Types";



export const useSendSalonOtp = () => {
	const mutation = useMutation({
		mutationFn: async (payload: SendOtpRequest) => {
			try {
				return await api.sendOtpWithStatus(payload);
			} catch (error: any) {
				const errorMessage =
					error?.response?.data?.message ||
					"Failed to send OTP";

				throw new Error(errorMessage);
			}
		},
	});

	return {
		sendOtp: mutation.mutateAsync,

		sendOtpData: mutation.data?.data ?? null,

		isSendingOtp: mutation.isPending,

		sendOtpError:
			(mutation.error as Error | null)?.message ?? null,

		resetSendOtp: mutation.reset,
	};
};




export const useVerifySalonOtp = () => {
	const mutation = useMutation({
		mutationFn: async (payload: VerifyOtpRequest) => {
			try {
				return await api.verifyOtpWithStatus(payload);
			} catch (error: any) {
				const errorMessage =
					error?.response?.data?.message ||
					"Failed to verify OTP";

				throw new Error(errorMessage);
			}
		},
	});

	return {
		verifyOtp: mutation.mutateAsync,

		verifyOtpData: mutation.data?.data ?? null,

		isVerifyingOtp: mutation.isPending,

		verifyOtpError:
			(mutation.error as Error | null)?.message ?? null,

		resetVerifyOtp: mutation.reset,
	};
};