import VerifyOtpForm from "@/components/Forms/VerifyOtpForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { ShieldCheckIcon } from "lucide-react";

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-full max-w-sm drop-shadow-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
        <CardHeader>
          <CardTitle className="mb-8">
            {/* Icon badge */}
            <span className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
              <ShieldCheckIcon className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
            </span>

            <h1 className="mt-5 font-['Georgia',serif] text-[1.6rem] leading-tight font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Verify your login
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Enter the 6-digit code we sent to{" "}
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {/* {email} */}example@gmail.com
              </span>
              .
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VerifyOtpForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
