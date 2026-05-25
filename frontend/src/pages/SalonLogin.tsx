import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotificationStore } from "@/store/useNotificationStore";
import { LoginFooter } from "./SalonLogin/LoginFooter";
import { LoginHero } from "./SalonLogin/LoginHero";
import { OTPVerification } from "./SalonLogin/OTPVerification";
import { SalonSignup } from "./SalonLogin/SalonSignup";
import { TrustIndicators } from "./SalonLogin/TrustIndicators";
import { useSendSalonOtp, useVerifySalonOtp } from "./SalonLogin/hooks/useSalonLogin";
import type { AuthMethod } from "@/APis/api";

export default function SalonLogin() {
	const navigate = useNavigate();
	const { success: notifySuccess, error: notifyError, warning: notifyWarning, info: notifyInfo, show } = useNotificationStore();
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [isSignup, setIsSignup] = React.useState(false);
	const [showOTP, setShowOTP] = React.useState(false);
	const [activeMethod, setActiveMethod] = React.useState<AuthMethod | null>(null);
	const [otpSession, setOtpSession] = React.useState<{ phone: string; method: AuthMethod } | null>(null);

	// hook for salon login
	const { sendOtp, isSendingOtp, sendOtpError } = useSendSalonOtp();
	const { verifyOtp, isVerifyingOtp, verifyOtpError } = useVerifySalonOtp();

	const normalizedPhone = phoneNumber.replace(/\D/g, "");
	const otpPhoneNumber = otpSession?.phone ?? normalizedPhone;

	const requestOtp = async (method: AuthMethod) => {
		setActiveMethod(method);

		if (normalizedPhone.length !== 10) {
			setActiveMethod(null);
			notifyWarning("Enter a valid 10-digit mobile number.");
			return;
		}

		try {
			const response = await sendOtp({ phone: normalizedPhone, method });

			if (response?.success) {
				setOtpSession({ phone: normalizedPhone, method });
				notifySuccess(response.message ?? "OTP sent successfully!");
				setShowOTP(true);
				return;
			}

			notifyError(response?.message ?? "Could not send OTP. Please try again.");
		} catch (err: any) {
			notifyError(err?.message ?? "Could not reach the server. Please try again.");
		} finally {
			setActiveMethod(null);
		}
	};

	const handleSendOTP = () => {
		void requestOtp("sms");
	};

	const handleResendOTP = () => {
		if (!otpSession) {
			return;
		}

		void requestOtp(otpSession.method);
	};

	const handleVerifyOTP = async (otp: string) => {
		if (!otpSession) {
			notifyWarning("Request an OTP before verifying it.");
			return;
		}

		try {
			const response = await verifyOtp({
				phone: otpSession.phone,
				method: otpSession.method,
				otp,
			});

			if (response.success) {
				if (response.data?.accessToken) {
					sessionStorage.setItem("accessToken", response.data.accessToken);
				}

				notifySuccess(response.message ?? "OTP verified successfully!");
				navigate("/dashboard");
				return;
			}

			notifyError(response.message ?? "Could not verify OTP. Please try again.");
		} catch (err: any) {
			notifyError(err?.message ?? "Could not verify OTP. Please try again.");
		}
	};

	useEffect(() => {
		if (sendOtpError) {
			notifyError(sendOtpError);
		}
	}, [notifyError, sendOtpError]);

	useEffect(() => {
		if (verifyOtpError) {
			notifyError(verifyOtpError);
		}
	}, [notifyError, verifyOtpError]);

	const handleWhatsAppLogin = () => {
		void requestOtp("whatsapp");
	};

	const handleBackFromOtp = () => {
		
		setShowOTP(false);
	};

	return (
		<div className="bg-surface-container-lowest text-on-surface h-screen flex flex-col font-poppins overflow-hidden">
			{/* Top AppBar Style Header for Standalone Screen */}
			<header className="flex-shrink-0 flex justify-center items-center w-full px-container-padding py-md bg-surface-container-lowest border-b border-surface-variant">
				<h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">WaitLess</h1>
			</header>

			{/* Content (Scrollable) */}
			<main className="flex-grow overflow-y-hidden px-container-padding py-md max-w-md mx-auto w-full">
				{/* Hero Section */}
				<LoginHero />


				{/* Login Form Section */}
				{showOTP ? (
					<OTPVerification
						onVerify={handleVerifyOTP}
						onBack={handleBackFromOtp}
						phoneNumber={`+91 ${otpPhoneNumber}`}
						method={otpSession?.method ?? "sms"}
						isVerifying={isVerifyingOtp}
						onResend={handleResendOTP}
						isResending={isSendingOtp}
					/>
				) : isSignup ? (
					<SalonSignup onContinue={() => setShowOTP(true)} />
				) : (
					<section className="flex flex-col gap-md mb-md">
						<div className="flex flex-col gap-xs">
							<div className="flex items-center bg-surface-container-low rounded-full border border-surface-variant focus-within:border-outline-variant transition-colors overflow-hidden h-[56px]">
								<div className="flex items-center px-md border-r border-surface-variant bg-surface-container-low text-on-surface-variant h-full font-wait-time text-wait-time cursor-pointer">
									+91
									<ChevronDown className="ml-xs h-5 w-5" />
								</div>
								<Input
									value={phoneNumber}
									onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, ""))}
									className="flex-grow bg-transparent border-none focus-visible:ring-0 px-md font-wait-time text-wait-time text-on-surface placeholder-on-surface-variant/50 outline-none h-full"
									pattern="[0-9]*"
									placeholder="Phone Number"
									type="tel"
									maxLength={10}
								/>
							</div>
						</div>

						<Button
							onClick={handleSendOTP}
							disabled={isSendingOtp}
							className="w-full !text-white bg-primary-container py-lg font-body-cta text-body-cta rounded-full flex justify-center items-center shadow-[0px_6px_20px_rgba(0,0,0,0.08)] hover:bg-primary-container/90"
						>
							{isSendingOtp && activeMethod === "sms" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
							Send OTP on Mobile
						</Button>

						<Button
							onClick={handleWhatsAppLogin}
							disabled={isSendingOtp}
							className="w-full bg-surface-container-lowest border py-lg border-surface-variant text-on-surface font-body-cta text-body-cta rounded-full flex justify-center items-center gap-sm hover:bg-surface-container-low"
						>
							{isSendingOtp && activeMethod === "whatsapp" ? (
								<Loader2 className="h-5 w-5 animate-spin text-tertiary" />
							) : (
								<MessageSquare className="h-5 w-5 text-tertiary" />
							)}
							Get OTP on WhatsApp
						</Button>

						{/* <div className="text-center mt-sm">
						  <a className="font-meta-label text-meta-label text-primary underline decoration-primary/30 underline-offset-4" href="#">Email Login</a>
						</div> */}
						<TrustIndicators />
					</section>
				)}

				{/* Trust Indicators */}

			</main>

			{/* Footer (Fixed) */}
			<LoginFooter isSignup={isSignup} onToggle={() => setIsSignup(!isSignup)} />
		</div>
	);
}