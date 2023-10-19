-- CreateTable
CREATE TABLE "Resource" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "category" STRING NOT NULL,
    "address" STRING NOT NULL,
    "latitude" FLOAT8 NOT NULL,
    "longitude" FLOAT8 NOT NULL,
    "postalCode" STRING NOT NULL,
    "email" STRING,
    "contactNumber" STRING,
    "website" STRING,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "resource_id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "content_html" STRING NOT NULL,
    "author" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_created_at_idx" ON "Post"("created_at");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
