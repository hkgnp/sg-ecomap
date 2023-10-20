/*
  Warnings:

  - You are about to drop the column `deleted` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "deleted";
ALTER TABLE "Resource" ADD COLUMN     "inactive" BOOL;
