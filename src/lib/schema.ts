import z from "zod";

// login form data schema
export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
});

// Verify Otp schema
export const verifyOtpSchema = z.object({
  otp: z.string().length(6, { error: "Invalid OTP" }),
});
