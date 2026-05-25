import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { AuthMethod } from "@/APis/api";

interface OTPVerificationProps {
  onVerify: (otp: string) => Promise<void> | void;
  onBack: () => void;
  method: AuthMethod;
  phoneNumber?: string;
  isVerifying?: boolean;
  onResend: () => Promise<void> | void;
  isResending?: boolean;
}

export function OTPVerification({
  onVerify,
  onBack,
  phoneNumber = "+91 XXXXX XXXXX",
  isVerifying = false,
  onResend,
  isResending = false,
}: OTPVerificationProps) {
  const [otp, setOtp] = React.useState("");

  const handleVerify = () => {
    void onVerify(otp);
  };

  const handleComplete = (value: string) => {
    setOtp(value);
  };

  return (
    <Card className="border-surface-variant bg-surface-container-low shadow-[0px_6px_20px_rgba(0,0,0,0.08)] rounded-3xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Verify OTP</CardTitle>
        <CardDescription className="text-on-surface-variant mt-xs">
          We have sent a verification code to <span className="text-primary font-medium">{phoneNumber}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={handleComplete}
          containerClassName="justify-center"
        >
          <InputOTPGroup className="gap-2">
            <InputOTPSlot index={0} className="w-12 h-14 rounded-xl border-surface-variant focus:border-primary focus:ring-primary text-lg font-medium" />
            <InputOTPSlot index={1} className="w-12 h-14 rounded-xl border-surface-variant focus:border-primary focus:ring-primary text-lg font-medium" />
            <InputOTPSlot index={2} className="w-12 h-14 rounded-xl border-surface-variant focus:border-primary focus:ring-primary text-lg font-medium" />
            <InputOTPSlot index={3} className="w-12 h-14 rounded-xl border-surface-variant focus:border-primary focus:ring-primary text-lg font-medium" />
            <InputOTPSlot index={4} className="w-12 h-14 rounded-xl border-surface-variant focus:border-primary focus:ring-primary text-lg font-medium" />
            <InputOTPSlot index={5} className="w-12 h-14 rounded-xl border-surface-variant focus:border-primary focus:ring-primary text-lg font-medium" />
          </InputOTPGroup>
        </InputOTP>

        <div className="text-center text-sm text-on-surface-variant">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={() => void onResend()}
            disabled={isResending}
            className="text-primary underline underline-offset-4 font-medium hover:text-primary/80 disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className="w-full !text-white bg-primary-container py-lg font-body-cta text-body-cta rounded-full flex justify-center items-center shadow-[0px_6px_20px_rgba(0,0,0,0.08)] hover:bg-primary-container/90 disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
        <Button
          onClick={onBack}
          variant="ghost"
          className="w-full text-on-surface-variant font-body-cta py-lg  text-body-cta rounded-full hover:bg-surface-container-high"
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
