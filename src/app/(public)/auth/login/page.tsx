import LoginForm from "@/components/Forms/LoginForm";
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
        <CardHeader className="">
          <CardTitle className="text-center">Login Form</CardTitle>

          <div className="mb-8">
            {/* Icon badge */}
            <span className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-800">
              <ShieldCheckIcon className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
            </span>

            <h1 className="mt-5 font-['Georgia',serif] text-[1.6rem] leading-tight font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Sign in securely
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Enter your email address and we&apos;ll send a one-time code
              straight to your inbox.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
