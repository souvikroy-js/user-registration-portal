import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const sessiom = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessiom) {
    redirect("/auth/login");
  }

  const users = sessiom;
  const {
    user: { email },
  } = users;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      registrationStep: true,
      registrationCompleted: true,
    },
  });

  if (user?.registrationCompleted === true) {
    redirect("/registration/submission-success");
  }

  if (user?.registrationStep === 0) {
    redirect("/registration/personal-details");
  }

  if (user?.registrationStep === 1) {
    redirect("/registration/personal-details");
  }
  if (user?.registrationStep === 2) {
    redirect("/registration/documents-upload");
  }

  return <div className="grid h-[87dvh] place-items-center">registration</div>;
};

export default page;
