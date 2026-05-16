import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phoneOrEmail: z.string().refine((val) => {
    const isEmail = z.string().email().safeParse(val).success;
    const isPhone = phoneRegex.test(val);
    return isEmail || isPhone;
  }, "Must be a valid email or 10-digit phone number"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
