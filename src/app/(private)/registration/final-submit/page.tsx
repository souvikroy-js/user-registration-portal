import FinalSubmitForm from "@/components/Forms/FinalSubmitForm";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";

const page = async () => {
  const sessiom = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessiom) {
    return;
  }

  const { user } = sessiom;

  const fetchedUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { personalDetail: true, files: true },
  });

  if (!fetchedUser) {
    return <>User not found</>;
  }

  return (
    <section className="py-4">
      <FinalSubmitForm user={fetchedUser} />
    </section>
  );
};

export default page;
