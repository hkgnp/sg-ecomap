/*
  Warnings:

  - Added the required column `resource_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "resource_id" STRING NOT NULL;
