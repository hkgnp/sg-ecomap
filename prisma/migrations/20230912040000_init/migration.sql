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
