"use server";

import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/database/dbClient";

export const getPersonalDetails = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) return null;

    return await prisma.personalDetail.findUnique({
      where: { userId: session.user.id },
    });
  } catch (error) {
    console.error("getPersonalDetails failed:", error);
    return null;
  }
};
