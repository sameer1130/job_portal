/*
  Warnings:

  - Made the column `attachements` on table `Applicants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Applicants" ALTER COLUMN "attachements" SET NOT NULL;
