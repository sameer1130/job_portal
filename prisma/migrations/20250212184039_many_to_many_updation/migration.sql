/*
  Warnings:

  - You are about to drop the column `jobId` on the `Applicants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Applicants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Applicants" DROP CONSTRAINT "Applicants_jobId_fkey";

-- AlterTable
ALTER TABLE "Applicants" DROP COLUMN "jobId",
ALTER COLUMN "attachements" DROP NOT NULL;

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_applicantId_key" ON "JobApplication"("jobId", "applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "Applicants_email_key" ON "Applicants"("email");

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
