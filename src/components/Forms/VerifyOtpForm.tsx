"use client";

import checkAndSigninOtp from "@/hooks/checkAndSigninOtp";
import { verifyOtpSchema } from "@/lib/schema";
import { VerifyOtpType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LockIcon, MailIcon, RefreshCwIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../shadcnui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../shadcnui/input-otp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type VerifyOtpFormProps = {
  email: string | undefined;
};

const VerifyOtpForm = ({ email }: VerifyOtpFormProps) => {
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  const verifyOtpHandler = async ({ otp }: VerifyOtpType) => {
    if (!email) {
      return;
    }

    const { isSuccess, message } = await checkAndSigninOtp(otp, email);

    if (isSuccess) {
      toast.success(message);
      replace("/registration");
    } else {
      toast.error(message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(verifyOtpHandler)}
        className="grid gap-6"
        noValidate>
        {/* otp field */}
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
                  size="xs">
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
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2" />
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <FieldDescription className="p-1">
                <a href="#">I no longer have access to this email address.</a>
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 dark:border-zinc-700 dark:bg-zinc-800/60">
          <MailIcon className="mt-px h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
          <p className="text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Didn&apos;t receive an email? Check your spam folder or
            <button
              type="button"
              className="font-semibold text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300">
              resend the code
            </button>
            .
          </p>
        </div>

        <Button
          className="h-11"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ?
            <>
              <Loader2Icon className="animate-spin" /> Submitting..
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
