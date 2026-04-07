"use server";

import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";

export const finalSubmit = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { isSuccess: false, message: "Not logged in 😢" };
    }

    const userId = session.user.id;

    // Step 1 — fetch full user with relations
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        personalDetail: true,
        files: true,
      },
    });

    if (!user) {
      return {
        isSuccess: false,
        message: "User not found.",
      };
    }

    // Step 2 — guard: check already submitted
    if (user.registrationCompleted) {
      return {
        isSuccess: false,
        message: "Application already submitted.",
      };
    }

    // Step 3 — validate all steps are done
    if (!user.personalDetail) {
      return {
        isSuccess: false,
        message: "Personal details are incomplete.",
      };
    }

    if (!user.files || user.files.length === 0) {
      return {
        isSuccess: false,
        message: "Passport photo is missing.",
      };
    }

    // Step 4 — mark as complete
    await prisma.user.update({
      where: { id: userId },
      data: {
        registrationCompleted: true,
        registrationStep: 3,
      },
    });

    revalidatePath("/registration", "layout");

    return {
      isSuccess: true,
      message: "Application submitted successfully! ✅",
      //   refNumber: `JB-2026-${userId.slice(0, 6).toUpperCase()}`,
    };
  } catch (error) {
    console.error("finalSubmit failed:", error);
    return { isSuccess: false, message: "Something went wrong 😢" };
  }
};
