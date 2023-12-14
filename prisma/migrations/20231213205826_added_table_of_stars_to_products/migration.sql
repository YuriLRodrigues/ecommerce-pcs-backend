/*
  Warnings:

  - You are about to drop the column `stars` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stars";

-- CreateTable
CREATE TABLE "ProductStars" (
    "id" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductStars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductStars" ADD CONSTRAINT "ProductStars_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
