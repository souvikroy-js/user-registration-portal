"use server";

import { auth } from "@/lib/betterAuth/auth";

const sendOtp = async (email: string) => {
  const data = await auth.api.sendVerificationOTP({
    body: {
      email, // required
      type: "sign-in", // required
    },
  });

  return data;
};

export default sendOtp;
