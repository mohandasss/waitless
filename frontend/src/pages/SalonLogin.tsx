import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginHero } from "./SalonLogin/LoginHero";
import { TrustIndicators } from "./SalonLogin/TrustIndicators";
import { LoginFooter } from "./SalonLogin/LoginFooter";
import { useNotificationStore } from "@/store/useNotificationStore";
import { cn } from "@/lib/utils";

export default function SalonLogin() {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const [selectedRole, setSelectedRole] = React.useState("Salon Owner");

  const handleSendOTP = () => {
    addNotification({
      message: "OTP sent successfully!",
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

        {/* Role Selection */}
        <section className="mb-md">
          <div className="flex gap-unit overflow-x-auto pb-sm no-scrollbar">
            <Button
              onClick={() => setSelectedRole("Salon Owner")}
              className={cn(
                "font-meta-label text-meta-label px-lg py-md rounded-full whitespace-nowrap transition-colors",
                selectedRole === "Salon Owner"
                  ? "bg-primary !text-white shadow-[0px_4px_12px_rgba(186,0,54,0.2)]"
                  : "bg-surface-container text-on-surface-variant border border-surface-variant hover:bg-surface-container/80"
              )}
            >
              Salon Owner
            </Button>
            <Button
              onClick={() => setSelectedRole("Barber")}
              className={cn(
                "font-meta-label text-meta-label px-lg py-md rounded-full whitespace-nowrap transition-colors",
                selectedRole === "Barber"
                  ? "bg-primary !text-white shadow-[0px_4px_12px_rgba(186,0,54,0.2)]"
                  : "bg-surface-container text-on-surface-variant border border-surface-variant hover:bg-surface-container/80"
              )}
            >
              Barber
            </Button>
            <Button
              onClick={() => setSelectedRole("Staff")}
              className={cn(
                "font-meta-label text-meta-label px-lg py-md rounded-full whitespace-nowrap transition-colors",
                selectedRole === "Staff"
                  ? "bg-primary !text-white shadow-[0px_4px_12px_rgba(186,0,54,0.2)]"
                  : "bg-surface-container text-on-surface-variant border border-surface-variant hover:bg-surface-container/80"
              )}
            >
              Staff
            </Button>
          </div>
        </section>

        {/* Login Form Section */}
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
              />
            </div>
          </div>

          <Button
            onClick={handleSendOTP}
            className="w-full !text-white bg-primary-container py-lg font-body-cta text-body-cta rounded-full flex justify-center items-center shadow-[0px_6px_20px_rgba(0,0,0,0.08)] hover:bg-primary-container/90"
          >
            Send OTP
          </Button>

          <Button
            onClick={handleWhatsAppLogin}
            className="w-full bg-surface-container-lowest border py-lg border-surface-variant text-on-surface font-body-cta text-body-cta rounded-full flex justify-center items-center gap-sm hover:bg-surface-container-low"
          >
            <MessageSquare className="h-5 w-5 text-tertiary" />
            Continue with WhatsApp
          </Button>

          <div className="text-center mt-sm">
            <a className="font-meta-label text-meta-label text-primary underline decoration-primary/30 underline-offset-4" href="#">Email Login</a>
          </div>
        </section>

        {/* Trust Indicators */}
        <TrustIndicators />
      </main>

      {/* Footer (Fixed) */}
      <LoginFooter />
    </div>
  );
}
