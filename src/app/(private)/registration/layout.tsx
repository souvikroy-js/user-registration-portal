import ProgressTracker from "@/components/ProgressTracker";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { PageLayoutProps } from "@/lib/type";
import { headers } from "next/headers";

import { redirect } from "next/navigation";

const layout = async ({ children }: PageLayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      registrationStep: true,
      registrationCompleted: true,
    },
  });

  if (!user) redirect("/auth/login");

  // if already completed, send to dashboard
  if (user.registrationCompleted) redirect("/dashboard");

  // registrationStep 0 = not started → tracker shows step 1
  const currentStep = user.registrationStep;

  return (
    <main className="mx-auto max-w-7xl py-14">
      <ProgressTracker currentStep={currentStep} />
      {children}
    </main>
  );
};

export default layout;
