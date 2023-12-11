/*
  Warnings:

  - You are about to drop the column `votes` on the `Product` table. All the data in the column will be lost.
  - The `stars` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "votes",
DROP COLUMN "stars",
ADD COLUMN     "stars" DOUBLE PRECISION[];

-- CreateTable
CREATE TABLE "ProductComments" (
    "commentId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductComments_pkey" PRIMARY KEY ("commentId")
);

-- AddForeignKey
ALTER TABLE "ProductComments" ADD CONSTRAINT "ProductComments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
