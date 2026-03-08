import z from "zod";

// login form data schema
export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
});

// Verify Otp schema
export const verifyOtpSchema = z.object({
  otp: z.string().length(6, { error: "Invalid OTP" }),
});

// personal details schema
export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, { error: "Full name must be at least 2 characters" }),

  email: z.email({ error: "Invalid email address" }),

  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),

  state: z.string().min(2, { error: "State is required" }),

  district: z.string().min(2, { error: "District is required" }),

  city: z.string().min(2, { error: "City is required" }),

  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),

  place: z.string().min(2, { error: "Place is required" }),
});
