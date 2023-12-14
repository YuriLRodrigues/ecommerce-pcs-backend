/*
  Warnings:

  - You are about to drop the column `commet` on the `ProductFeedback` table. All the data in the column will be lost.
  - Added the required column `comment` to the `ProductFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductFeedback" DROP COLUMN "commet",
ADD COLUMN     "comment" TEXT NOT NULL;
