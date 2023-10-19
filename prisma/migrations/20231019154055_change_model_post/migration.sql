/*
  Warnings:

  - You are about to drop the column `expires` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `challenge_ts` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expires";
ALTER TABLE "VerificationToken" ADD COLUMN     "challenge_ts" STRING NOT NULL;
