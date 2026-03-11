"use server";

import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/database/dbClient";

export const getPhoto = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) return null;

    return await prisma.file.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" }, // ✅ get latest photo
    });
  } catch (error) {
    console.error("getPhoto failed:", error);
    return null;
  }
};
