"use client";

import { loginSchema } from "@/lib/schema";
import { LoginType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, MailIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import sendOtp from "@/hooks/sendOtp";

const LoginForm = () => {
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const loginHandler = async ({ email }: LoginType) => {
    await sendOtp(email);

    push(`/auth/verify-otp?email=${email}`);
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="grid gap-6"
        noValidate>
        {/* Email field */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                EMAIL ADDRESS
                <span className="font-bold text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <MailIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="pl-8"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 dark:border-zinc-700 dark:bg-zinc-800/60">
          <ShieldCheckIcon className="mt-px h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
          <p className="text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            A <strong>6-digit OTP</strong> will be sent to this address. The
            code expires in <strong>5 minutes</strong>.
          </p>
        </div>

        <Button
          className="h-11"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ?
            <>
              <Loader2Icon className="animate-spin" /> Sending...
            </>
          : <>
              <MailIcon /> Send OTP
            </>
          }
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
