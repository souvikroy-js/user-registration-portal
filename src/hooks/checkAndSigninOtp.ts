// "use server";

// import { auth } from "@/lib/betterAuth/auth";
// import prisma from "@/lib/database/dbClient";
// import { headers } from "next/headers";

// const checkAndSigninOtp = async (otp: string, email: string) => {
//   try {
//     const record = await prisma.verification.findFirst({
//       where: {
//         identifier: email, // BetterAuth stores OTP keyed by email
//         value: otp,
//         expiresAt: { gt: new Date() }, // not expired
//       },
//     });

//     if (!record) {
//       return {
//         isSuccess: false,
//         message: "Invalid or expired OTP 😢",
//       };
//     }

//     // ✅ Step 2: OTP is valid — sign in (creates user if new, creates session)
//     const data = await auth.api.signInEmailOTP({
//       body: { email, otp, name: email.split("@")[0] },
//       headers: await headers(),
//     });

//     if (!data) {
//       return {
//         isSuccess: false,
//         message: "Sign in failed 😢",
//       };
//     }

//     return {
//       isSuccess: true,
//       message: "User Login Successfully 👍",
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       isSuccess: false,
//       message: "User Login failed 😢",
//     };
//   }
// };

// export default checkAndSigninOtp;

"use server";

import { auth } from "@/lib/betterAuth/auth";

const checkAndSigninOtp = async (otp: string, email: string) => {
  try {
    const data = await auth.api.signInEmailOTP({
      body: { email, otp, name: email.split("@")[0] },
      // headers: await headers(),
    });

    if (!data) {
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
