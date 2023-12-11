/*
  Warnings:

  - Made the column `productsId` on table `Images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ProductComments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_productsId_fkey";

-- DropForeignKey
ALTER TABLE "ProductComments" DROP CONSTRAINT "ProductComments_productId_fkey";

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "productsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductComments" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComments" ADD CONSTRAINT "ProductComments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
