import { authClient } from "@/lib/betterAuth/auth-client";

const checkAndSigninOtp = async (otp: string, email: string) => {
  try {
    const { error } = await authClient.signIn.emailOtp({ email, otp });

    if (error) {
      return {
        isSuccess: false,
        message: "Invalid or expired OTP 😢",
      };
    }

    return {
      isSuccess: true,
      message: "User Login Successfully 👍",
    };
  } catch (error) {
    console.error("OTP Sign-in error:", error); // Check terminal for exact reason
    return {
      isSuccess: false,
      message: "Invalid or expired OTP 😢",
    };
  }
};

export default checkAndSigninOtp;
