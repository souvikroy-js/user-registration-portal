"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { PersonalDetailsSchemaType } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const personalDetails = async ({
  fullName,
  phoneNumber,
  state,
  city,
  district,
  pincode,
  place,
}: PersonalDetailsSchemaType) => {
  const personalData = {
    fullName,
    phoneNumber,
    state,
    city,
    district,
    pincode,
    place,
  };

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return {
        isSuccess: false,
        message: "Not logged in 😢",
      };
    }

    const user = session.user;

    // Step 2 — save personal details
    await prisma.personalDetail.upsert({
      where: { userId: user.id },
      update: personalData,
      create: { ...personalData, email: user.email, userId: user.id },
    });

    // Step 3 — update registration step to 1

    // ✅ fetch current step
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { registrationStep: true },
    });

    // ...upsert personalData...

    // ✅ never go backwards
    if ((currentUser?.registrationStep ?? 0) < 1) {
      await prisma.user.update({
        where: { id: user.id },
        data: { registrationStep: 1 },
      });
    }

    revalidatePath("/registration", "layout");
    return {
      isSuccess: true,
      message: "Personal details saved ✅",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Something went wrong 😢",
    };
  }
};

export default personalDetails;
