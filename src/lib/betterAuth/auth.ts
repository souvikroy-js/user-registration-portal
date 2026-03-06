import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { transporter } from "../nodemailer";
import prisma from "../database/dbClient";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  // ... other config options
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
          await transporter.sendMail({
            to: email,
            subject: "Your OTP Code",
            html: `
            <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
              <h2 style="color: #18181b;">Your verification code</h2>
              <p style="color: #71717a;">Use the code below to complete your sign in.</p>
              <div style="
                font-size: 2rem;
                font-weight: bold;
                letter-spacing: 0.5rem;
                color: #18181b;
                background: #f4f4f5;
                padding: 1rem 2rem;
                border-radius: 8px;
                text-align: center;
                margin: 1.5rem 0;
              ">
                ${otp}
              </div>
              <p style="color: #a1a1aa; font-size: 0.85rem;">
                This code expires in 5 minutes. Do not share it with anyone.
              </p>
            </div>
          `,
          });
        } else if (type === "email-verification") {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
});
