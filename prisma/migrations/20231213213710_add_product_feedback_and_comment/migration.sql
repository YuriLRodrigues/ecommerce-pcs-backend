/*
  Warnings:

  - You are about to drop the column `commets` on the `ProductFeedback` table. All the data in the column will be lost.
  - You are about to drop the `ProductComments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `commet` to the `ProductFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductComments" DROP CONSTRAINT "ProductComments_productId_fkey";

-- AlterTable
ALTER TABLE "ProductFeedback" DROP COLUMN "commets",
ADD COLUMN     "commet" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductComments";
