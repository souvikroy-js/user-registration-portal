"use server";

import { auth } from "@/lib/betterAuth/auth";

const checkAndSigninOtp = async (otp: string, email: string) => {
  // Step 1: validate OTP first
  const isValid = await auth.api.checkVerificationOTP({
    body: { email, otp, type: "sign-in" },
  });

  if (!isValid) throw new Error("Invalid or expired OTP");

  // Step 2: sign in and create session
  const data = await auth.api.signInEmailOTP({
    body: { email, otp },
  });

  return data;
};

export default checkAndSigninOtp;
