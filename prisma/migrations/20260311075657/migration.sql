/*
  Warnings:

  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `File` table. All the data in the column will be lost.
  - Added the required column `photoUrl` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PersonalDetail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photoUrl" TEXT NOT NULL,
    "userId" TEXT,
    "personalDetailId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_personalDetailId_fkey" FOREIGN KEY ("personalDetailId") REFERENCES "PersonalDetail" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "id", "personalDetailId", "userId") SELECT "createdAt", "id", "personalDetailId", "userId" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE TABLE "new_PersonalDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'West Bengal',
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "place" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonalDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PersonalDetail" ("city", "createdAt", "district", "email", "fullName", "id", "phoneNumber", "pincode", "place", "state", "updatedAt") SELECT "city", "createdAt", "district", "email", "fullName", "id", "phoneNumber", "pincode", "place", "state", "updatedAt" FROM "PersonalDetail";
DROP TABLE "PersonalDetail";
ALTER TABLE "new_PersonalDetail" RENAME TO "PersonalDetail";
CREATE UNIQUE INDEX "PersonalDetail_email_key" ON "PersonalDetail"("email");
CREATE UNIQUE INDEX "PersonalDetail_userId_key" ON "PersonalDetail"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
