"use server";

import sharp from "sharp";
import { nanoid } from "nanoid";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { rm, mkdir } from "fs/promises";
import path from "path";

const uploadPhoto = async (photoFiles: File) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { isSuccess: false, message: "Not logged in 😢" };
    }

    const user = session.user;

    // Step 1 — get existing photo
    const existingFile = await prisma.file.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const photoFileName = `${nanoid()}.jpg`;
    const photoUrl = `/uploads/${photoFileName}`;

    // Step 2 — delete old photo if different
    if (existingFile && existingFile.photoUrl !== photoUrl) {
      await rm(path.join(process.cwd(), "public", existingFile.photoUrl), {
        force: true, // ✅ won't throw if file missing
      });
      await prisma.file.delete({ where: { id: existingFile.id } });
    }

    // Step 3 — ensure uploads dir exists
    await mkdir(path.join(process.cwd(), "public/uploads"), {
      recursive: true,
    });

    // Step 4 — process and save new photo
    await sharp(Buffer.from(await photoFiles.arrayBuffer()))
      .resize({ width: 240, height: 240 })
      .jpeg({ quality: 87, mozjpeg: true })
      .toFile(path.join(process.cwd(), "public/uploads", photoFileName));

    // Step 5 — save new file record to DB
    await prisma.file.create({
      data: {
        photoUrl,
        userId: user.id,
      },
    });

    // Step 6 — advance registration step only if not already ahead
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { registrationStep: true },
    });

    if ((currentUser?.registrationStep ?? 0) < 2) {
      await prisma.user.update({
        where: { id: user.id },
        data: { registrationStep: 2 },
      });
    }

    revalidatePath("/registration", "layout");

    return { isSuccess: true, message: "Photo uploaded successfully ✅" };
  } catch (error) {
    console.error("uploadPhoto failed:", error);
    return { isSuccess: false, message: "Something went wrong 😢" };
  }
};

export default uploadPhoto;
