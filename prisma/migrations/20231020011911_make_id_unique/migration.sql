/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resource_id_key" ON "Resource"("id");
