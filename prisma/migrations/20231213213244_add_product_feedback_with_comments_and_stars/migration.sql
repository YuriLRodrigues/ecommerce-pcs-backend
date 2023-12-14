/*
  Warnings:

  - You are about to drop the `ProductStars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductStars" DROP CONSTRAINT "ProductStars_productId_fkey";

-- DropTable
DROP TABLE "ProductStars";

-- CreateTable
CREATE TABLE "ProductFeedback" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "stars" DOUBLE PRECISION NOT NULL,
    "commets" TEXT NOT NULL,

    CONSTRAINT "ProductFeedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductFeedback" ADD CONSTRAINT "ProductFeedback_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
