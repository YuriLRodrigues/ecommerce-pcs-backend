/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "categoryId";

-- CreateIndex
CREATE UNIQUE INDEX "Category_imageId_key" ON "Category"("imageId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
