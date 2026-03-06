"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";

const checkAndSigninOtp = async (otp: string, email: string) => {
  try {
    const record = await prisma.verification.findFirst({
      where: {
        identifier: email, // BetterAuth stores OTP keyed by email
        value: otp,
        expiresAt: { gt: new Date() }, // not expired
      },
    });

    if (!record) {
      return {
        isSuccess: false,
        message: "Invalid or expired OTP 😢",
      };
    }

    // ✅ Step 2: OTP is valid — sign in (creates user if new, creates session)
    const data = await auth.api.signInEmailOTP({
      body: { email, otp, name: email.split("@")[0] },
    });

    if (!data) {
      return {
        isSuccess: false,
        message: "Sign in failed 😢",
      };
    }

    return {
      isSuccess: true,
      message: "User Login Successfully 👍",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "User Login failed 😢",
    };
  }
};

export default checkAndSigninOtp;
