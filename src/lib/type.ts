import { ReactNode } from "react";
import { loginSchema, verifyOtpSchema } from "./schema";
import z from "zod";

// Page Layout Props type
export type PageLayoutProps = Readonly<{
  children: ReactNode;
}>;

// Login form data type
export type LoginType = z.infer<typeof loginSchema>;

// Verify Otp type
export type VerifyOtpType = z.infer<typeof verifyOtpSchema>;
