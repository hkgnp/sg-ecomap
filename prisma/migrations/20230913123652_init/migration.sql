-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_fkey";

-- DropIndex
DROP INDEX "Post_parent_post_id_deleted_at_id_idx";

-- CreateIndex
CREATE INDEX "Post_parent_post_id_deleted_at_idx" ON "Post"("parent_post_id", "deleted_at");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
