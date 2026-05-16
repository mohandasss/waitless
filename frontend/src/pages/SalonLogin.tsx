import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginHero } from "./SalonLogin/LoginHero";
import { TrustIndicators } from "./SalonLogin/TrustIndicators";
import { LoginFooter } from "./SalonLogin/LoginFooter";
import { SalonSignup } from "./SalonLogin/SalonSignup";
import { OTPVerification } from "./SalonLogin/OTPVerification";
import { useNotificationStore } from "@/store/useNotificationStore";
import { cn } from "@/lib/utils";

export default function SalonLogin() {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const [selectedRole, setSelectedRole] = React.useState("Salon Owner");
  const [isSignup, setIsSignup] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);

  const handleSendOTP = () => {
    addNotification({
      message: "OTP sent successfully!",
      type: "success",
    });
    setShowOTP(true);
  };

  const handleVerifyOTP = (otp: string) => {
    addNotification({
      message: "OTP verified successfully!",
      type: "success",
    });
    // Navigate to dashboard for testing
    navigate("/dashboard");
  };


  const handleWhatsAppLogin = () => {
    addNotification({
      message: "WhatsApp login is not available yet.",
      type: "info",
    });
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
            onBack={() => setShowOTP(false)}
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
              className="w-full !text-white bg-primary-container py-lg font-body-cta text-body-cta rounded-full flex justify-center items-center shadow-[0px_6px_20px_rgba(0,0,0,0.08)] hover:bg-primary-container/90"
            >
              Send OTP on Mobile
            </Button>

            <Button
              onClick={handleWhatsAppLogin}
              className="w-full bg-surface-container-lowest border py-lg border-surface-variant text-on-surface font-body-cta text-body-cta rounded-full flex justify-center items-center gap-sm hover:bg-surface-container-low"
            >
              <MessageSquare className="h-5 w-5 text-tertiary" />
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
