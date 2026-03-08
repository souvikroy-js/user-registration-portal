"use client";

import checkAndSigninOtp from "@/hooks/checkAndSigninOtp";
import sendOtp from "@/hooks/sendOtp";
import { useOtpCountdown } from "@/hooks/useOtpCountdown";
import { verifyOtpSchema } from "@/lib/schema";
import { VerifyOtpType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LockIcon, RefreshCwIcon, TimerIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../shadcnui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../shadcnui/input-otp";

type VerifyOtpFormProps = {
  email: string | undefined;
};

const VerifyOtpForm = ({ email }: VerifyOtpFormProps) => {
  const { minutes, seconds, isExpired, restart } = useOtpCountdown(5);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  const verifyOtpHandler = async ({ otp }: VerifyOtpType) => {
    if (!email) return;
    const { isSuccess, message } = await checkAndSigninOtp(otp, email);

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      redirect("/registration");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    await sendOtp(email);
    reset();
    toast.success("A new OTP has been sent!");
    // ← only restart timer if expired, otherwise keep old countdown running
    if (isExpired) restart();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(verifyOtpHandler)}
        className="grid gap-6"
        noValidate>
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="mb-2 flex items-center justify-between">
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button
                  variant="outline"
                  type="button"
                  size="xs"
                  onClick={handleResend}>
                  <RefreshCwIcon />
                  Resend Code
                </Button>
              </div>

              <div className="overflow-hidden">
                <InputOTP
                  {...field}
                  maxLength={6}
                  id="otp-verification"
                  required>
                  <InputOTPGroup className="flex gap-2 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:border-gray-300 *:data-[slot=input-otp-slot]:bg-gray-50 *:data-[slot=input-otp-slot]:text-center *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:font-semibold *:data-[slot=input-otp-slot]:placeholder-gray-400 *:data-[slot=input-otp-slot]:caret-blue-600 *:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:hover:border-blue-400 *:data-[slot=input-otp-slot]:focus:border-blue-500 *:data-[slot=input-otp-slot]:focus:ring-2 *:data-[slot=input-otp-slot]:focus:ring-blue-200">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Countdown Timer */}
              <div
                className={`mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] transition-colors ${
                  isExpired ?
                    "border-red-200 bg-red-50 text-red-500 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400"
                }`}>
                <TimerIcon
                  className={`h-3.5 w-3.5 shrink-0 ${
                    isExpired ? "text-red-400" : "text-zinc-400"
                  }`}
                />
                {isExpired ?
                  <span>
                    Code expired.{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-semibold underline underline-offset-4 hover:opacity-75">
                      Request a new one
                    </button>
                  </span>
                : <span>
                    Code expires in{" "}
                    <span className="font-mono font-bold text-zinc-900 tabular-nums dark:text-zinc-100">
                      {minutes}:{seconds}
                    </span>
                  </span>
                }
              </div>

              <FieldDescription className="p-1">
                <a href="#">I no longer have access to this email address.</a>
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          className="h-11"
          type="submit"
          disabled={isSubmitting || isExpired}>
          {isSubmitting ?
            <>
              <Loader2Icon className="animate-spin" /> Verifying...
            </>
          : <>
              <LockIcon /> Verify & Sign in
            </>
          }
        </Button>
      </form>
    </>
  );
};

export default VerifyOtpForm;
