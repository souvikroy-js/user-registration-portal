"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/database/dbClient";
import { PersonalDetailsSchemaType } from "@/lib/type";
import { headers } from "next/headers";

const personalDetails = async (data: PersonalDetailsSchemaType) => {
  console.log(data);

  try {
    // Step 1 — get current logged in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return { isSuccess: false, message: "Not logged in 😢" };
    }

    const email = session.user.email;

    // Step 2 — save personal details
    await prisma.personalDetails.upsert({
      where: { email },
      update: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        state: data.state,
        district: data.district,
        city: data.city,
        pincode: data.pincode,
        place: data.place,
      },
      create: {
        email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        state: data.state,
        district: data.district,
        city: data.city,
        pincode: data.pincode,
        place: data.place,
      },
    });

    // Step 3 — update registration step to 2
    await prisma.user.update({
      where: { email },
      data: { registrationStep: 2 },
    });

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
