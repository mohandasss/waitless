import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import HeroHeading from "../Discover/components/HeroHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "./validation";

interface SalonSignupProps {
  onContinue: () => void;
}

export function SalonSignup({ onContinue }: SalonSignupProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup data:", data);
    onContinue();
  };

  return (
    <section className="flex flex-col gap-md mb-md">
      <HeroHeading
        text="New Owner Signup"
        as="h2"
        className="font-headline-lg-mobile text-headline-lg-mobile mx-auto  justify-center text-on-surface mb-xs"
      />

      {/* Name */}
      <div className="flex flex-col gap-xs">
        <div className="flex items-center bg-surface-container-low rounded-full border border-surface-variant focus-within:border-outline-variant transition-colors overflow-hidden h-[56px]">
          <Input
            className="flex-grow bg-transparent border-none focus-visible:ring-0 px-md font-wait-time text-wait-time text-on-surface placeholder-on-surface-variant/50 outline-none h-full"
            placeholder="Name"
            type="text"
            {...register("name")}
          />
        </div>
        {errors.name && <span className="text-destructive text-sm ml-4">{errors.name.message}</span>}
      </div>

      {/* Salon Name */}
      <div className="flex flex-col gap-xs">
        <div className="flex items-center bg-surface-container-low rounded-full border border-surface-variant focus-within:border-outline-variant transition-colors overflow-hidden h-[56px]">
          <Input
            className="flex-grow bg-transparent border-none focus-visible:ring-0 px-md font-wait-time text-wait-time text-on-surface placeholder-on-surface-variant/50 outline-none h-full"
            placeholder="Salon Name"
            type="text"
            {...register("salonName")}
          />
        </div>
        {errors.salonName && <span className="text-destructive text-sm ml-4">{errors.salonName.message}</span>}
      </div>

      {/* Address */}
      <div className="flex flex-col gap-xs">
        <div className="flex items-center bg-surface-container-low rounded-full border border-surface-variant focus-within:border-outline-variant transition-colors overflow-hidden h-[56px]">
          <Input
            className="flex-grow bg-transparent border-none focus-visible:ring-0 px-md font-wait-time text-wait-time text-on-surface placeholder-on-surface-variant/50 outline-none h-full"
            placeholder="Address"
            type="text"
            {...register("address")}
          />
        </div>
        {errors.address && <span className="text-destructive text-sm ml-4">{errors.address.message}</span>}
      </div>

      {/* Phone/Email */}
      <div className="flex flex-col gap-xs">
        <div className="flex items-center bg-surface-container-low rounded-full border border-surface-variant focus-within:border-outline-variant transition-colors overflow-hidden h-[56px]">
          <Input
            className="flex-grow bg-transparent border-none focus-visible:ring-0 px-md font-wait-time text-wait-time text-on-surface placeholder-on-surface-variant/50 outline-none h-full"
            placeholder="Phone or Email"
            type="text"
            {...register("phoneOrEmail")}
          />
        </div>
        {errors.phoneOrEmail && <span className="text-destructive text-sm ml-4">{errors.phoneOrEmail.message}</span>}
      </div>



      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full !text-white bg-primary-container py-lg font-body-cta text-body-cta rounded-full flex justify-center items-center shadow-[0px_6px_20px_rgba(0,0,0,0.08)] hover:bg-primary-container/90"
      >
        Continue
      </Button>
    </section>
  );
}
