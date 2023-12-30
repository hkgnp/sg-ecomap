/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_resource_id_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Comment" (
    "id" STRING NOT NULL,
    "resource_id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "content_html" STRING NOT NULL,
    "author" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_created_at_idx" ON "Comment"("created_at");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
