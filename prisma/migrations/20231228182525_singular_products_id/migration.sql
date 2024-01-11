/*
  Warnings:

  - You are about to drop the column `productsId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productsId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "productsId",
ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
